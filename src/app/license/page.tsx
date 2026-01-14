import { Check, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';

export const metadata = {
  title: 'License - FlayshList',
  description: 'Understanding your rights when using FlayshList assets.',
};

const allowed = [
  'Use in personal and commercial projects',
  'Use in videos, films, and streaming content',
  'Use in podcasts and audio productions',
  'Use in advertising and marketing materials',
  'Use in mobile apps and video games',
  'Use in presentations and social media',
  'Create unlimited end products',
  'Transfer rights to clients (with valid subscription)',
];

const notAllowed = [
  'Resell or redistribute assets as-is',
  'Use in templates or products for resale',
  'Claim ownership of original assets',
  'Use after subscription ends (new projects)',
  'Share account credentials',
  'Use in illegal or defamatory content',
];

export default function LicensePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-neutral-100">FlayshList License</h1>
        <p className="mt-4 text-lg text-neutral-400">
          A simple, creator-friendly license that lets you focus on creating.
        </p>
      </div>

      {/* License Overview */}
      <Card className="mb-12">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">Overview</h2>
          <p className="text-neutral-400 leading-relaxed">
            The FlayshList License grants you a perpetual, worldwide, non-exclusive license 
            to use the assets you download in your creative projects. This license is 
            royalty-free and does not require attribution. The license remains valid for 
            projects created during your active subscription period, even after the 
            subscription ends.
          </p>
        </CardContent>
      </Card>

      {/* What's Allowed */}
      <div className="grid gap-8 md:grid-cols-2 mb-12">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
              <Check className="h-5 w-5" />
              What You Can Do
            </h2>
            <ul className="space-y-3">
              {allowed.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
              <X className="h-5 w-5" />
              What You Cannot Do
            </h2>
            <ul className="space-y-3">
              {notAllowed.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Terms */}
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold text-neutral-100 mb-4">Detailed Terms</h2>

        <div className="space-y-8 text-neutral-400">
          <section>
            <h3 className="text-lg font-semibold text-neutral-200 mb-2">1. Grant of License</h3>
            <p>
              Upon downloading an asset from FlayshList, you are granted a non-exclusive, 
              perpetual, worldwide license to use, reproduce, modify, and publicly display 
              the asset as part of your creative projects, subject to the limitations 
              outlined in this agreement.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-neutral-200 mb-2">2. Permitted Uses</h3>
            <p>
              You may use assets in any type of project including but not limited to: 
              videos, films, documentaries, advertisements, social media content, podcasts, 
              presentations, websites, mobile applications, video games, and streaming 
              content. The license covers both personal and commercial use.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-neutral-200 mb-2">3. Restrictions</h3>
            <p>
              You may not redistribute, resell, lease, or sublicense the assets in their 
              original form. You may not use assets in products designed for resale where 
              the asset is the primary value (such as stock media templates). You may not 
              claim ownership or register copyright for the original assets.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-neutral-200 mb-2">4. Attribution</h3>
            <p>
              Attribution is not required when using FlayshList assets. However, if you 
              wish to credit the artist, you may do so as: &quot;Music by [Artist Name] via FlayshList&quot; 
              or similar format.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-neutral-200 mb-2">5. Subscription Status</h3>
            <p>
              Projects created during an active subscription period may continue to use 
              those assets indefinitely. However, new projects started after your 
              subscription ends require a valid subscription to use new or existing assets.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-neutral-200 mb-2">6. Client Work</h3>
            <p>
              If you create content for clients, the license extends to cover the client&apos;s 
              use of the final product. However, you may not transfer the raw asset files 
              to clients or grant them separate licenses.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-neutral-200 mb-2">7. AI-Generated Content</h3>
            <p>
              Content generated using FlayshList&apos;s AI Studio features is covered under the 
              same license terms as other assets. You own the output of AI-generated content 
              and may use it in accordance with this license.
            </p>
          </section>
        </div>
      </div>

      {/* Contact */}
      <Card className="mt-12">
        <CardContent className="p-6 text-center">
          <p className="text-neutral-400">
            Have questions about licensing?{' '}
            <a href="mailto:legal@flayshlist.com" className="text-primary-400 hover:text-primary-300">
              Contact our licensing team
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
