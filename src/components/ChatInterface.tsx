'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Clock, Info } from 'lucide-react';
import { ChatMessage } from '@/lib/types';
import { stripRiskTag } from '@/lib/parse-risk';
import RiskBadge from './RiskBadge';
import ProductFulfillment from './ProductFulfillment';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

function formatTime(date: Date) {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/** Very simple markdown-like rendering: bold, newlines, bullet lists */
function renderContent(text: string) {
  const cleaned = stripRiskTag(text);
  // Split into paragraphs
  const paragraphs = cleaned.split(/\n\n+/);

  return paragraphs.map((para, i) => {
    // Check if it's a list block
    const lines = para.split('\n');
    const isList = lines.every(
      (l) => l.trim().startsWith('- ') || l.trim().startsWith('* ') || l.trim() === ''
    );

    if (isList && lines.filter((l) => l.trim()).length > 0) {
      return (
        <ul key={i} className="list-disc pl-5 mb-3 space-y-1">
          {lines
            .filter((l) => l.trim())
            .map((l, j) => (
              <li key={j}>
                {renderInline(l.replace(/^[\s]*[-*]\s*/, ''))}
              </li>
            ))}
        </ul>
      );
    }

    return (
      <p key={i} className="mb-3 last:mb-0 leading-relaxed">
        {renderInline(para.replace(/\n/g, ' '))}
      </p>
    );
  });
}

/** Render bold **text** and *italic* */
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Bold: **text**
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      parts.push(<strong key={match.index} className="font-semibold text-white">{match[1]}</strong>);
    } else if (match[2]) {
      parts.push(<em key={match.index} className="italic text-white/80">{match[2]}</em>);
    } else if (match[3]) {
      parts.push(
        <code key={match.index} className="rounded bg-white/8 px-1.5 py-0.5 text-sm font-mono text-[var(--accent)]">
          {match[3]}
        </code>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length ? parts : [text];
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-start gap-3 max-w-[85%]"
    >
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[rgba(120,222,171,0.16)] bg-[rgba(120,222,171,0.1)] text-[var(--accent)] shadow-[0_8px_20px_rgba(120,222,171,0.1)]">
        <Bot size={16} className="text-white" />
      </div>
      <div className="rounded-[22px] rounded-bl-md border border-white/10 bg-white/[0.05] px-5 py-3.5 shadow-[0_14px_28px_rgba(0,0,0,0.16)]">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="typing-dot h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="typing-dot h-2 w-2 rounded-full bg-[var(--accent)]" />
        </div>
      </div>
    </motion.div>
  );
}

function WelcomeScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center"
    >
      <div className="relative mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-[28px] border border-[rgba(120,222,171,0.18)] bg-[radial-gradient(circle_at_top,rgba(120,222,171,0.18),transparent_60%),rgba(255,255,255,0.04)] shadow-[0_20px_50px_rgba(120,222,171,0.08)]">
          <Bot size={36} className="text-white" />
        </div>
        <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#082108] bg-[var(--accent)]">
          <span className="text-white text-xs font-bold">✓</span>
        </div>
      </div>

      <h2 className="mb-2 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
        Welcome to <span className="text-[var(--accent)]">Prognos AI</span>
      </h2>
      <p className="mb-8 max-w-md text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
        Describe your symptoms or upload an image for an instant AI-powered medical triage assessment.
      </p>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { icon: '🩺', label: 'Symptom Check', desc: '"I have a persistent headache and fever"' },
          { icon: '📸', label: 'Image Analysis', desc: 'Upload a photo of a rash or wound' },
          { icon: '💊', label: 'Medicine Info', desc: 'Share a photo of your medication' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="group cursor-default rounded-[24px] border border-white/10 bg-white/[0.04] p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(120,222,171,0.22)] hover:shadow-[0_16px_32px_rgba(120,222,171,0.08)]"
          >
            <span className="text-2xl mb-2 block">{item.icon}</span>
            <p className="mb-1 text-sm font-semibold text-white">{item.label}</p>
            <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ChatInterface({ messages, isLoading }: ChatInterfaceProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return <WelcomeScreen />;
  }

  return (
    <div className="flex-1 space-y-4 overflow-y-auto bg-[linear-gradient(180deg,rgba(7,26,7,0.12),rgba(7,26,7,0.02))] px-4 py-6 sm:px-5">
      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border shadow-[0_8px_20px_rgba(0,0,0,0.12)]
                ${
                  msg.role === 'user'
                    ? 'border-[rgba(120,222,171,0.26)] bg-[rgba(120,222,171,0.2)]'
                    : 'border-white/10 bg-white/[0.05]'
                }`}
            >
              {msg.role === 'user' ? (
                <User size={16} className="text-white" />
              ) : (
                <Bot size={16} className="text-white" />
              )}
            </div>

            <div className={`flex flex-col gap-2 max-w-[90%] sm:max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`w-fit relative group ${
                  msg.role === 'user'
                    ? 'rounded-[22px] rounded-br-md border border-[rgba(120,222,171,0.22)] bg-[linear-gradient(180deg,rgba(120,222,171,0.22),rgba(120,222,171,0.12))] text-white shadow-[0_16px_32px_rgba(120,222,171,0.08)]'
                    : 'rounded-[22px] rounded-bl-md border border-white/10 bg-white/[0.05] text-white/88 shadow-[0_14px_28px_rgba(0,0,0,0.15)]'
                } px-4 py-3`}
              >
                {msg.role === 'assistant' && msg.imageAnalysis && (
                  <div className="group/info absolute right-2 top-2 cursor-pointer text-white/45 hover:text-[var(--accent)]">
                    <Info size={14} />
                    <div className="invisible absolute right-0 top-5 z-20 w-64 whitespace-pre-wrap rounded-xl border border-white/10 bg-[#051406] p-3 text-xs text-white opacity-0 shadow-xl transition-all group-hover/info:visible group-hover/info:opacity-100">
                      <div className="mb-1 font-bold text-[var(--accent)]">Image Analysis</div>
                      {msg.imageAnalysis}
                    </div>
                  </div>
                )}
                {msg.images && msg.images.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {msg.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Attached ${i + 1}`}
                        className="h-32 w-32 rounded-xl border border-white/14 object-cover"
                      />
                    ))}
                  </div>
                )}

                {msg.role === 'assistant' && msg.riskLevel && (
                  <div className="mb-2">
                    <RiskBadge level={msg.riskLevel} size="sm" />
                  </div>
                )}

                <div
                  className={`text-sm sm:text-[15px] leading-relaxed ai-response ${
                    msg.role === 'user' ? 'text-white' : 'text-white/88'
                  }`}
                >
                  {msg.role === 'assistant' ? renderContent(msg.content) : msg.content}
                </div>

                <div
                  className={`flex items-center gap-1 mt-2 text-[11px] ${
                    msg.role === 'user' ? 'text-white/65' : 'text-white/45'
                  }`}
                >
                  <Clock size={10} />
                  {formatTime(msg.timestamp)}
                </div>
              </div>

              {msg.role === 'assistant' && msg.cartItems && msg.cartItems.length > 0 && (
                <div className="mt-1 w-full">
                  <ProductFulfillment items={msg.cartItems} />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {isLoading && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
}
