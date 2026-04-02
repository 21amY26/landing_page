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
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
  },
  URGENT: {
    label: 'Urgent',
    icon: AlertTriangle,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
  EMERGENCY: {
    label: 'Emergency',
    icon: AlertOctagon,
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    dot: 'bg-red-500',
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
        ${level === 'EMERGENCY' ? 'animate-[pulse-glow_2s_ease-in-out_infinite]' : ''}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} ${level === 'EMERGENCY' ? 'animate-pulse' : ''}`} />
      <Icon size={iconSizes[size]} />
      {c.label}
    </span>
  );
}
