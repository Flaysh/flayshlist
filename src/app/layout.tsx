import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { Header, Footer } from '@/components/layout';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@/components/google-analytics';

const siteUrl = 'https://artlist.flaysh.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Itay Flaysher | Senior Frontend Engineer & Audiovisual Artist',
    template: '%s | Itay Flaysher',
  },
  description:
    'Senior Frontend Engineer with 6+ years building production React/Next.js applications. Audiovisual artist bringing creator empathy to developer tools.',
  keywords: [
    'Frontend Engineer',
    'React Developer',
    'Next.js',
    'TypeScript',
    'Full Stack',
    'Audiovisual Artist',
    'VJ',
    'Tel Aviv',
  ],
  authors: [{ name: 'Itay Flaysher', url: siteUrl }],
  creator: 'Itay Flaysher',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Itay Flaysher - Portfolio',
    title: 'Itay Flaysher | Senior Frontend Engineer & Audiovisual Artist',
    description:
      'Senior Frontend Engineer with 6+ years building production React/Next.js applications. Audiovisual artist bringing creator empathy to developer tools.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Itay Flaysher - Senior Frontend Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Itay Flaysher | Senior Frontend Engineer & Audiovisual Artist',
    description:
      'Senior Frontend Engineer with 6+ years building production React/Next.js applications.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Itay Flaysher',
  alternateName: 'FLAYSH',
  url: siteUrl,
  image: `${siteUrl}/FLAYSH_pfp.jpg`,
  jobTitle: 'Senior Frontend Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Apono',
  },
  sameAs: [
    'https://github.com/Flaysh',
    'https://www.linkedin.com/in/flaysh/',
    'https://www.instagram.com/flaysh_/',
    'https://soundcloud.com/flay5h',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Frontend Development',
    'VJing',
    'Music Production',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
          <GoogleAnalytics />
        </Providers>
      </body>
    </html>
  );
}
