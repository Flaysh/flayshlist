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
  Database,
  Shield,
  Cpu,
  Layers,
  Image,
  Clock,
  Lock,
} from 'lucide-react';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { socialLinks } from '@/data/content';

export const metadata = {
  title: 'Technical Deep-Dive',
  description:
    'How I built this portfolio with Next.js 16, React 19, TypeScript, and Tailwind CSS. Server Components, AI integration, and production-grade patterns.',
};

const techStack = [
  {
    category: 'Frontend',
    icon: Palette,
    color: 'from-blue-500 to-cyan-500',
    items: [
      { name: 'Next.js 16', desc: 'App Router, Server Components' },
      { name: 'React 19', desc: 'Latest concurrent features' },
      { name: 'TypeScript 5', desc: 'Strict mode, discriminated unions' },
      { name: 'Tailwind CSS 4', desc: 'Custom design system tokens' },
    ],
  },
  {
    category: 'AI & Infrastructure',
    icon: Cpu,
    color: 'from-amber-500 to-orange-500',
    items: [
      { name: 'Replicate', desc: 'FLUX + Stable Diffusion 3 models' },
      { name: 'Vercel Blob', desc: 'CDN-backed image storage' },
      { name: 'Vercel KV', desc: 'Redis-compatible metadata' },
      { name: 'Upstash Ratelimit', desc: 'Sliding window rate limiting' },
    ],
  },
  {
    category: 'Testing & Quality',
    icon: TestTube,
    color: 'from-green-500 to-emerald-500',
    items: [
      { name: 'Playwright', desc: 'E2E critical path coverage' },
      { name: 'TypeScript Strict', desc: 'Compile-time validation' },
      { name: 'ESLint 9', desc: 'Automated code quality' },
    ],
  },
  {
    category: 'Production',
    icon: Server,
    color: 'from-purple-500 to-pink-500',
    items: [
      { name: 'GitHub Actions', desc: '3 parallel CI jobs' },
      { name: 'Security Headers', desc: 'CSP, XSS, frame protection' },
      { name: 'Vercel Analytics', desc: 'Performance monitoring' },
    ],
  },
];

const features = [
  { icon: Image, label: 'Full-stack AI image generation' },
  { icon: Globe, label: 'Production-grade embed handling' },
  { icon: Sparkles, label: 'Local AI chat, zero API costs' },
  { icon: Zap, label: 'Server-first, minimal client JS' },
  { icon: CheckCircle, label: 'Comprehensive E2E testing' },
  { icon: Palette, label: 'Custom design system' },
];

const aiToolkitFeatures = [
  {
    icon: Layers,
    title: 'Multi-Model Support',
    desc: 'FLUX Schnell (fast), FLUX Pro (quality), SD3 (creative control)',
  },
  {
    icon: Image,
    title: 'Aspect Ratios',
    desc: '1:1, 16:9, 9:16, 4:3, 3:4 with auto dimension calculation',
  },
  {
    icon: Database,
    title: 'Persistent Gallery',
    desc: 'Vercel KV storage with 60-image auto-cleanup',
  },
  {
    icon: Lock,
    title: 'Rate Limiting',
    desc: 'Two-tier sliding window (5/hr, 20/day) with dev bypass',
  },
  {
    icon: Clock,
    title: 'Recreate Flow',
    desc: 'Click any image to regenerate with identical settings',
  },
  {
    icon: Shield,
    title: 'Type-Safe API',
    desc: 'Discriminated unions for error handling',
  },
];

const architectureLayers = [
  { name: 'Presentation', tech: 'React Server Components', desc: 'Zero-JS by default, selective hydration' },
  { name: 'Design System', tech: 'Tailwind + CSS Variables', desc: 'Consistent spacing, typography, color scales' },
  { name: 'API Layer', tech: 'Route Handlers + Edge', desc: 'Validation, rate limiting, external API calls' },
  { name: 'Infrastructure', tech: 'Replicate + Vercel KV/Blob', desc: 'AI models, persistent storage, CDN delivery' },
  { name: 'Quality Gates', tech: 'TypeScript + Playwright + CI', desc: 'Type safety, E2E tests, automated checks' },
];

const engineeringDecisions = [
  {
    decision: 'Discriminated Union Responses',
    rationale: 'TypeScript enforces handling success/error cases at compile time',
    example: 'type Response = { success: true; data } | { success: false; error }',
  },
  {
    decision: 'Model Capability Flags',
    rationale: 'Adding new AI models only requires config changes, not code changes',
    example: 'supportsNegativePrompt, supportsGuidanceScale, maxGuidanceScale',
  },
  {
    decision: 'Server/Client Boundary',
    rationale: 'Server fetches initial data for fast first paint, client handles state',
    example: 'page.tsx (server) → client.tsx (state management)',
  },
  {
    decision: 'Two-Tier Rate Limiting',
    rationale: 'Burst protection (hourly) + quota management (daily) for cost control',
    example: '5 requests/hour, 20 requests/day, localhost bypass',
  },
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
          A production-grade portfolio with full-stack AI capabilities. Built with modern React patterns,
          type-safe APIs, and infrastructure that scales.
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

      {/* AI Toolkit Section */}
      <section className="mb-16">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Sparkles className="h-6 w-6 text-accent-400" />
          <h2 className="text-2xl font-bold text-neutral-100">AI Image Generation Toolkit</h2>
          <Badge variant="default" className="bg-accent-500/20 text-accent-400 border-accent-500/30">Flagship Feature</Badge>
        </div>
        <Card className="bg-gradient-to-br from-accent-900/20 to-primary-900/20 border-accent-800/30">
          <CardContent className="p-8">
            <p className="text-neutral-400 text-center mb-8 max-w-2xl mx-auto">
              A production-grade AI image generation system demonstrating full-stack capabilities:
              API design, state management, rate limiting, and multi-service integration.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {aiToolkitFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-4 w-4 text-accent-400" />
                      <span className="font-semibold text-neutral-100 text-sm">{feature.title}</span>
                    </div>
                    <p className="text-neutral-400 text-xs">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <a href="/ai-toolkit">
                <Button variant="outline" className="border-accent-500/50 text-accent-400 hover:bg-accent-500/10">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Try the AI Toolkit
                </Button>
              </a>
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

      {/* Engineering Decisions */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-100 mb-8 text-center">Key Engineering Decisions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {engineeringDecisions.map((item) => (
            <Card key={item.decision}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-neutral-100 mb-2">{item.decision}</h3>
                <p className="text-sm text-neutral-400 mb-3">{item.rationale}</p>
                <code className="text-xs bg-neutral-800 text-accent-400 px-2 py-1 rounded block overflow-x-auto">
                  {item.example}
                </code>
              </CardContent>
            </Card>
          ))}
        </div>
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
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx              # Homepage with hero
│   │   ├── ai-toolkit/           # AI Image Generation
│   │   │   ├── page.tsx          # Server (data fetch)
│   │   │   └── client.tsx        # Client (state)
│   │   ├── api/ai/image/         # Generation endpoint
│   │   ├── performance/          # Platform analysis
│   │   ├── music/, reels/, about/, chat/, tools/
│   │   └── layout.tsx, error.tsx, globals.css
│   │
│   ├── components/
│   │   ├── ai-toolkit/           # 1000+ lines
│   │   │   ├── PromptDock.tsx    # Main interface (352 lines)
│   │   │   ├── MasonryGrid.tsx   # Gallery + lazy load
│   │   │   ├── AssetModal.tsx    # Full-screen viewer
│   │   │   └── ModelSelector, AspectRatioSelector...
│   │   ├── ui/                   # Design system
│   │   ├── layout/               # Header, Footer
│   │   └── performance/          # Dashboard components
│   │
│   ├── lib/
│   │   ├── ai-models.ts          # Model configs (109 lines)
│   │   ├── gallery.ts            # KV operations (131 lines)
│   │   ├── ratelimit.ts          # Rate limiting (77 lines)
│   │   └── design-system/
│   │
│   └── types/ai.ts               # Discriminated unions
│
├── docs/AI_TOOLKIT.md            # Technical documentation
├── e2e/smoke.spec.ts             # Playwright tests
└── .github/workflows/ci.yml      # 3 parallel CI jobs`}
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
                <li>Server Components by default</li>
                <li>WebP images, responsive sizes</li>
                <li>1-year immutable cache headers</li>
                <li>Lazy loading in masonry grid</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <CheckCircle className="h-8 w-8 text-green-400 mb-3" />
              <h3 className="font-semibold text-neutral-100 mb-2">Quality</h3>
              <ul className="text-sm text-neutral-400 space-y-1">
                <li>TypeScript strict mode</li>
                <li>Discriminated union types</li>
                <li>E2E critical path tests</li>
                <li>Automated CI on every push</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Shield className="h-8 w-8 text-purple-400 mb-3" />
              <h3 className="font-semibold text-neutral-100 mb-2">Production</h3>
              <ul className="text-sm text-neutral-400 space-y-1">
                <li>Two-tier rate limiting</li>
                <li>Security headers configured</li>
                <li>Auto-cleanup (60 image limit)</li>
                <li>Graceful error handling</li>
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
            <p className="text-xs text-neutral-500 mt-4">
              3 parallel jobs: lint+typecheck, e2e, build. Artifacts uploaded for test reports.
            </p>
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
              type-safe APIs, and infrastructure that scales. I build tools for
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
