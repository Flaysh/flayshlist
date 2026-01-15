import {
  Code,
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
      { name: 'Next.js 16', desc: 'App Router, Server Components' },
      { name: 'React 19', desc: 'Latest concurrent features' },
      { name: 'TypeScript', desc: 'Strict mode, full type safety' },
      { name: 'Tailwind CSS 4', desc: 'Custom design system tokens' },
    ],
  },
  {
    category: 'Performance',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
    items: [
      { name: 'Zero Client JS', desc: 'Server-first architecture' },
      { name: 'WebP + Responsive Images', desc: 'Optimized asset delivery' },
      { name: 'Immutable Caching', desc: '1-year cache for static assets' },
    ],
  },
  {
    category: 'Testing & Quality',
    icon: TestTube,
    color: 'from-orange-500 to-red-500',
    items: [
      { name: 'Playwright', desc: 'E2E critical path coverage' },
      { name: 'TypeScript', desc: 'Compile-time validation' },
      { name: 'ESLint', desc: 'Automated code quality checks' },
    ],
  },
  {
    category: 'Production',
    icon: Server,
    color: 'from-green-500 to-emerald-500',
    items: [
      { name: 'Security Headers', desc: 'CSP, XSS, frame protection' },
      { name: 'GitHub Actions', desc: 'Automated CI/CD pipeline' },
      { name: '10MB Bundle', desc: '97.5% smaller than initial build' },
    ],
  },
];

const features = [
  { icon: Globe, label: 'Production-grade embed handling' },
  { icon: Sparkles, label: 'Local AI chat, zero API costs' },
  { icon: Zap, label: 'Server-first, minimal client JS' },
  { icon: CheckCircle, label: 'Comprehensive test coverage' },
  { icon: Palette, label: 'Custom design system' },
  { icon: Workflow, label: 'Automated quality gates' },
];

const architectureLayers = [
  { name: 'Presentation', tech: 'React Server Components', desc: 'Zero-JS by default, selective hydration' },
  { name: 'Design System', tech: 'Tailwind + CSS Tokens', desc: 'Consistent spacing, typography, color scales' },
  { name: 'Data Flow', tech: 'Static + Edge', desc: 'Static generation with edge runtime where needed' },
  { name: 'Quality Gates', tech: 'TypeScript + Playwright + CI', desc: 'Type safety, E2E tests, automated checks' },
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
          A minimal, fast, production-ready portfolio. Built with modern React patterns
          and zero unnecessary dependencies.
        </p>
        <div className="mt-6">
          <a href={socialLinks.githubRepo.url} target="_blank" rel="noopener noreferrer">
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
                          <span className="text-neutral-500 text-sm"> - {item.desc}</span>
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
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Homepage with embeds
│   │   ├── music/              # Music catalog
│   │   ├── reels/              # Instagram reels
│   │   ├── about/              # Full CV/resume
│   │   ├── chat/               # Local AI chat
│   │   └── tools/              # This page!
│   │
│   ├── components/
│   │   ├── ui/                 # Design system primitives
│   │   ├── layout/             # Header, Footer, Navigation
│   │   └── providers/          # React context (minimal)
│   │
│   ├── lib/
│   │   └── design-system/      # Tailwind utilities, cn()
│   │
│   └── data/                   # CV + static content
│
├── e2e/                        # Playwright smoke tests
├── .github/workflows/          # CI: lint, typecheck, test, build
└── public/                     # Static assets`}
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
                <li>• 10MB bundle (97.5% reduction)</li>
                <li>• Server Components by default</li>
                <li>• WebP images, responsive sizes</li>
                <li>• 1-year immutable cache headers</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <CheckCircle className="h-8 w-8 text-green-400 mb-3" />
              <h3 className="font-semibold text-neutral-100 mb-2">Quality</h3>
              <ul className="text-sm text-neutral-400 space-y-1">
                <li>• TypeScript strict mode</li>
                <li>• E2E critical path tests</li>
                <li>• Automated CI on every push</li>
                <li>• ESLint + type checking</li>
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
              {['Lint', 'Type Check', 'E2E Tests', 'Build'].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-sm text-neutral-200">{step}</span>
                  {i < 3 && <span className="text-neutral-600">→</span>}
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
              Built for Artlist
            </h2>
            <p className="text-neutral-400 mb-6">
              This project demonstrates production-grade React engineering: ruthless simplicity,
              performance-first architecture, and comprehensive quality gates. I build tools for
              creators because I am one.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={socialLinks.githubRepo.url} target="_blank" rel="noopener noreferrer">
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
