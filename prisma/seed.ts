import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Real FLAYSH music tracks (metadata only, actual playback via SoundCloud embeds)
const musicAssets = [
  {
    type: 'music',
    title: 'FLAYSH - Ascend',
    description: 'An uplifting electronic journey',
    tags: JSON.stringify(['electronic', 'uplifting', 'progressive']),
    bpm: 128,
    durationSec: 240,
    artist: 'FLAYSH',
    previewUrl: 'https://soundcloud.com/flay5h/flaysh-ascend',
    sourceUrl: 'https://soundcloud.com/flay5h/flaysh-ascend',
    coverImage: '/covers/ascend.jpg',
    mood: 'uplifting',
    genre: 'electronic',
  },
  {
    type: 'music',
    title: 'FLAYSH - thinkin bout u',
    description: 'Emotional electronic vibes',
    tags: JSON.stringify(['electronic', 'emotional', 'chill']),
    bpm: 120,
    durationSec: 210,
    artist: 'FLAYSH',
    previewUrl: 'https://soundcloud.com/flay5h/thinkin-bout-u',
    sourceUrl: 'https://soundcloud.com/flay5h/thinkin-bout-u',
    coverImage: '/covers/thinkin-bout-u.jpg',
    mood: 'chill',
    genre: 'electronic',
  },
  {
    type: 'music',
    title: '༺ Emotional Rollercoaster ❂ Desert Bass ༻',
    description: 'Deep desert bass journey - DB25 set',
    tags: JSON.stringify(['desert-bass', 'deep', 'emotional', 'set']),
    bpm: 110,
    durationSec: 3600,
    artist: 'FLAYSH',
    previewUrl: 'https://soundcloud.com/flay5h/db-25',
    sourceUrl: 'https://soundcloud.com/flay5h/db-25',
    coverImage: '/covers/emotional-rollercoaster.jpg',
    mood: 'deep',
    genre: 'desert-bass',
  },
  {
    type: 'music',
    title: '༺ Desert Bass 𖤓 New Dawn ༻',
    description: 'Desert bass sunrise session',
    tags: JSON.stringify(['desert-bass', 'sunrise', 'ambient', 'set']),
    bpm: 115,
    durationSec: 3600,
    artist: 'FLAYSH',
    previewUrl: 'https://soundcloud.com/flay5h/flaysh-desert-bass-new-dawn',
    sourceUrl: 'https://soundcloud.com/flay5h/flaysh-desert-bass-new-dawn',
    coverImage: '/covers/new-dawn.jpg',
    mood: 'ambient',
    genre: 'desert-bass',
  },
];

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.collectionItem.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.aiJob.deleteMany();

  console.log('📦 Creating music assets...');

  const createdAssets = await Promise.all(
    musicAssets.map((asset) =>
      prisma.asset.create({
        data: asset,
      })
    )
  );

  console.log(`✅ Created ${createdAssets.length} music assets`);
  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
