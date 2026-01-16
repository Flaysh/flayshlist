import Image from 'next/image';
import { Bot, Zap, Shield, Brain } from 'lucide-react';
import { AiChat } from './ai-chat';

export const metadata = {
  title: 'AI Chat - FlayshList',
  description: 'Chat with an AI assistant that knows all about Itay Flaysher.',
};

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="text-center mb-8">
        <div className="relative inline-block mb-6">
          <div className="absolute -inset-1 bg-linear-to-r from-primary-500/20 via-primary-400/10 to-primary-500/20 rounded-full blur-xl" />
          <Image
            src="/FLAYSH_pfp.jpg"
            alt="Itay Flaysher"
            width={96}
            height={96}
            className="relative rounded-full border-2 border-primary-500/30 shadow-xl shadow-primary-500/10"
            priority
          />
          <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-primary-500 to-primary-600 border-2 border-neutral-900 shadow-lg">
            <Bot className="h-4 w-4 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-neutral-100 mb-2">
          AI-Powered Assistant
        </h1>
        <p className="text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Have a conversation with an AI that knows everything about my experience,
          skills, projects, and creative work. Built to showcase modern chat UX patterns.
        </p>

        {/* Feature Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-neutral-800/50 border border-neutral-700/50 px-4 py-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-neutral-300">Streaming Responses</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-neutral-800/50 border border-neutral-700/50 px-4 py-2">
            <Brain className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-neutral-300">Context-Aware</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-neutral-800/50 border border-neutral-700/50 px-4 py-2">
            <Shield className="h-4 w-4 text-green-400" />
            <span className="text-sm text-neutral-300">Privacy-First</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs text-neutral-500 mb-3 uppercase tracking-wider">Try asking</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full bg-primary-500/10 border border-primary-500/20 px-3 py-1.5 text-xs text-primary-400 hover:bg-primary-500/20 transition-colors cursor-default">
              &quot;What&apos;s your tech stack?&quot;
            </span>
            <span className="rounded-full bg-primary-500/10 border border-primary-500/20 px-3 py-1.5 text-xs text-primary-400 hover:bg-primary-500/20 transition-colors cursor-default">
              &quot;Tell me about Apono&quot;
            </span>
            <span className="rounded-full bg-primary-500/10 border border-primary-500/20 px-3 py-1.5 text-xs text-primary-400 hover:bg-primary-500/20 transition-colors cursor-default">
              &quot;Why Artlist?&quot;
            </span>
            <span className="rounded-full bg-primary-500/10 border border-primary-500/20 px-3 py-1.5 text-xs text-primary-400 hover:bg-primary-500/20 transition-colors cursor-default">
              &quot;Tell me about the AI team&quot;
            </span>
          </div>
        </div>
      </div>

      <AiChat />

      <div className="mt-6 text-center">
        <p className="text-xs text-neutral-500">
          Built with React, TypeScript & modern chat UX patterns
        </p>
      </div>
    </div>
  );
}
