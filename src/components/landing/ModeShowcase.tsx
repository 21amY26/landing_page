'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const modes = {
  fast: {
    label: 'Fast Mode',
    summary: 'Immediate symptom interpretation for quick triage and momentum.',
    bullets: [
      'Answers within seconds for common concerns',
      'Designed for fast first-pass health checks',
      'Ideal when you need direction before taking action',
    ],
    badge: 'Instant AI response',
  },
  verified: {
    label: 'Verified Mode',
    summary: 'Doctor-backed responses grounded in verified medical knowledge.',
    bullets: [
      'More structured reasoning and safer escalation language',
      'Built for moments that need extra confidence',
      'Clearer guidance on when to seek professional care',
    ],
    badge: 'Verified medical guidance',
  },
} as const;

export function ModeShowcase() {
  const [value, setValue] = React.useState<'fast' | 'verified'>('fast');
  const activeMode = modes[value];

  return (
    <Tabs
      className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center"
      defaultValue="fast"
      onValueChange={(nextValue) => setValue(nextValue as 'fast' | 'verified')}
      value={value}
    >
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]/72">
          Choose the response style
        </p>
        <h2 className="mt-5 max-w-lg text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
          Switch between speed and clinical confidence without changing the experience.
        </h2>
        <p className="mt-5 max-w-lg text-base leading-7 text-[var(--muted-foreground)] sm:text-lg">
          Both modes keep the same interface, but the depth, verification posture, and response framing adapt to the situation.
        </p>
        <TabsList className="mt-8 max-w-md">
          <TabsTrigger value="fast">Fast</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
        </TabsList>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_top,rgba(120,222,171,0.14),transparent_45%)]" />
        <TabsContent value="fast">
          <ModeCard
            accentLabel={activeMode.badge}
            bullets={activeMode.bullets}
            summary={activeMode.summary}
            title={activeMode.label}
          />
        </TabsContent>
        <TabsContent value="verified">
          <ModeCard
            accentLabel={activeMode.badge}
            bullets={activeMode.bullets}
            summary={activeMode.summary}
            title={activeMode.label}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
}

function ModeCard({
  title,
  summary,
  bullets,
  accentLabel,
}: {
  title: string;
  summary: string;
  bullets: readonly string[];
  accentLabel: string;
}) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[36px] border border-[rgba(120,222,171,0.15)] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.28)] sm:p-6"
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <Card className="rounded-[28px] border-white/8 bg-[#0c1e10]/95 p-6">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
                Response mode
              </p>
              <CardTitle className="mt-3 text-2xl">{title}</CardTitle>
            </div>
            <div className="rounded-full border border-[rgba(120,222,171,0.2)] bg-[rgba(120,222,171,0.08)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
              {accentLabel}
            </div>
          </div>
          <CardDescription className="max-w-2xl text-base leading-7">{summary}</CardDescription>
        </CardHeader>
        <CardContent className="mt-6 grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
            <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
              Sample response
            </div>
            <div className="mt-3 rounded-[20px] rounded-bl-md border border-white/8 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white/90">
              Based on your symptoms, this appears low risk right now. Continue monitoring fever and hydration, and seek urgent care if breathing worsens or chest pain begins.
            </div>
          </div>
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
            <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
              What changes
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/88">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
