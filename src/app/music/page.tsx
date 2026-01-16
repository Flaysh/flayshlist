import Image from 'next/image';
import { ExternalLink, Music } from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';
import { soundcloudContent, spotifyEmbed, socialLinks } from '@/data/content';

export const metadata = {
  title: 'Music',
  description:
    'Original electronic music productions by FLAYSH. Neuro-future DnB, desert bass, and experimental sounds.',
};

export default function MusicPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="text-center mb-12">
        <Image
          src="/FLAYSH_logo.png"
          alt="FLAYSH"
          width={120}
          height={48}
          className="mx-auto h-12 w-auto mb-6"
          priority
        />
        <h1 className="text-4xl font-bold text-neutral-100">Music</h1>
        <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
          Original productions spanning neuro-future DnB and electronic genres.
          Stream on your favorite platform.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <a href={socialLinks.soundcloud.url} target="_blank" rel="noopener noreferrer">
            <Button>
              <Music className="h-4 w-4 mr-2" />
              SoundCloud
            </Button>
          </a>
          <a href={spotifyEmbed.artistUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">
              Spotify
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-100 mb-6">On Spotify</h2>
        <Card>
          <CardContent className="p-0 overflow-hidden rounded-xl">
            <iframe
              src={spotifyEmbed.embedUrl}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Player"
            />
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-100 mb-6">Tracks</h2>
        <div className="space-y-4">
          {soundcloudContent.tracks.map((track) => (
            <Card key={track.id}>
              <CardContent className="p-0">
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  loading="lazy"
                  src={track.embedUrl}
                  title={track.title}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-100 mb-6">Playlists</h2>
        {soundcloudContent.playlists.map((playlist) => (
          <Card key={playlist.id}>
            <CardContent className="p-0">
              <iframe
                width="100%"
                height="450"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                loading="lazy"
                src={playlist.embedUrl}
                title={playlist.title}
              />
            </CardContent>
            <CardContent className="pt-0">
              <p className="text-neutral-400 text-sm">{playlist.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="text-center">
        <Card className="max-w-xl mx-auto bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-800/30">
          <CardContent className="p-8">
            <Image
              src="/FLAYSH_logo.png"
              alt="FLAYSH"
              width={80}
              height={32}
              className="mx-auto h-8 w-auto mb-4 opacity-80"
            />
            <h2 className="text-xl font-bold text-neutral-100">More on SoundCloud</h2>
            <p className="mt-2 text-neutral-400">
              Follow for new releases, DJ sets, and exclusive content.
            </p>
            <a
              href={socialLinks.soundcloud.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block"
            >
              <Button>
                Follow on SoundCloud
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
