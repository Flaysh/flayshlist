import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Instagram, Music } from 'lucide-react';
import { socialLinks } from '@/data/content';


const navLinks = [
  { href: '/ai-toolkit', label: 'AI Toolkit' },
  { href: '/performance', label: 'Performance' },
  { href: '/about', label: 'About Me' },
  { href: '/reels', label: 'Visuals' },
  { href: '/music', label: 'Music' },
  { href: '/chat', label: 'Ask AI' },
  { href: '/tools', label: 'How I Built This' },
];

export const Footer = () => {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 text-lg font-bold text-neutral-100">
              <Image
                src="/icon.png"
                alt="FlayshList"
                width={32}
                height={32}
                className="h-8 w-8 rounded-lg"
              />
              FlayshList
            </div>
            <p className="mt-3 text-sm text-neutral-400 max-w-md">
              A portfolio project by Itay Flaysher, showcasing the intersection 
              of software engineering and audiovisual art. Built with passion for Artlist.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Image
                src="/FLAYSH_logo.png"
                alt="FLAYSH"
                width={24}
                height={16}
                className="h-4 w-auto opacity-60"
              />
              <span className="text-xs text-neutral-500">FLAYSH</span>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={socialLinks.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-100 hover:bg-neutral-700 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={socialLinks.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-neutral-800 p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-700 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={socialLinks.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-neutral-800 p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-700 transition-colors"
                aria-label="Instagram Profile"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={socialLinks.soundcloud.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-neutral-800 p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-700 transition-colors"
                aria-label="SoundCloud Profile"
              >
                <Music className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-100">
              Explore
            </h3>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-100">
              Where to find me
            </h3>
            <ul className="mt-3 space-y-2">
            <li>
                <a
                  href={socialLinks.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.soundcloud.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
                >
                  SoundCloud
                </a>
              </li>
              <li>
                <a
                  href="https://open.spotify.com/artist/473GFkkbROCSw6ey6KioU7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
                >
                  Spotify
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-neutral-800 pt-8">
          <Image
            src="/FLAYSH_logo.png"
            alt="FLAYSH"
            width={120}
            height={48}
            className="mx-auto h-12 w-auto mb-6"
          />
          <p className="text-center text-sm text-neutral-500">
            © {new Date().getFullYear()} FLAYSH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
