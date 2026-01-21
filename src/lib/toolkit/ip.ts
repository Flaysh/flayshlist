import { createHash } from 'crypto';

export function getClientIp(headers: Headers): string | null {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const ips = forwarded.split(',').map((ip) => ip.trim());
    return ips[0] || null;
  }

  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return null;
}

export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT || 'default-salt-change-this';
  return createHash('sha256')
    .update(ip + salt)
    .digest('hex');
}
