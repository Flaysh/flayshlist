'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Send, User, Loader2 } from 'lucide-react';
import { cn, focusRing } from '@/lib/design-system';
import { Button, Card } from '@/components/ui';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const generateResponse = (question: string): string => {
  const q = question.toLowerCase();
  
  if (q.match(/^(hi|hello|hey|yo|sup)/)) {
    return `Hey there! 👋 I'm an AI assistant here to tell you about Itay Flaysher (FLAYSH). I can answer questions about his experience, skills, projects, or even his music. What would you like to know?`;
  }

  if (q.includes('tech stack') || q.includes('technologies') || q.includes('skills') || q.includes('what do you know')) {
    return `Itay's core tech stack includes:\n\n**Frontend:** React.js, Next.js, TypeScript\n**Backend:** NestJS, GraphQL, Node.js\n**DevOps:** CI/CD, AWS, Automated Testing\n**Architecture:** System Architecture, API Design, Filtering & Pagination patterns\n\nHe's been working with React for 6+ years and has deep expertise in building production-grade applications. Currently using this stack at Apono!`;
  }

  if (q.includes('experience') || q.includes('work history') || q.includes('career') || q.includes('background')) {
    return `Itay has 6+ years of professional experience:\n\n🏢 **Apono** (Current) - Full Stack Engineer\nOwns 4 production client apps, maintains NestJS + GraphQL BFF, targets 99.999% uptime.\n\n🏢 **Apono** (2023-2024) - Frontend Engineer\nPrimary engineer for Admin, Portal, and Teams Apps.\n\n🏠 **Landa** (2022-2023) - Frontend Engineer\nLead developer for the real estate investing platform web.landa.app.\n\n🌙 **MoonWiz** (2020-2022) - Co-Founder & Lead Engineer\nCo-founded a crypto trading platform, led a team of 2 engineers.`;
  }

  if (q.includes('apono')) {
    return `At **Apono**, Itay works as a Full Stack Engineer (since April 2024). Key highlights:\n\n• Develops and maintains 4 production client applications (admin + end-user)\n• Maintains a NestJS + GraphQL BFF service\n• Implements scalable data access patterns (filtering, pagination)\n• Contributes to CI/CD practices supporting 99.999% uptime\n• Takes features end-to-end from product definition to production\n\nPreviously was a Frontend Engineer there (May 2023 - April 2024) where he owned the Admin, Portal, and Teams Apps.`;
  }

  if (q.includes('landa')) {
    return `At **Landa** (May 2022 - April 2023), Itay was the lead frontend developer for their real estate investing platform.\n\nKey achievements:\n• Spearheaded frontend delivery for a complex investment platform\n• Built production features using React, Next.js, TypeScript\n• Managed CI/CD environment for reliable deployments\n\nThe product is live at web.landa.app - it lets people buy shares of rental properties! 🏠`;
  }

  if (q.includes('moonwiz') || q.includes('startup') || q.includes('co-found')) {
    return `**MoonWiz** was Itay's startup (January 2020 - March 2022) where he was Co-Founder and Lead Software Engineer.\n\nWhat they built:\n• A smart network for crypto trading ideas and strategies\n• Full stack: React (frontend), Python (backend), AWS services\n\nWhat he did:\n• Led the project from POC → design → build\n• Owned CI/CD and infrastructure\n• Managed and mentored a team of 2 engineers\n\nThis entrepreneurial experience gave him strong ownership skills and end-to-end delivery expertise! 🚀`;
  }

  if (q.includes('artlist') || q.includes('why applying') || q.includes('why interested')) {
    return `Great question! Itay is drawn to **Artlist** because it sits at the intersection of his two passions: **technology and creativity**.\n\nAs a music producer, he understands the creator's perspective:\n• The frustration of searching for the perfect track\n• The joy of finding that sound that elevates a project\n• The importance of a seamless, intuitive interface\n\nHe built FlayshList (this portfolio app!) to demonstrate that he doesn't just understand Artlist's product - he's passionate about it. He wants to help build tools that empower creators like himself! 🎵`;
  }

  if (q.includes('music') || q.includes('flaysh') || q.includes('soundcloud') || q.includes('produce') || q.includes('dj')) {
    return `Itay produces music under the artist name **FLAYSH**! 🎧\n\n**Genres:** Desert Bass, Electronic, Ambient\n\n**Where to listen:**\n• SoundCloud: soundcloud.com/flay5h\n• Spotify: Search "FLAYSH"\n\n**Notable tracks:**\n• "Ascend" - uplifting electronic\n• "Desert Bass New Dawn" - sunrise session\n• "Emotional Rollercoaster" - deep desert bass set\n\nThis musical background gives him a unique perspective on creative tools like Artlist!`;
  }

  if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('study')) {
    return `Itay's education:\n\n🎓 **The Open University of Israel** (2024)\nBachelor's degree in Computer Science and Business\n\n💻 **John Bryce** (2019)\n.NET Framework / Web Application Development\n\nCombined with 6+ years of hands-on experience, he brings both theoretical foundation and practical expertise!`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire')) {
    return `Here's how to reach Itay:\n\n📧 **Email:** itayf3x@gmail.com\n📱 **Phone:** (972) 597-9140\n📍 **Location:** Tel Aviv, Israel\n\n**Social/Professional:**\n• GitHub: github.com/Flaysh\n• LinkedIn: linkedin.com/in/flaysh\n• Instagram: @flaysh_\n\nHe'd love to hear from you! 🤝`;
  }

  if (q.includes('flayshlist') || q.includes('this app') || q.includes('this project') || q.includes('portfolio') || q.includes('built this')) {
    return `**FlayshList** is this very app you're using! It's a portfolio project Itay built to showcase his skills for Artlist.\n\n**Tech Stack:**\n• Next.js 16 (App Router) + TypeScript\n• Tailwind CSS + custom design system\n• Prisma + SQLite\n• TanStack Query + Zustand\n• Vitest + Playwright for testing\n\n**Features:**\n• Real SoundCloud & Instagram embeds\n• This AI chat (local knowledge base)\n• Responsive, accessible, dark-first design\n• Full CI/CD setup with GitHub Actions\n\nCheck out the /tools page for more technical details! 🛠️`;
  }

  if (q.includes('your name') || q.includes('who are you') || q.includes('introduce')) {
    return `I'm an AI assistant representing **Itay Flaysher** (also known as FLAYSH).\n\nQuick intro:\n• Full Stack / Frontend Engineer with 6+ years of experience\n• Currently at Apono in Tel Aviv\n• Specializes in React, Next.js, TypeScript, NestJS, GraphQL\n• Also an AudioVisual Artist producing electronic music\n\nWhat would you like to know more about? 😊`;
  }

  if (q.includes('current') || q.includes('now') || q.includes('where do you work')) {
    return `Currently, Itay works as a **Full Stack Engineer at Apono** (since April 2024) in Tel Aviv, Israel.\n\nAt Apono he:\n• Owns 4 production client applications\n• Maintains NestJS + GraphQL BFF service\n• Builds features end-to-end from definition to production\n• Contributes to 99.999% uptime target\n\nHe's looking to bring these skills to a creative tech company like Artlist! 🎯`;
  }

  return `That's an interesting question! I'm knowledgeable about Itay's professional experience, technical skills, projects (like Apono, Landa, MoonWiz), his music as FLAYSH, and why he's interested in Artlist.\n\nTry asking things like:\n• "What's your tech stack?"\n• "Tell me about your work at Apono"\n• "Why are you interested in Artlist?"\n• "What music do you produce?"\n• "How did you build FlayshList?"`;
};

const suggestedQuestions = [
  "What's your tech stack?",
  "Tell me about Apono",
  "Why Artlist?",
  "What music do you make?",
  "How did you build this?",
];

export const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hey! 👋 I'm an AI assistant that knows all about Itay Flaysher. Ask me anything about his experience, skills, projects, or music career as FLAYSH!\n\nHere are some things you can ask:\n• His tech stack and experience\n• Current and past roles\n• Why he's interested in Artlist\n• His music production`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));

    const response = generateResponse(messageText);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="border-neutral-700 overflow-hidden">
      <div className="h-[500px] overflow-y-auto p-4 space-y-4 bg-neutral-900/50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3',
              message.role === 'user' ? 'flex-row-reverse' : ''
            )}
          >
            {message.role === 'user' ? (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500">
                <User className="h-4 w-4 text-white" />
              </div>
            ) : (
              <Image
                src="/FLAYSH_pfp.jpg"
                alt="FLAYSH"
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 rounded-full object-cover"
              />
            )}
            <div
              className={cn(
                'rounded-2xl px-4 py-3 max-w-[80%]',
                message.role === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-800 text-neutral-100'
              )}
            >
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.content.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-2' : ''}>
                    {line.split('**').map((part, j) => 
                      j % 2 === 1 ? <strong key={j} className="font-semibold">{part}</strong> : part
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <Image
              src="/FLAYSH_pfp.jpg"
              alt="FLAYSH"
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-full object-cover"
            />
            <div className="rounded-2xl bg-neutral-800 px-4 py-3">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="h-2 w-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="h-2 w-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-neutral-800 bg-neutral-900/30 px-4 py-3">
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              onClick={() => handleSend(question)}
              className={cn(
                'rounded-full bg-neutral-800 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100 transition-colors',
                focusRing
              )}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-800 p-4 bg-neutral-900">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about me..."
            className={cn(
              'flex-1 rounded-xl bg-neutral-800 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 outline-none',
              'focus:ring-2 focus:ring-primary-500/50'
            )}
          />
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="rounded-xl"
          >
            {isTyping ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};
