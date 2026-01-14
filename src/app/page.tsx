import Link from 'next/link';
import Image from 'next/image';
import {
  Music,
  Monitor,
  ArrowRight,
  Github,
  Linkedin,
  ExternalLink,
  Sparkles,
  Bot,
  Code,
  Instagram,
} from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';
import { cn } from '@/lib/design-system';
import { socialLinks, cvData, soundcloudContent, spotifyEmbed, audiovisualArtist, artlistHighlights } from '@/data/content';

const categories = [
  {
    href: '/music',
    label: 'Music',
    icon: Music,
    description: 'DJ Sets & Productions',
    color: 'from-purple-500 to-pink-500',
  },
  {
    href: '/reels',
    label: 'Visuals',
    icon: Monitor,
    description: 'VJ & Projection Mapping',
    color: 'from-orange-500 to-red-500',
  },
  {
    href: '/chat',
    label: 'Ask AI',
    icon: Bot,
    description: 'Chat about me',
    color: 'from-blue-500 to-cyan-500',
  },
];

export default function HomePage() {
  return (
    <div className="pb-24">
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950 py-20 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-2 text-sm text-primary-400 mb-6">
              <Sparkles className="h-4 w-4" />
              {cvData.title}
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-neutral-100 sm:text-6xl">
              Hey, I&apos;m{' '}
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                {cvData.artistName}
              </span>
            </h1>
            
            <p className="mt-6 text-lg text-neutral-400 sm:text-xl">
              Senior frontend engineer with 6+ years shipping production React/Next.js products.
              I build creator-first experiences because I&apos;m also an audiovisual artist, VJ,
              and music producer working inside the same creative workflows Artlist serves.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={socialLinks.github.url} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto">
                  <Github className="h-5 w-5 mr-2" />
                  View GitHub
                </Button>
              </a>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Sparkles className="h-5 w-5 mr-2" />
                  View Full CV
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <a
                href={socialLinks.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-neutral-100 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href={socialLinks.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-neutral-100 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href={socialLinks.soundcloud.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-neutral-100 transition-colors"
                aria-label="SoundCloud"
              >
                <Music className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neutral-100">Explore</h2>
            <p className="mt-3 text-neutral-400">
              My music, live visuals, and an AI that knows everything about me
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.href} href={category.href}>
                  <Card className="group h-full transition-all hover:border-neutral-700 hover:shadow-lg">
                    <CardContent className="flex flex-col items-center p-8 text-center">
                      <div
                        className={cn(
                          'flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br',
                          category.color,
                          'transition-transform group-hover:scale-110'
                        )}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-neutral-100">{category.label}</h3>
                      <p className="mt-1 text-sm text-neutral-500">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary-950/30 to-accent-950/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-100">Listen on Spotify</h2>
              <p className="mt-4 text-neutral-400">
                Stream my music on Spotify. From desert bass to electronic experiments, 
                explore the sounds that define my artistic journey.
              </p>
              <a
                href={spotifyEmbed.artistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center text-primary-400 hover:text-primary-300"
              >
                Open in Spotify
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
            <div className="rounded-xl overflow-hidden">
              <iframe
                src={spotifyEmbed.embedUrl}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
                title="Spotify Player"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-purple-950/20 to-pink-950/20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-purple-400 mb-4">
                <Monitor className="h-4 w-4" />
                Audiovisual Artist
              </div>
              <h2 className="text-3xl font-bold text-neutral-100">{audiovisualArtist.tagline}</h2>
              <p className="mt-4 text-neutral-400">
                {audiovisualArtist.visualsDescription}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {audiovisualArtist.skills.slice(0, 5).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-purple-500/10 px-3 py-1 text-sm text-purple-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <Link href="/reels" className="mt-6 inline-flex items-center text-purple-400 hover:text-purple-300">
                View Visual Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center">
                <Monitor className="h-16 w-16 text-purple-400/50" />
              </div>
              <div className="aspect-square rounded-xl bg-gradient-to-br from-pink-900/30 to-orange-900/30 flex items-center justify-center">
                <Sparkles className="h-16 w-16 text-pink-400/50" />
              </div>
              <div className="aspect-square rounded-xl bg-gradient-to-br from-orange-900/30 to-yellow-900/30 flex items-center justify-center col-span-2">
                <a
                  href={socialLinks.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 text-neutral-400 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="h-12 w-12" />
                  <span className="text-sm font-medium">@{socialLinks.instagram.username}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-100">Latest on SoundCloud</h2>
            <p className="mt-3 text-neutral-400">
              Check out my latest productions and DJ sets
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {soundcloudContent.tracks.slice(0, 2).map((track) => (
              <div key={track.id} className="rounded-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={track.embedUrl}
                  title={track.title}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/music">
              <Button variant="outline">
                View All Music
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Card className="bg-gradient-to-r from-primary-900/30 to-accent-900/30 border-primary-800/50">
            <CardContent className="p-8 sm:p-12">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src="/FLAYSH_pfp.jpg"
                      alt="Itay Flaysher"
                      width={64}
                      height={64}
                      className="rounded-full border border-neutral-700"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-100">{cvData.name}</h2>
                      <p className="text-primary-400">{cvData.experience[0].title}</p>
                    </div>
                  </div>
                  <p className="text-neutral-300">
                    {cvData.summary.slice(0, 250)}...
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {cvData.allSkills.slice(0, 6).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-neutral-800 px-3 py-1 text-sm text-neutral-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-4">
                    <Link href="/about">
                      <Button>View Full CV</Button>
                    </Link>
                    <Link href="/chat">
                      <Button variant="outline">
                        <Bot className="h-4 w-4 mr-2" />
                        Ask AI
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg bg-neutral-800/50 p-4">
                    <p className="text-sm text-neutral-400">Current Role</p>
                    <p className="text-lg font-medium text-neutral-100">{cvData.experience[0].title}</p>
                    <p className="text-primary-400">{cvData.experience[0].company}</p>
                  </div>
                  {cvData.experience.slice(1, 3).map((exp, i) => (
                    <div key={i} className="rounded-lg bg-neutral-800/50 p-4">
                      <p className="text-sm text-neutral-400">Previous</p>
                      <p className="text-neutral-200">{exp.title}</p>
                      <p className="text-sm text-neutral-500">{exp.company}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-neutral-900 to-neutral-950">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-2 text-sm text-primary-400 mb-4">
            <Code className="h-4 w-4" />
            Built for Artlist
          </div>
          <h2 className="text-3xl font-bold text-neutral-100">Creator empathy meets senior execution</h2>
          <p className="mt-3 text-neutral-400 max-w-2xl mx-auto">
            FlayshList is a focused portfolio project that mirrors the creator journey.
            It demonstrates how I design, build, and ship for the artists who rely on Artlist.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3 text-left">
            {artlistHighlights.map((highlight) => (
              <Card key={highlight.title} className="bg-neutral-900/60 border-neutral-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-neutral-100">{highlight.title}</h3>
                  <p className="mt-2 text-sm text-neutral-400">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/tools">
              <Button variant="outline">
                See How I Built This
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-bold text-neutral-100">Let&apos;s Connect</h2>
          <p className="mt-3 text-neutral-400 max-w-xl mx-auto">
            I&apos;m passionate about creative technology and excited to discuss 
            opportunities in frontend development.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={socialLinks.linkedin.url} target="_blank" rel="noopener noreferrer">
              <Button size="lg">
                <Linkedin className="h-5 w-5 mr-2" />
                Connect on LinkedIn
              </Button>
            </a>
            <a href={socialLinks.github.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                <Github className="h-5 w-5 mr-2" />
                Follow on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
