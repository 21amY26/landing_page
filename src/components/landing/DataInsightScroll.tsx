'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';

function StatPill({
  label,
  value,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  tone?: 'neutral' | 'accent';
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
      <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
        {label}
      </div>
      <div className={tone === 'accent' ? 'mt-2 text-xl font-semibold text-[var(--accent)]' : 'mt-2 text-xl font-semibold text-white'}>
        {value}
      </div>
    </div>
  );
}

export function DataInsightScroll() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const watchScale = useTransform(scrollYProgress, [0, 0.45, 0.75], [1, 0.93, 0.82]);
  const watchOpacity = useTransform(scrollYProgress, [0, 0.42, 0.72], [1, 0.85, 0]);
  const watchX = useTransform(scrollYProgress, [0.4, 0.8], [0, -120]);
  const chatScale = useTransform(scrollYProgress, [0.15, 0.72, 1], [0.88, 1, 1]);
  const chatOpacity = useTransform(scrollYProgress, [0.18, 0.6], [0, 1]);
  const chatX = useTransform(scrollYProgress, [0.18, 0.75], [90, 0]);
  const lineProgress = useTransform(scrollYProgress, [0, 1], ['12%', '100%']);

  return (
    <section ref={ref} className="relative h-[180vh]">
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]/72">
              Data to Insight
            </p>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Health signals become clear guidance in a single, calm workflow.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted-foreground)] sm:text-lg">
              Prognos.ai starts with wearable trends, then turns them into symptom reasoning, verified guidance, and practical next actions.
            </p>
            <div className="mt-8 flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              <span>Wearable data</span>
              <span className="h-px w-10 bg-white/12" />
              <span>Clinical context</span>
              <span className="h-px w-10 bg-white/12" />
              <span>Actionable response</span>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[640px] items-center justify-center">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(120,222,171,0.12)] blur-3xl" />
            <motion.div
              className="absolute h-px origin-left bg-[linear-gradient(90deg,rgba(120,222,171,0.45),rgba(120,222,171,0))]"
              style={{ width: lineProgress }}
            />

            <motion.div
              className="relative z-10 w-[280px] rounded-[42px] border border-[rgba(120,222,171,0.18)] bg-[linear-gradient(180deg,#0e2a15,#08150b)] p-4 shadow-[0_25px_70px_rgba(0,0,0,0.35)]"
              style={{ scale: watchScale, opacity: watchOpacity, x: watchX }}
            >
              <div className="mx-auto mb-3 h-1.5 w-24 rounded-full bg-white/10" />
              <div className="rounded-[32px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(120,222,171,0.16),transparent_42%),#0b2110] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
                      Live Snapshot
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-white">72 bpm</p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[rgba(120,222,171,0.2)] bg-[rgba(120,222,171,0.08)] text-sm font-semibold text-[var(--accent)]">
                    HR
                  </div>
                </div>
                <div className="mt-4 h-28 rounded-[26px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-3">
                  <div className="flex h-full items-end gap-2">
                    {[34, 42, 36, 58, 61, 49, 70].map((height) => (
                      <div
                        key={height}
                        className="flex-1 rounded-t-full bg-[linear-gradient(180deg,rgba(120,222,171,0.9),rgba(120,222,171,0.2))]"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <StatPill label="Sleep" value="7h 42m" />
                  <StatPill label="SpO2" value="98%" tone="accent" />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative z-20 w-full max-w-[520px] rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-4 shadow-[0_28px_80px_rgba(1,8,4,0.35)]"
              style={{ scale: chatScale, opacity: chatOpacity, x: chatX }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
                    Prognos.ai
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">Symptom insight conversation</p>
                </div>
                <div className="rounded-full border border-[rgba(120,222,171,0.18)] bg-[rgba(120,222,171,0.08)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                  Verified mode
                </div>
              </div>
              <div className="space-y-3">
                <div className="ml-auto max-w-[78%] rounded-[24px] rounded-br-md bg-[rgba(120,222,171,0.14)] px-4 py-3 text-sm leading-6 text-white">
                  My smartwatch shows a higher resting heart rate and I feel slightly short of breath today.
                </div>
                <div className="max-w-[88%] rounded-[24px] rounded-bl-md border border-white/8 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white/90">
                  I’m combining your symptom description with recent wearable trends. This looks like a mild respiratory change right now, but the shortness of breath is the symptom to watch closely.
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <StatPill label="Likely cause" value="Viral illness" />
                  <StatPill label="Next step" value="Hydrate" />
                  <StatPill label="Escalate if" value="Worsening" tone="accent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
