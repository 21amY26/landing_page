'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Phone, ShieldCheck, Zap } from 'lucide-react';

interface HeaderProps {
  isVerifiedMode: boolean;
  onToggleMode: () => void;
}

export default function Header({ isVerifiedMode, onToggleMode }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between rounded-full border border-white/10 bg-[rgba(7,26,7,0.72)] px-4 shadow-[0_16px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:px-5">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-[var(--muted-foreground)] transition-colors hover:border-[rgba(120,222,171,0.2)] hover:text-white sm:inline-flex"
          >
            <ChevronLeft size={14} />
            Home
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-[rgba(120,222,171,0.2)] bg-[rgba(120,222,171,0.08)] shadow-[0_12px_30px_rgba(120,222,171,0.08)]">
              <Image
                src="/prognos-logo.svg"
                alt="Prognos.ai logo"
                width={40}
                height={40}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-none tracking-tight text-white">
                Prognos<span className="text-[var(--accent)]">.AI</span>
              </h1>
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
                Health Check
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleMode}
            className={`group relative flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition-all duration-300
              ${
                isVerifiedMode
                  ? 'border-[rgba(120,222,171,0.28)] bg-[rgba(120,222,171,0.12)] text-white hover:bg-[rgba(120,222,171,0.16)]'
                  : 'border-white/10 bg-white/[0.04] text-[var(--muted-foreground)] hover:text-white'
              }`}
            title={isVerifiedMode ? 'Verified Mode: Extra thorough analysis' : 'Fast Mode: Quick triage'}
          >
            {isVerifiedMode ? (
              <ShieldCheck size={14} className="text-[var(--accent)]" />
            ) : (
              <Zap size={14} className="text-amber-400" />
            )}
            <span className="hidden sm:inline">
              {isVerifiedMode ? 'Verified' : 'Fast'}
            </span>
            <div
              className={`relative h-4 w-7 rounded-full transition-colors duration-300 ${
                isVerifiedMode ? 'bg-[rgba(120,222,171,0.75)]' : 'bg-white/18'
              }`}
            >
              <div
                className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform duration-300 ${
                  isVerifiedMode ? 'translate-x-3.5' : 'translate-x-0.5'
                }`}
              />
            </div>
          </button>

          <a
            href="tel:112"
            className="flex items-center gap-1.5 rounded-full border border-red-400/20 bg-red-500/90 px-3 py-2 text-xs font-bold text-white shadow-[0_12px_30px_rgba(239,68,68,0.18)] transition-all hover:bg-red-500 active:scale-95"
          >
            <Phone size={13} />
            <span className="hidden sm:inline">SOS</span>
          </a>
        </div>
      </div>
    </header>
  );
}
