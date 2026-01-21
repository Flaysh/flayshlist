import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join } from 'path';

const WATERMARK_OPACITY = 0.18;
const WATERMARK_PADDING = 24;

export async function watermarkImage(inputBuffer: Buffer): Promise<Buffer> {
  const logoPath = join(process.cwd(), 'public', 'FLAYSH_logo.png');
  const logoBuffer = readFileSync(logoPath);

  const image = sharp(inputBuffer);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error('Invalid image metadata');
  }

  const watermarkWidth = Math.floor(metadata.width * 0.12);
  const watermarkHeight = Math.floor(watermarkWidth * 0.6);

  const watermark = await sharp(logoBuffer)
    .resize(watermarkWidth, watermarkHeight, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const watermarkWithOpacity = await sharp(watermark)
    .composite([
      {
        input: Buffer.from([255, 255, 255, Math.floor(255 * WATERMARK_OPACITY)]),
        raw: {
          width: 1,
          height: 1,
          channels: 4,
        },
        tile: true,
        blend: 'dest-in',
      },
    ])
    .toBuffer();

  const watermarkMeta = await sharp(watermarkWithOpacity).metadata();

  const result = await image
    .composite([
      {
        input: watermarkWithOpacity,
        top: metadata.height - (watermarkMeta.height || 0) - WATERMARK_PADDING,
        left: metadata.width - (watermarkMeta.width || 0) - WATERMARK_PADDING,
      },
    ])
    .webp({ quality: 85 })
    .toBuffer();

  return result;
}
