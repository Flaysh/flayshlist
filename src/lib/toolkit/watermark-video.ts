import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join } from 'path';
import { writeFile, unlink, mkdtemp } from 'fs/promises';
import { tmpdir } from 'os';

if (ffmpegPath) {
  ffmpeg.setFfmpegPath(ffmpegPath);
}

export async function watermarkVideo(inputBuffer: Buffer): Promise<Buffer> {
  const tmpDir = await mkdtemp(join(tmpdir(), 'flaysh-watermark-'));
  const inputPath = join(tmpDir, 'input.mp4');
  const outputPath = join(tmpDir, 'output.mp4');
  const watermarkPath = join(tmpDir, 'watermark.png');

  try {
    await writeFile(inputPath, inputBuffer);

    const logoPath = join(process.cwd(), 'public', 'FLAYSH_logo.png');
    const logoBuffer = readFileSync(logoPath);

    const watermark = await sharp(logoBuffer)
      .resize(200, null, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    await writeFile(watermarkPath, watermark);

    await new Promise<void>((resolve, reject) => {
      ffmpeg(inputPath)
        .input(watermarkPath)
        .complexFilter([
          {
            filter: 'overlay',
            options: {
              x: 'main_w-overlay_w-24',
              y: 'main_h-overlay_h-24',
            },
          },
          {
            filter: 'format',
            options: 'yuv420p',
          },
        ])
        .outputOptions([
          '-c:v libx264',
          '-preset veryfast',
          '-crf 23',
          '-c:a copy',
        ])
        .output(outputPath)
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
        .run();
    });

    const outputBuffer = readFileSync(outputPath);
    return outputBuffer;
  } finally {
    try {
      await unlink(inputPath).catch(() => {});
      await unlink(outputPath).catch(() => {});
      await unlink(watermarkPath).catch(() => {});
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }
}
