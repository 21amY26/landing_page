'use client';

import React from 'react';
import { RiskLevel } from '@/lib/types';
import {
  Shield,
  AlertTriangle,
  AlertOctagon,
} from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
}

const config = {
  ROUTINE: {
    label: 'Routine',
    icon: Shield,
    bg: 'bg-emerald-500/12',
    border: 'border-emerald-400/20',
    text: 'text-emerald-200',
    dot: 'bg-emerald-300',
  },
  URGENT: {
    label: 'Urgent',
    icon: AlertTriangle,
    bg: 'bg-amber-500/12',
    border: 'border-amber-400/20',
    text: 'text-amber-200',
    dot: 'bg-amber-300',
  },
  EMERGENCY: {
    label: 'Emergency',
    icon: AlertOctagon,
    bg: 'bg-red-500/12',
    border: 'border-red-400/20',
    text: 'text-red-200',
    dot: 'bg-red-300',
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
  lg: 'px-4 py-1.5 text-base gap-2',
};

const iconSizes = { sm: 12, md: 14, lg: 16 };

export default function RiskBadge({ level, size = 'md' }: RiskBadgeProps) {
  if (!level) return null;

  const c = config[level];
  const Icon = c.icon;

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border
        ${c.bg} ${c.border} ${c.text} ${sizeClasses[size]}
        ${level === 'EMERGENCY' ? 'shadow-[0_0_0_1px_rgba(248,113,113,0.08)]' : ''}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} ${level === 'EMERGENCY' ? 'animate-pulse' : ''}`} />
      <Icon size={iconSizes[size]} />
      {c.label}
    </span>
  );
}
