'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Send, User, Copy, Check, RefreshCw, Trash2, Bot } from 'lucide-react';
import { cn, focusRing } from '@/lib/design-system';
import { Button, Card } from '@/components/ui';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
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

  if (q.includes('music') || q.includes('flaysh') || q.includes('soundcloud') || q.includes('produce') || q.includes('dj') || q.includes('dnb') || q.includes('drum and bass')) {
    return `Itay produces music under the artist name **FLAYSH**! 🎧\n\n**Genre:** Neuro-Future DnB (Drum and Bass)\n\n**Where to listen:**\n• SoundCloud: soundcloud.com/flay5h\n• Spotify: Search "FLAYSH"\n\nHe's also performed at **Desert Bass Festival** and other events. This musical background gives him a unique perspective on creative tools like Artlist!`;
  }

  if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('study')) {
    return `Itay's education:\n\n🎓 **The Open University of Israel** (2024)\nBachelor's degree in Computer Science and Business\n\n💻 **John Bryce** (2019)\n.NET Framework / Web Application Development\n\nCombined with 6+ years of hands-on experience, he brings both theoretical foundation and practical expertise!`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire')) {
    return `Here's how to reach Itay:\n\n📧 **Email:** itayf3x@gmail.com\n📱 **Phone:** (972) 597-9140\n📍 **Location:** Tel Aviv, Israel\n\n**Social/Professional:**\n• GitHub: github.com/Flaysh\n• LinkedIn: linkedin.com/in/flaysh\n• Instagram: @flaysh_\n\nHe'd love to hear from you! 🤝`;
  }

  if (q.includes('flayshlist') || q.includes('this app') || q.includes('this project') || q.includes('portfolio') || q.includes('built this')) {
    return `**FlayshList** is this very app you're using! It's a portfolio project Itay built to showcase his skills for Artlist.\n\n**Tech Stack:**\n• Next.js 16 (App Router) + TypeScript\n• Tailwind CSS + custom design system\n• Prisma + SQLite\n• TanStack Query + Zustand\n• Playwright for E2E testing\n\n**Features:**\n• Real SoundCloud & Instagram embeds\n• This AI chat (local knowledge base)\n• Responsive, accessible, dark-first design\n• Full CI/CD setup with GitHub Actions\n\nCheck out the /tools page for more technical details! 🛠️`;
  }

  if (q.includes('your name') || q.includes('who are you') || q.includes('introduce')) {
    return `I'm an AI assistant representing **Itay Flaysher** (also known as FLAYSH).\n\nQuick intro:\n• Full Stack / Frontend Engineer with 6+ years of experience\n• Currently at Apono in Tel Aviv\n• Specializes in React, Next.js, TypeScript, NestJS, GraphQL\n• Also an AudioVisual Artist producing electronic music\n\nWhat would you like to know more about? 😊`;
  }

  if (q.includes('current') || q.includes('now') || q.includes('where do you work')) {
    return `Currently, Itay works as a **Full Stack Engineer at Apono** (since April 2024) in Tel Aviv, Israel.\n\nAt Apono he:\n• Owns 4 production client applications\n• Maintains NestJS + GraphQL BFF service\n• Builds features end-to-end from definition to production\n• Contributes to 99.999% uptime target\n\nHe's looking to bring these skills to a creative tech company like Artlist! 🎯`;
  }

  if (q.includes('ai') || q.includes('machine learning') || q.includes('llm')) {
    return `Itay is excited about the **AI/ML space** and is actively building his expertise!\n\n**AI Experience:**\n• Built this very AI chat interface you're using\n• Experience integrating LLM APIs and building conversational UIs\n• Strong foundation in building data-driven applications\n• Passionate about the intersection of AI and creative tools\n\n**Why AI at Artlist:**\n• AI-powered music search and recommendations\n• Intelligent content tagging and organization\n• Personalized creator experiences\n• The future of creative tools is AI-enhanced!\n\nHe's eager to contribute to Artlist's AI initiatives! 🤖`;
  }

  return `That's an interesting question! I'm knowledgeable about Itay's professional experience, technical skills, projects (like Apono, Landa, MoonWiz), his music as FLAYSH, and why he's interested in Artlist.\n\nTry asking things like:\n• "What's your tech stack?"\n• "Tell me about your work at Apono"\n• "Why are you interested in Artlist?"\n• "What music do you produce?"\n• "How did you build FlayshList?"`;
};

const suggestedQuestions = [
  { text: "What's your tech stack?", icon: "💻" },
  { text: "Tell me about Apono", icon: "🏢" },
  { text: "Why Artlist?", icon: "🎵" },
  { text: "What music do you make?", icon: "🎧" },
];

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const renderText = (text: string) => {
  return text.split('\n').map((line, i) => (
    <p key={i} className={i > 0 ? 'mt-2' : ''}>
      {line.split('**').map((part, j) =>
        j % 2 === 1 ? <strong key={j} className="font-semibold text-primary-400">{part}</strong> : part
      )}
    </p>
  ));
};

export const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hey! 👋 I'm an AI assistant that knows all about Itay Flaysher. Ask me anything about his experience, skills, projects, or music career as FLAYSH!`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  // Scroll to bottom of messages container
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, streamingContent]);

  const nextId = () => {
    idRef.current += 1;
    return idRef.current.toString();
  };

  const streamResponse = useCallback(async (response: string, messageId: string) => {
    const words = response.split(' ');
    let currentContent = '';

    for (let i = 0; i < words.length; i++) {
      currentContent += (i === 0 ? '' : ' ') + words[i];
      setStreamingContent(currentContent);
      await new Promise(resolve => setTimeout(resolve, 15 + Math.random() * 25));
    }

    setMessages(prev => prev.map(msg =>
      msg.id === messageId
        ? { ...msg, content: response, isStreaming: false }
        : msg
    ));
    setStreamingContent('');
    setIsTyping(false);
  }, []);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isTyping) return;

    const userMessage: Message = {
      id: nextId(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 400));

    const response = generateResponse(messageText);
    const assistantMessageId = nextId();

    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages(prev => [...prev, assistantMessage]);
    await streamResponse(response, assistantMessageId);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegenerate = async (messageIndex: number) => {
    const userMessageIndex = messageIndex - 1;
    if (userMessageIndex < 0 || messages[userMessageIndex]?.role !== 'user') return;

    const userQuestion = messages[userMessageIndex].content;
    setMessages(prev => prev.filter((_, i) => i !== messageIndex));
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 400));

    const response = generateResponse(userQuestion);
    const assistantMessageId = nextId();

    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages(prev => [...prev, assistantMessage]);
    await streamResponse(response, assistantMessageId);
  };

  const handleClearChat = () => {
    setMessages([{
      id: nextId(),
      role: 'assistant',
      content: `Chat cleared! I'm ready to answer more questions about Itay. What would you like to know?`,
      timestamp: new Date(),
    }]);
  };

  return (
    <Card className="border-neutral-700/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-neutral-900 bg-green-500" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-100">FLAYSH Assistant</h3>
            <p className="text-xs text-neutral-500">Online</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearChat}
          className="text-neutral-400 hover:text-neutral-100"
          aria-label="Clear chat"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="h-[420px] overflow-y-auto p-4 space-y-4 bg-neutral-900/30"
      >
        {messages.map((message, index) => (
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

            <div className="group flex flex-col max-w-[80%]">
              <div
                className={cn(
                  'rounded-2xl px-4 py-2.5',
                  message.role === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-800 text-neutral-100'
                )}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.isStreaming ? renderText(streamingContent) : renderText(message.content)}
                  {message.isStreaming && (
                    <span className="inline-block w-0.5 h-4 ml-0.5 bg-primary-400 animate-pulse" />
                  )}
                </div>
              </div>

              <div className={cn(
                'flex items-center gap-2 mt-1 px-1',
                message.role === 'user' ? 'flex-row-reverse' : ''
              )}>
                <span className="text-[10px] text-neutral-500">
                  {formatTime(message.timestamp)}
                </span>

                {message.role === 'assistant' && !message.isStreaming && (
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCopy(message.content, message.id)}
                      className={cn('p-1 rounded hover:bg-neutral-700/50', focusRing)}
                      aria-label="Copy message"
                    >
                      {copiedId === message.id ? (
                        <Check className="h-3 w-3 text-green-400" />
                      ) : (
                        <Copy className="h-3 w-3 text-neutral-400" />
                      )}
                    </button>
                    {index > 0 && (
                      <button
                        onClick={() => handleRegenerate(index)}
                        className={cn('p-1 rounded hover:bg-neutral-700/50', focusRing)}
                        aria-label="Regenerate"
                      >
                        <RefreshCw className="h-3 w-3 text-neutral-400" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && !streamingContent && (
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
      </div>

      {/* Suggestions */}
      <div className="border-t border-neutral-800 bg-neutral-900/50 px-4 py-2.5">
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q) => (
            <button
              key={q.text}
              onClick={() => handleSend(q.text)}
              disabled={isTyping}
              className={cn(
                'rounded-full bg-neutral-800 px-3 py-1.5 text-xs text-neutral-300',
                'hover:bg-neutral-700 hover:text-neutral-100 transition-colors',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                focusRing
              )}
            >
              <span className="mr-1.5">{q.icon}</span>
              {q.text}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-neutral-800 p-4 bg-neutral-900">
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about Itay..."
            disabled={isTyping}
            className={cn(
              'flex-1 rounded-xl bg-neutral-800 px-4 py-2.5 text-sm text-neutral-100',
              'placeholder-neutral-500 outline-none',
              'focus:ring-2 focus:ring-primary-500/50',
              'disabled:opacity-50'
            )}
          />
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="rounded-xl"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
