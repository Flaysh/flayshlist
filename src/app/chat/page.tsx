import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { AiChat } from './ai-chat';

export const metadata = {
  title: 'Ask AI About Me - FlayshList',
  description: 'Chat with an AI agent that knows all about Itay Flaysher.',
};

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="text-center mb-8">
        <Image
          src="/FLAYSH_pfp.jpg"
          alt="Itay Flaysher"
          width={80}
          height={80}
          className="mx-auto rounded-full border-2 border-neutral-700 mb-4"
          priority
        />
        <h1 className="text-3xl font-bold text-neutral-100">Ask AI About Me</h1>
        <p className="mt-2 text-neutral-400 max-w-lg mx-auto">
          Have questions about my experience, skills, or work? Chat with an AI agent 
          that knows all about me. Try asking about my projects, tech stack, or why I&apos;m 
          interested in Artlist!
        </p>
        
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs text-primary-400">
            &quot;What&apos;s your tech stack?&quot;
          </span>
          <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs text-primary-400">
            &quot;Tell me about Apono&quot;
          </span>
          <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs text-primary-400">
            &quot;Why Artlist?&quot;
          </span>
          <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs text-primary-400">
            &quot;What music do you make?&quot;
          </span>
        </div>
      </div>

      <AiChat />

      <div className="mt-6 text-center">
        <p className="text-xs text-neutral-500 flex items-center justify-center gap-1">
          <Sparkles className="h-3 w-3" />
          Powered by local knowledge base • No external API calls
        </p>
      </div>
    </div>
  );
}
