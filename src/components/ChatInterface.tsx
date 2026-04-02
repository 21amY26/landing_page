'use client';

import React, { useRef, useEffect } from 'react';
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
      parts.push(<strong key={match.index} className="font-semibold text-slate-900">{match[1]}</strong>);
    } else if (match[2]) {
      parts.push(<em key={match.index} className="italic text-slate-600">{match[2]}</em>);
    } else if (match[3]) {
      parts.push(
        <code key={match.index} className="px-1.5 py-0.5 bg-slate-100 rounded text-sm font-mono text-healing-700">
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
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-healing-400 to-healing-600 flex items-center justify-center shadow-md">
        <Bot size={16} className="text-white" />
      </div>
      <div className="bubble-ai bg-white border border-slate-100 shadow-sm px-5 py-3.5">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot w-2 h-2 rounded-full bg-healing-500" />
          <span className="typing-dot w-2 h-2 rounded-full bg-healing-500" />
          <span className="typing-dot w-2 h-2 rounded-full bg-healing-500" />
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
      className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12"
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-healing-400 via-healing-500 to-healing-700 flex items-center justify-center shadow-2xl shadow-healing-500/30 animate-[float_3s_ease-in-out_infinite]">
          <Bot size={36} className="text-white" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 border-3 border-white flex items-center justify-center">
          <span className="text-white text-xs font-bold">✓</span>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
        Welcome to <span className="text-healing-600">Prognos AI</span>
      </h2>
      <p className="text-slate-500 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
        Describe your symptoms or upload an image for an instant AI-powered medical triage assessment.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg">
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
            className="group bg-white rounded-2xl border border-slate-100 p-4 text-left
              hover:border-healing-200 hover:shadow-lg hover:shadow-healing-500/5
              transition-all duration-300 cursor-default"
          >
            <span className="text-2xl mb-2 block">{item.icon}</span>
            <p className="font-semibold text-slate-800 text-sm mb-1">{item.label}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
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
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
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
            {/* Avatar */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md
                ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-healing-500 to-healing-700'
                    : 'bg-gradient-to-br from-healing-400 to-healing-600'
                }`}
            >
              {msg.role === 'user' ? (
                <User size={16} className="text-white" />
              ) : (
                <Bot size={16} className="text-white" />
              )}
            </div>

            {/* Wrap Bubble and Fulfillment in a flex-col container so they stack vertically */}
            <div className={`flex flex-col gap-2 max-w-[90%] sm:max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              {/* Bubble */}
              <div
                className={`w-fit relative group ${
                  msg.role === 'user'
                    ? 'bubble-user bg-gradient-to-br from-healing-600 to-healing-700 text-white shadow-lg shadow-healing-500/20'
                    : 'bubble-ai bg-white border border-slate-100 text-slate-700 shadow-sm'
                } px-4 py-3`}
              >
                {/* Image Analysis Tooltip Container */}
                {msg.role === 'assistant' && msg.imageAnalysis && (
                  <div className="absolute top-2 right-2 text-slate-400 hover:text-healing-600 cursor-pointer group/info">
                    <Info size={14} />
                    <div className="absolute top-5 right-0 w-64 p-3 bg-slate-900 border border-slate-700 shadow-xl rounded-xl text-xs text-white opacity-0 invisible group-hover/info:visible group-hover/info:opacity-100 transition-all z-20 whitespace-pre-wrap">
                      <div className="font-bold text-slate-300 mb-1">Image Analysis</div>
                      {msg.imageAnalysis}
                    </div>
                  </div>
                )}
                {/* Images */}
                {msg.images && msg.images.length > 0 && (
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {msg.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Attached ${i + 1}`}
                        className="w-32 h-32 object-cover rounded-xl border-2 border-white/30"
                      />
                    ))}
                  </div>
                )}

                {/* Risk Badge */}
                {msg.role === 'assistant' && msg.riskLevel && (
                  <div className="mb-2">
                    <RiskBadge level={msg.riskLevel} size="sm" />
                  </div>
                )}

                {/* Content */}
                <div
                  className={`text-sm sm:text-[15px] leading-relaxed ai-response ${
                    msg.role === 'user' ? 'text-white' : 'text-slate-700'
                  }`}
                >
                  {msg.role === 'assistant' ? renderContent(msg.content) : msg.content}
                </div>

                {/* Timestamp */}
                <div
                  className={`flex items-center gap-1 mt-2 text-[11px] ${
                    msg.role === 'user' ? 'text-healing-200' : 'text-slate-400'
                  }`}
                >
                  <Clock size={10} />
                  {formatTime(msg.timestamp)}
                </div>
              </div>
              
              {/* Fulfillment UI (Rendered below the bubble) */}
              {msg.role === 'assistant' && msg.cartItems && msg.cartItems.length > 0 && (
                 <div className="w-full mt-1">
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
