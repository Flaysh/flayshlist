import Image from 'next/image';
import Link from 'next/link';
import {
  Github,
  Linkedin,
  Instagram,
  Music,
  ExternalLink,
  Briefcase,
  Code,
  Sparkles,
  Heart,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Monitor,
  Layers,
} from 'lucide-react';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { cvData, socialLinks, contactInfo, audiovisualArtist, artlistHighlights } from '@/data/content';

export const metadata = {
  title: 'About Me - FlayshList',
  description: 'Learn about Itay Flaysher (FLAYSH) - Full Stack Engineer & AudioVisual Artist.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="text-center mb-12">
        <div className="mb-6">
          <Image
            src="/FLAYSH_pfp.jpg"
            alt="Itay Flaysher"
            width={120}
            height={120}
            className="mx-auto rounded-full border-2 border-neutral-700 shadow-lg"
            priority
          />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-2 text-primary-400 mb-4">
          <Sparkles className="h-4 w-4" />
          Full CV / Resume
        </div>
        <h1 className="text-4xl font-bold text-neutral-100 sm:text-5xl">{cvData.name}</h1>
        <p className="mt-2 text-xl text-primary-400">{cvData.title}</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-400">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {contactInfo.location}
          </span>
          <span className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            {contactInfo.email}
          </span>
          <span className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            {contactInfo.phone}
          </span>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <a href={socialLinks.github.url} target="_blank" rel="noopener noreferrer">
            <Button>
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </a>
          <a href={socialLinks.linkedin.url} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
          </a>
        </div>
      </div>

      <Card className="mb-12">
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-neutral-100 mb-4">Summary</h2>
          <p className="text-neutral-300 leading-relaxed">{cvData.summary}</p>
        </CardContent>
      </Card>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="h-5 w-5 text-primary-400" />
              <h2 className="text-2xl font-bold text-neutral-100">Professional Experience</h2>
            </div>
            <div className="space-y-6">
              {cvData.experience.map((exp, i) => (
                <Card key={i} className={exp.current ? 'border-primary-500/50' : ''}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-neutral-100">{exp.title}</h3>
                        <div className="flex items-center gap-2 text-primary-400">
                          <Building className="h-4 w-4" />
                          {exp.company}
                        </div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1">
                        {exp.current && (
                          <Badge variant="primary">Current</Badge>
                        )}
                        <span className="text-sm text-neutral-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </span>
                        <span className="text-sm text-neutral-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, j) => (
                        <li key={j} className="text-neutral-400 text-sm flex gap-2">
                          <span className="text-primary-400 mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.product && (
                      <div className="mt-4 pt-4 border-t border-neutral-800">
                        <span className="text-sm text-neutral-500">Product: </span>
                        {exp.product.urls.map((url, k) => (
                          <a
                            key={k}
                            href={`https://${url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-400 hover:text-primary-300 mr-2"
                          >
                            {url}
                          </a>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-6">
              <Heart className="h-5 w-5 text-accent-400" />
              <h2 className="text-2xl font-bold text-neutral-100">Why Artlist?</h2>
            </div>
            <Card className="bg-gradient-to-r from-accent-900/20 to-primary-900/20 border-accent-800/30">
              <CardContent className="p-6 space-y-4 text-neutral-300">
                <p>
                  I&apos;m drawn to Artlist because it sits at the intersection of my two passions:
                  <strong className="text-neutral-100"> technology and creativity</strong>.
                </p>
                <p>
                  I understand the creator&apos;s perspective because I live it. I know the friction of
                  finding the right track, the joy of discovery, and the need for a seamless interface.
                </p>
                <p>
                  Building FlayshList was my way of showing how I&apos;d help creators move faster
                  and feel more confident in their choices.
                </p>
                <div className="grid gap-4 sm:grid-cols-3 pt-2">
                  {artlistHighlights.map((highlight) => (
                    <div key={highlight.title} className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
                      <p className="text-sm font-semibold text-neutral-100">{highlight.title}</p>
                      <p className="mt-2 text-xs text-neutral-400">{highlight.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-6">
              <Monitor className="h-5 w-5 text-purple-400" />
              <h2 className="text-2xl font-bold text-neutral-100">Audiovisual Artistry</h2>
            </div>
            <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-800/30">
              <CardContent className="p-6 space-y-4 text-neutral-300">
                <p className="text-lg font-medium text-purple-300">
                  {audiovisualArtist.tagline}
                </p>
                <p>
                  {audiovisualArtist.bio}
                </p>
                <p>
                  {audiovisualArtist.visualsDescription}
                </p>
                <div className="pt-2">
                  <p className="text-sm text-neutral-400 mb-2">Tools & Techniques:</p>
                  <div className="flex flex-wrap gap-2">
                    {audiovisualArtist.skills.map((skill) => (
                      <Badge key={skill} variant="default" className="bg-purple-500/10 text-purple-300 border-purple-500/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t border-purple-800/30">
                  <Link 
                    href="/reels" 
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Layers className="h-4 w-4 mr-2" />
                    View Visual Work
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-primary-400" />
                <h3 className="font-semibold text-neutral-100">Education</h3>
              </div>
              <div className="space-y-4">
                {cvData.education.map((edu, i) => (
                  <div key={i}>
                    <p className="font-medium text-neutral-200">{edu.institution}</p>
                    <p className="text-sm text-neutral-400">{edu.degree}</p>
                    <p className="text-sm text-neutral-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-5 w-5 text-primary-400" />
                <h3 className="font-semibold text-neutral-100">Technical Skills</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide mb-2">Frontend</p>
                  <div className="flex flex-wrap gap-1">
                    {cvData.skills.frontend.map((skill) => (
                      <Badge key={skill} variant="default" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide mb-2">Backend</p>
                  <div className="flex flex-wrap gap-1">
                    {cvData.skills.backend.map((skill) => (
                      <Badge key={skill} variant="default" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide mb-2">Architecture</p>
                  <div className="flex flex-wrap gap-1">
                    {cvData.skills.architecture.map((skill) => (
                      <Badge key={skill} variant="default" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide mb-2">DevOps</p>
                  <div className="flex flex-wrap gap-1">
                    {cvData.skills.devops.map((skill) => (
                      <Badge key={skill} variant="default" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-neutral-100 mb-4">Connect</h3>
              <div className="space-y-2">
                <a
                  href={socialLinks.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg bg-neutral-800 px-4 py-3 text-neutral-200 hover:bg-neutral-700 transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="flex-1">GitHub</span>
                  <ExternalLink className="h-4 w-4 text-neutral-500" />
                </a>
                <a
                  href={socialLinks.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg bg-neutral-800 px-4 py-3 text-neutral-200 hover:bg-neutral-700 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="flex-1">LinkedIn</span>
                  <ExternalLink className="h-4 w-4 text-neutral-500" />
                </a>
                <a
                  href={socialLinks.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg bg-neutral-800 px-4 py-3 text-neutral-200 hover:bg-neutral-700 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="flex-1">Instagram</span>
                  <ExternalLink className="h-4 w-4 text-neutral-500" />
                </a>
                <a
                  href={socialLinks.soundcloud.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg bg-neutral-800 px-4 py-3 text-neutral-200 hover:bg-neutral-700 transition-colors"
                >
                  <Music className="h-5 w-5" />
                  <span className="flex-1">SoundCloud</span>
                  <ExternalLink className="h-4 w-4 text-neutral-500" />
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-neutral-100 mb-4">Passions</h3>
              <div className="flex flex-wrap gap-2">
                {cvData.passions.map((passion) => (
                  <Badge key={passion} variant="primary">
                    {passion}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
