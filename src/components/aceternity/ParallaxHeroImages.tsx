'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';

import { cn } from '@/lib/utils';

type Panel = {
  eyebrow: string;
  title: string;
  detail: string;
  align?: 'left' | 'right';
};

function MockPanel({ eyebrow, title, detail }: Panel) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_60px_rgba(2,10,6,0.35)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
            {eyebrow}
          </p>
          <p className="mt-2 text-lg font-semibold text-white">{title}</p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-[rgba(120,222,171,0.2)] bg-[rgba(120,222,171,0.08)] text-[var(--accent)]">
          +
        </div>
      </div>
      <div className="space-y-3 rounded-[22px] border border-white/8 bg-[#0c2813]/90 p-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <div className="h-2 flex-1 rounded-full bg-white/8" />
          <div className="h-2 w-16 rounded-full bg-[rgba(120,222,171,0.25)]" />
        </div>
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
          <div className="rounded-2xl border border-white/6 bg-white/[0.03] p-3">
            <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
              Insight
            </div>
            <div className="mt-2 text-sm leading-6 text-white/92">{detail}</div>
          </div>
          <div className="space-y-3 rounded-2xl border border-white/6 bg-white/[0.03] p-3">
            <div className="h-16 rounded-xl bg-[linear-gradient(180deg,rgba(120,222,171,0.16),rgba(120,222,171,0.03))]" />
            <div className="h-2 rounded-full bg-white/10" />
            <div className="h-2 w-2/3 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ParallaxHeroImages({
  panels,
  className,
}: {
  panels: Panel[];
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const centerY = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const rightY = useTransform(scrollYProgress, [0, 1], [32, -24]);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div className="grid gap-6 lg:grid-cols-3">
        {panels.map((panel, index) => {
          const y = index === 0 ? leftY : index === 1 ? centerY : rightY;

          return (
            <motion.div
              key={panel.title}
              className={cn(index === 1 ? 'lg:translate-y-10' : '', panel.align === 'right' ? 'lg:mt-12' : '')}
              style={{ y }}
            >
              <MockPanel {...panel} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
