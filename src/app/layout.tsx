import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { Header, Footer, AudioPlayer } from '@/components/layout';
import './globals.css';

export const metadata: Metadata = {
  title: 'FlayshList - Premium Creative Assets',
  description: 'Discover royalty-free music, sound effects, footage, templates, and LUTs for your creative projects.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <AudioPlayer />
        </Providers>
      </body>
    </html>
  );
}
