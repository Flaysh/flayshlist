import { ExternalLink, Instagram } from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';
import { instagramContent, socialLinks } from '@/data/content';

export const metadata = {
  title: 'Reels - FlayshList',
  description: 'Visual content and reels by FLAYSH on Instagram.',
};

export default function ReelsPage() {
  const allContent = [
    ...instagramContent.reels,
    ...instagramContent.posts,
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 mb-4">
          <Instagram className="h-5 w-5 text-pink-400" />
          <span className="text-pink-400 font-medium">@{instagramContent.username}</span>
        </div>
        <h1 className="text-4xl font-bold text-neutral-100">Reels & Visual Content</h1>
        <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
          Audiovisual experiments, behind-the-scenes, and creative projects shared on Instagram.
        </p>
        <a
          href={socialLinks.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block"
        >
          <Button>
            <Instagram className="h-4 w-4 mr-2" />
            Follow on Instagram
          </Button>
        </a>
      </div>

      {/* Instagram Embeds Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allContent.map((item) => (
          <Card key={item.id} className="group overflow-hidden">
            <CardContent className="p-0">
              {/* Instagram Embed */}
              <div className="aspect-square bg-neutral-800 relative">
                <iframe
                  src={`https://www.instagram.com/p/${item.id}/embed`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  className="absolute inset-0"
                  title={`Instagram ${item.type} ${item.id}`}
                />
              </div>
              
              {/* Link to Instagram */}
              <div className="p-4 flex items-center justify-between">
                <span className="text-sm text-neutral-400 capitalize">{item.type}</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1 text-sm"
                >
                  Open
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile CTA */}
      <div className="mt-16 text-center">
        <Card className="max-w-xl mx-auto bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-pink-800/30">
          <CardContent className="p-8">
            <Instagram className="h-12 w-12 text-pink-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-neutral-100">See More on Instagram</h2>
            <p className="mt-2 text-neutral-400">
              Follow for more audiovisual content, music production, and creative experiments.
            </p>
            <a
              href={socialLinks.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block"
            >
              <Button variant="outline">
                Visit Profile
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
