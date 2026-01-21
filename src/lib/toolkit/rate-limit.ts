import { prisma } from './db';

export const QUOTAS = {
  IMAGE_SESSIONS_PER_DAY: 2,
  VIDEO_SESSIONS_PER_DAY: 1,
  BURST_LIMIT: 3,
  BURST_WINDOW_SECONDS: 30,
} as const;

export const QUOTA_MESSAGES = {
  IMAGE: "You've spent today's 2 image spells. Come back after reset.",
  VIDEO: "Video portal is closed. One summon per day.",
  BURST: "Too fast. Even my shaders need a breath.",
} as const;

export type QuotaError = {
  code: 'QUOTA';
  message: string;
  retryAfter?: number;
};

const burstCache = new Map<string, number[]>();

function checkBurstLimit(ipHash: string): boolean {
  const now = Date.now();
  const timestamps = burstCache.get(ipHash) || [];

  const recentTimestamps = timestamps.filter(
    (ts) => now - ts < QUOTAS.BURST_WINDOW_SECONDS * 1000
  );

  if (recentTimestamps.length >= QUOTAS.BURST_LIMIT) {
    return false;
  }

  recentTimestamps.push(now);
  burstCache.set(ipHash, recentTimestamps);

  if (burstCache.size > 10000) {
    const oldestKey = burstCache.keys().next().value;
    if (oldestKey) burstCache.delete(oldestKey);
  }

  return true;
}

export async function checkAndIncrementQuota(
  ipHash: string,
  toolType: 'image' | 'video'
): Promise<{ allowed: true } | { allowed: false; error: QuotaError }> {
  if (!checkBurstLimit(ipHash)) {
    return {
      allowed: false,
      error: {
        code: 'QUOTA',
        message: QUOTA_MESSAGES.BURST,
        retryAfter: QUOTAS.BURST_WINDOW_SECONDS,
      },
    };
  }

  const dateKey = new Date();
  dateKey.setUTCHours(0, 0, 0, 0);

  const maxCount = toolType === 'image'
    ? QUOTAS.IMAGE_SESSIONS_PER_DAY
    : QUOTAS.VIDEO_SESSIONS_PER_DAY;

  try {
    await prisma.$transaction(async (tx) => {
      const usage = await tx.toolkitUsage.upsert({
        where: {
          ipHash_dateKey: {
            ipHash,
            dateKey,
          },
        },
        create: {
          ipHash,
          dateKey,
          imageCount: toolType === 'image' ? 1 : 0,
          videoCount: toolType === 'video' ? 1 : 0,
        },
        update: {
          imageCount: toolType === 'image' ? { increment: 1 } : undefined,
          videoCount: toolType === 'video' ? { increment: 1 } : undefined,
        },
      });

      const currentCount = toolType === 'image' ? usage.imageCount : usage.videoCount;

      if (currentCount > maxCount) {
        throw new Error('QUOTA_EXCEEDED');
      }
    });

    return { allowed: true };
  } catch (error) {
    if (error instanceof Error && error.message === 'QUOTA_EXCEEDED') {
      const tomorrow = new Date(dateKey);
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
      const retryAfter = Math.floor((tomorrow.getTime() - Date.now()) / 1000);

      return {
        allowed: false,
        error: {
          code: 'QUOTA',
          message: toolType === 'image' ? QUOTA_MESSAGES.IMAGE : QUOTA_MESSAGES.VIDEO,
          retryAfter,
        },
      };
    }
    throw error;
  }
}
