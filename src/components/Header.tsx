'use client';

import React from 'react';
import {
  Activity,
  Phone,
  Zap,
  ShieldCheck,
} from 'lucide-react';

interface HeaderProps {
  isVerifiedMode: boolean;
  onToggleMode: () => void;
}

export default function Header({ isVerifiedMode, onToggleMode }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 glass border-b border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-healing-500 to-healing-700 flex items-center justify-center shadow-lg shadow-healing-500/25">
            <Activity size={20} className="text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-none tracking-tight">
              Prognos<span className="text-healing-600">.AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
              Medical Triage
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode Toggle */}
          <button
            onClick={onToggleMode}
            className={`group relative flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold
              transition-all duration-300 border
              ${
                isVerifiedMode
                  ? 'bg-healing-50 border-healing-200 text-healing-700 hover:bg-healing-100'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            title={isVerifiedMode ? 'Verified Mode: Extra thorough analysis' : 'Fast Mode: Quick triage'}
          >
            {isVerifiedMode ? (
              <ShieldCheck size={14} className="text-healing-600" />
            ) : (
              <Zap size={14} className="text-amber-500" />
            )}
            <span className="hidden sm:inline">
              {isVerifiedMode ? 'Verified' : 'Fast'}
            </span>
            {/* Toggle pill */}
            <div
              className={`relative w-7 h-4 rounded-full transition-colors duration-300
                ${isVerifiedMode ? 'bg-healing-500' : 'bg-slate-300'}`}
            >
              <div
                className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform duration-300
                  ${isVerifiedMode ? 'translate-x-3.5' : 'translate-x-0.5'}`}
              />
            </div>
          </button>

          {/* Emergency SOS */}
          <a
            href="tel:112"
            className="flex items-center gap-1.5 rounded-full bg-red-500 hover:bg-red-600
              text-white px-3 py-1.5 text-xs font-bold transition-all
              shadow-lg shadow-red-500/25 hover:shadow-red-500/40
              hover:scale-105 active:scale-95 animate-[pulse-glow_2s_ease-in-out_infinite]"
          >
            <Phone size={13} />
            <span className="hidden sm:inline">SOS</span>
          </a>
        </div>
      </div>
    </header>
  );
}
