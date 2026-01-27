'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, Instagram } from 'lucide-react';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { visualContent, audiovisualArtist, socialLinks } from '@/data/content';
import { TrackedLink } from '@/components/tracked-link';

export function VisualsContent() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="text-center mb-10">
        <Image
          src="/FLAYSH_logo.png"
          alt="FLAYSH"
          width={120}
          height={48}
          className="mx-auto h-12 w-auto mb-6"
          priority
        />
        <h1 className="text-4xl font-bold text-neutral-100 sm:text-5xl">
          {audiovisualArtist.tagline}
        </h1>
        <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          {audiovisualArtist.bio}
        </p>
        <TrackedLink
          href={socialLinks.instagram.url}
          context="reels_header"
          className="mt-6 inline-block"
        >
          <Button>
            <Instagram className="h-4 w-4 mr-2" />
            Follow @{visualContent.username}
          </Button>
        </TrackedLink>
      </div>

      <div className="mb-10">
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {audiovisualArtist.skills.map((skill) => (
            <Badge
              key={skill}
              variant="default"
              className="text-sm bg-neutral-800/80 text-neutral-300 border-neutral-700/50"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visualContent.items.map((item) => (
          <div key={item.id} className="instagram-embed-container">
            <blockquote
              className="instagram-media"
              data-instgrm-captioned
              data-instgrm-permalink={item.url}
              data-instgrm-version="14"
              style={{
                background: 'transparent',
                border: 0,
                margin: 0,
                padding: 0,
                width: '100%',
              }}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-3 text-neutral-500 hover:text-pink-400 transition-colors p-16"
              >
                <Instagram className="h-8 w-8" />
                <span className="text-sm">Loading...</span>
              </a>
            </blockquote>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <Card className="bg-neutral-900/50 border-neutral-800">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">The Approach</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              {audiovisualArtist.visualsDescription}
            </p>
            <p className="mt-4 text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              {audiovisualArtist.approach}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 text-center">
        <Card className="max-w-lg mx-auto bg-neutral-900/50 border-neutral-800">
          <CardContent className="p-6">
            <Image
              src="/FLAYSH_logo.png"
              alt="FLAYSH"
              width={80}
              height={32}
              className="mx-auto h-8 w-auto mb-4 opacity-80"
            />
            <h2 className="text-lg font-bold text-neutral-100">See More on Instagram</h2>
            <p className="mt-1 text-sm text-neutral-400">
              Follow for more audiovisual content.
            </p>
            <TrackedLink
              href={socialLinks.instagram.url}
              context="reels_cta"
              className="mt-4 inline-block"
            >
              <Button variant="outline" size="sm">
                Visit Profile
                <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            </TrackedLink>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}
