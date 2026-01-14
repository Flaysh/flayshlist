import {
  Code,
  Layers,
  Database,
  TestTube,
  Workflow,
  Palette,
  Zap,
  Github,
  CheckCircle,
  FolderTree,
  Sparkles,
  Server,
  Globe,
} from 'lucide-react';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { socialLinks } from '@/data/content';

export const metadata = {
  title: 'How I Built This - FlayshList',
  description: 'Technical deep-dive into how FlayshList was built with Next.js, TypeScript, and more.',
};

const techStack = [
  {
    category: 'Frontend',
    icon: Palette,
    color: 'from-blue-500 to-cyan-500',
    items: [
      { name: 'Next.js 16', desc: 'App Router, Server Components, Streaming' },
      { name: 'TypeScript', desc: 'Strict mode, full type safety' },
      { name: 'Tailwind CSS', desc: 'Utility-first styling' },
      { name: 'Custom Design System', desc: 'Tokens, components, dark-first' },
    ],
  },
  {
    category: 'State & Data',
    icon: Layers,
    color: 'from-purple-500 to-pink-500',
    items: [
      { name: 'TanStack Query', desc: 'Server state, caching, background refetch' },
      { name: 'Zustand', desc: 'Global audio player state' },
      { name: 'nuqs', desc: 'URL search params sync' },
    ],
  },
  {
    category: 'Backend',
    icon: Server,
    color: 'from-green-500 to-emerald-500',
    items: [
      { name: 'Next.js Route Handlers', desc: 'BFF pattern API routes' },
      { name: 'Prisma ORM', desc: 'Type-safe database access' },
      { name: 'SQLite', desc: 'Simple, portable database' },
      { name: 'Zod', desc: 'Runtime validation schemas' },
    ],
  },
  {
    category: 'Testing & Quality',
    icon: TestTube,
    color: 'from-orange-500 to-red-500',
    items: [
      { name: 'Vitest', desc: 'Unit tests with React Testing Library' },
      { name: 'Playwright', desc: 'E2E smoke tests' },
      { name: 'Lighthouse CI', desc: 'Performance & a11y budgets' },
      { name: 'TypeScript', desc: 'Type checking in CI' },
    ],
  },
];

const features = [
  { icon: Globe, label: 'Real SoundCloud & Instagram embeds' },
  { icon: Sparkles, label: 'AI chat with local knowledge base' },
  { icon: Palette, label: 'Dark-first, premium design' },
  { icon: Zap, label: 'Server Components for fast loads' },
  { icon: CheckCircle, label: 'Accessible (a11y compliant)' },
  { icon: Workflow, label: 'Full CI/CD pipeline' },
];

const architectureLayers = [
  { name: 'UI Layer', tech: 'React + Tailwind', desc: 'Server & Client Components' },
  { name: 'State Layer', tech: 'TanStack Query + Zustand', desc: 'Caching & global state' },
  { name: 'BFF Layer', tech: 'Next.js Route Handlers', desc: 'API endpoints with Zod validation' },
  { name: 'Data Layer', tech: 'Prisma + SQLite', desc: 'Type-safe ORM' },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-2 text-primary-400 mb-4">
          <Code className="h-4 w-4" />
          Technical Deep-Dive
        </div>
        <h1 className="text-4xl font-bold text-neutral-100">How I Built FlayshList</h1>
        <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
          A production-quality portfolio project built with modern React patterns, 
          demonstrating the skills I&apos;d bring to Artlist&apos;s engineering team.
        </p>
        <div className="mt-6">
          <a href={socialLinks.github.url} target="_blank" rel="noopener noreferrer">
            <Button>
              <Github className="h-4 w-4 mr-2" />
              View Source Code
            </Button>
          </a>
        </div>
      </div>

      {/* Key Features */}
      <section className="mb-16">
        <Card className="bg-gradient-to-r from-primary-900/20 to-accent-900/20 border-primary-800/30">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold text-neutral-100 mb-6 text-center">What This App Demonstrates</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.label} className="flex items-center gap-3 rounded-lg bg-neutral-800/50 p-4">
                    <Icon className="h-5 w-5 text-primary-400 shrink-0" />
                    <span className="text-neutral-200 text-sm">{feature.label}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Tech Stack */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-100 mb-8 text-center">Tech Stack</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {techStack.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.category}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${category.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-neutral-100">{category.category}</h3>
                  </div>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div key={item.name} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-neutral-100 text-sm font-medium">{item.name}</span>
                          <span className="text-neutral-500 text-sm"> — {item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Architecture */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-100 mb-8 text-center">Architecture</h2>
        <Card>
          <CardContent className="p-8">
            <div className="space-y-4">
              {architectureLayers.map((layer, i) => (
                <div key={layer.name} className="relative">
                  <div className="flex items-center gap-4 rounded-lg border border-neutral-700 bg-neutral-800/50 p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500/20 text-primary-400 font-bold text-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-100">{layer.name}</span>
                        <Badge variant="default" className="text-xs">{layer.tech}</Badge>
                      </div>
                      <p className="text-sm text-neutral-400 mt-0.5">{layer.desc}</p>
                    </div>
                  </div>
                  {i < architectureLayers.length - 1 && (
                    <div className="flex justify-center py-1">
                      <div className="h-4 w-0.5 bg-neutral-700" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Project Structure */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-100 mb-8 text-center">Project Structure</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FolderTree className="h-5 w-5 text-primary-400" />
              <span className="font-mono text-sm text-neutral-400">flayshlist/</span>
            </div>
            <pre className="text-sm text-neutral-300 font-mono overflow-x-auto">
{`├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Homepage
│   │   ├── music/              # Music catalog
│   │   ├── reels/              # Instagram reels
│   │   ├── about/              # Full CV/resume
│   │   ├── chat/               # AI chat agent
│   │   ├── tools/              # This page!
│   │   └── api/                # Route Handlers (BFF)
│   │
│   ├── components/
│   │   ├── ui/                 # Design system components
│   │   ├── layout/             # Header, Footer, AudioPlayer
│   │   └── catalog/            # Asset cards, filters
│   │
│   ├── lib/
│   │   ├── design-system/      # Tokens, utilities
│   │   ├── api.ts              # API client functions
│   │   └── db.ts               # Prisma client
│   │
│   ├── stores/                 # Zustand stores
│   ├── hooks/                  # Custom React hooks
│   └── data/                   # Content & CV data
│
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Seed script
│
├── e2e/                        # Playwright E2E tests
├── .github/workflows/          # CI/CD pipeline
└── package.json`}
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Engineering Signals */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-100 mb-8 text-center">Engineering Signals</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <Zap className="h-8 w-8 text-yellow-400 mb-3" />
              <h3 className="font-semibold text-neutral-100 mb-2">Performance</h3>
              <ul className="text-sm text-neutral-400 space-y-1">
                <li>• Server Components by default</li>
                <li>• Streaming with Suspense</li>
                <li>• Image optimization</li>
                <li>• Lighthouse CI budgets</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <CheckCircle className="h-8 w-8 text-green-400 mb-3" />
              <h3 className="font-semibold text-neutral-100 mb-2">Quality</h3>
              <ul className="text-sm text-neutral-400 space-y-1">
                <li>• TypeScript strict mode</li>
                <li>• Unit tests (Vitest)</li>
                <li>• E2E tests (Playwright)</li>
                <li>• Automated CI/CD</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Palette className="h-8 w-8 text-purple-400 mb-3" />
              <h3 className="font-semibold text-neutral-100 mb-2">Design</h3>
              <ul className="text-sm text-neutral-400 space-y-1">
                <li>• Custom design system</li>
                <li>• Dark-first aesthetic</li>
                <li>• Responsive (mobile-first)</li>
                <li>• Accessibility (a11y)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CI/CD */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-100 mb-8 text-center">CI/CD Pipeline</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Workflow className="h-5 w-5 text-primary-400" />
              <span className="font-mono text-sm text-neutral-400">.github/workflows/ci.yml</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Lint', 'Type Check', 'Unit Tests', 'E2E Tests', 'Build', 'Lighthouse'].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-sm text-neutral-200">{step}</span>
                  {i < 5 && <span className="text-neutral-600">→</span>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="text-center">
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary-900/30 to-accent-900/30 border-primary-800/30">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">
              Built with passion for Artlist
            </h2>
            <p className="text-neutral-400 mb-6">
              This project demonstrates my ability to build production-quality React applications 
              with modern patterns, strong testing, and attention to design. I&apos;d love to bring 
              these skills to Artlist&apos;s engineering team!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={socialLinks.github.url} target="_blank" rel="noopener noreferrer">
                <Button size="lg">
                  <Github className="h-5 w-5 mr-2" />
                  View on GitHub
                </Button>
              </a>
              <a href={socialLinks.linkedin.url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  Let&apos;s Connect
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
