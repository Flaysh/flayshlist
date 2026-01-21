'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, Music, Monitor, Sparkles, Wrench, Bot, Github, Linkedin, Wand2 } from 'lucide-react';
import { cn, focusRing } from '@/lib/design-system';
import { socialLinks } from '@/data/content';

const mainLinks = [
  { href: '/music', label: 'Music', icon: Music },
  { href: '/reels', label: 'Visuals', icon: Monitor },
  { href: '/ai-toolkit', label: 'AI Toolkit', icon: Wand2, isNew: true },
  { href: '/about', label: 'About Me', icon: Sparkles },
  { href: '/chat', label: 'Ask AI', icon: Bot },
  { href: '/tools', label: 'How I Built This', icon: Wrench },
];

export const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-[100] border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2 text-xl font-bold text-neutral-100',
              focusRing
            )}
          >
            <Image
              src="/icon.png"
              alt="FlayshList"
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg"
            />
            <span className="hidden sm:inline">FlayshList</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive(link.href)
                    ? 'text-primary-400'
                    : 'text-neutral-300 hover:text-neutral-100',
                  focusRing
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
                {'isNew' in link && link.isNew && (
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                    NEW
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={socialLinks.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'hidden sm:flex items-center gap-2 rounded-lg bg-neutral-800 px-3 py-2 text-sm font-medium text-neutral-100 hover:bg-neutral-700 transition-colors',
                focusRing
              )}
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>

            <a
              href={socialLinks.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'hidden sm:flex rounded-lg p-2 text-neutral-400 hover:text-neutral-100 transition-colors',
                focusRing
              )}
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>

            <button
              className={cn(
                'rounded-lg p-2 text-neutral-400 hover:text-neutral-100 lg:hidden',
                focusRing
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="border-t border-neutral-800 py-4 lg:hidden" aria-label="Mobile navigation">
            <div className="space-y-1">
              {mainLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                      isActive(link.href)
                        ? 'bg-primary-500/10 text-primary-400'
                        : 'text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100',
                      focusRing
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                    {'isNew' in link && link.isNew && (
                      <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                        NEW
                      </span>
                    )}
                  </Link>
                );
              })}
              <div className="my-2 border-t border-neutral-800" />
              <a
                href={socialLinks.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100',
                  focusRing
                )}
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={socialLinks.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100',
                  focusRing
                )}
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
