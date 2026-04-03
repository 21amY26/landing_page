'use client';

import type { ComponentType } from 'react';

import Image from 'next/image';
import { Activity, BadgeCheck, Camera, MessageSquareText, Mic, PhoneCall, Pill, ShieldCheck, Watch, Waves } from 'lucide-react';
import { motion } from 'framer-motion';

import { CanvasText } from '@/components/aceternity/CanvasText';
import { DottedGlowBackground } from '@/components/aceternity/DottedGlowBackground';
import { DataInsightScroll } from '@/components/landing/DataInsightScroll';
import { ModeShowcase } from '@/components/landing/ModeShowcase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const featureGroups = [
  {
    icon: Activity,
    title: 'Context-Aware Intelligence',
    description: 'Understands health data in context instead of treating symptoms in isolation.',
    items: ['Smartwatch data integration', 'Personalized health insights'],
  },
  {
    icon: BadgeCheck,
    title: 'AI Response Engine',
    description: 'Moves from instant support to higher-confidence guidance with a clear mode switch.',
    items: ['Fast Mode (instant AI)', 'Verified Mode (doctor-backed)', 'Toggle UI for switching modes'],
  },
  {
    icon: Waves,
    title: 'Multimodal Interaction',
    description: 'Lets people communicate in the way that feels easiest in the moment.',
    items: ['Text input', 'Image input', 'Voice input'],
  },
  {
    icon: ShieldCheck,
    title: 'Real-World Action Layer',
    description: 'Turns AI guidance into the next useful step instead of stopping at explanation.',
    items: ['Medicine suggestions', 'Telegram bot', 'Doctor call integration'],
  },
] as const;

export function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <DottedGlowBackground />

      <section className="relative px-6 pb-24 pt-8 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <header className="flex items-center justify-between rounded-full border border-white/8 bg-white/[0.03] px-4 py-3 backdrop-blur-xl sm:px-6">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-[rgba(120,222,171,0.18)] bg-[rgba(120,222,171,0.08)]">
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
                <p className="text-sm font-medium text-white">Prognos.ai</p>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
                  AI health assistant
                </p>
              </div>
            </div>
            <div className="hidden rounded-full border border-[rgba(120,222,171,0.14)] bg-[rgba(120,222,171,0.06)] px-3 py-1 text-xs font-medium text-[var(--accent)] sm:block">
              Privacy-first interface
            </div>
          </header>

          <div className="relative pt-16 sm:pt-24">
            <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(120,222,171,0.18)] bg-[rgba(120,222,171,0.07)] px-4 py-2 text-xs font-medium uppercase tracking-[0.26em] text-[var(--accent)]">
                  Built for trusted AI health guidance
                </div>
                <h1 className="mt-8 text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                  Prognos.ai
                </h1>
                <p className="mt-8 max-w-2xl text-2xl leading-tight tracking-[-0.03em] text-white/94 sm:text-3xl">
                  AI health assistant for <CanvasText>Instant</CanvasText> answers and <CanvasText>Verified</CanvasText> guidance
                </p>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                  Prognos.ai provides instant symptom insights, verified medical guidance, and real-world actions in one unified interface.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a href="/check">
                    <Button size="lg">Start your health check</Button>
                  </a>
                  <a href="#features">
                    <Button size="lg" variant="secondary">
                      Explore the platform
                    </Button>
                  </a>
                </div>
                <div className="mt-10 grid gap-4 text-sm text-[var(--muted-foreground)] sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="text-white">Instant symptom insight</div>
                    <div className="mt-2 leading-6">Fast first answers without losing clarity.</div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="text-white">Verified response mode</div>
                    <div className="mt-2 leading-6">Grounded in verified medical knowledge.</div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="text-white">Action-ready output</div>
                    <div className="mt-2 leading-6">Moves from guidance to practical next steps.</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 rounded-[40px] bg-[radial-gradient(circle_at_top,rgba(120,222,171,0.14),transparent_48%)]" />
                <div className="relative rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-5">
                  <div className="rounded-[30px] border border-white/8 bg-[#0a1a0d]/95 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
                          Unified interface
                        </p>
                        <p className="mt-3 text-2xl font-semibold text-white">One place for symptom checks, guidance, and next actions</p>
                      </div>
                      <div className="rounded-2xl border border-[rgba(120,222,171,0.18)] bg-[rgba(120,222,171,0.08)] p-3 text-[var(--accent)]">
                        <Activity className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                      <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
                              Live vitals
                            </p>
                            <p className="mt-2 text-3xl font-semibold text-white">72 bpm</p>
                          </div>
                          <Watch className="h-5 w-5 text-[var(--accent)]" />
                        </div>
                        <div className="mt-5 flex h-24 items-end gap-2">
                          {[44, 54, 40, 62, 66, 52, 72].map((height) => (
                            <div
                              key={height}
                              className="flex-1 rounded-t-full bg-[linear-gradient(180deg,rgba(120,222,171,0.92),rgba(120,222,171,0.18))]"
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
                              AI guidance
                            </p>
                            <p className="mt-2 text-lg font-semibold text-white">Shortness of breath needs closer monitoring today.</p>
                          </div>
                          <div className="rounded-full bg-[rgba(120,222,171,0.1)] px-3 py-1 text-xs text-[var(--accent)]">
                            Verified
                          </div>
                        </div>
                        <div className="mt-4 space-y-3">
                          <div className="rounded-2xl rounded-bl-md border border-white/8 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white/88">
                            Your recent heart rate trend and new symptoms suggest a mild respiratory change, with clear instructions on when to escalate care.
                          </div>
                          <div className="grid gap-3 sm:grid-cols-3">
                            <SignalCard icon={Pill} label="Medicine" value="Next-step suggestions" />
                            <SignalCard icon={PhoneCall} label="Doctor call" value="Escalation ready" />
                            <SignalCard icon={MessageSquareText} label="Telegram" value="Follow-up channel" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DataInsightScroll />

      <section id="features" className="relative px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]/72">Core capabilities</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Built to understand context, respond clearly, and guide real action.
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--muted-foreground)] sm:text-lg">
              Every part of the interface is designed to feel calm, useful, and trustworthy when people need quick health support.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {featureGroups.map((feature, index) => (
              <motion.div
                key={feature.title}
                animate={{ y: [0, index % 2 === 0 ? -8 : -5, 0] }}
                transition={{ duration: 8 + index, ease: 'easeInOut', repeat: Infinity }}
              >
                <Card className="h-full border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(120,222,171,0.25)]">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[rgba(120,222,171,0.18)] bg-[rgba(120,222,171,0.08)] text-[var(--accent)]">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      {feature.title === 'AI Response Engine' ? (
                        <div className="rounded-full border border-[rgba(120,222,171,0.18)] bg-[rgba(120,222,171,0.08)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                          Fast / Verified
                        </div>
                      ) : null}
                    </div>
                    <CardTitle className="pt-2">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-7">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-6">
                    <ul className="space-y-3 text-sm leading-6 text-white/88">
                      {feature.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {feature.title === 'Multimodal Interaction' ? (
                      <div className="mt-6 flex gap-3">
                        <MiniIcon icon={MessageSquareText} label="Text" />
                        <MiniIcon icon={Camera} label="Image" />
                        <MiniIcon icon={Mic} label="Voice" />
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="mode-toggle" className="relative px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl rounded-[40px] border border-[rgba(120,222,171,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.25)] sm:p-8 lg:p-10">
          <ModeShowcase />
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl rounded-[36px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl lg:p-10">
          <div className="grid gap-6 lg:grid-cols-3">
            <TrustBlock
              title="Not a replacement for professional medical advice"
              text="Prognos.ai supports faster understanding and better next steps, but clinical diagnosis and treatment decisions still belong with qualified professionals."
            />
            <TrustBlock
              title="Built on verified medical knowledge"
              text="Verified mode is designed to reflect medically grounded guidance and clearer escalation language when confidence matters most."
            />
            <TrustBlock
              title="Privacy-first by design"
              text="Sensitive health conversations deserve discretion, so the interface is designed around calm presentation, limited exposure, and trust."
            />
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-4 text-center sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl rounded-[36px] border border-[rgba(120,222,171,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-6 py-12 shadow-[0_20px_70px_rgba(0,0,0,0.25)] sm:px-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]/72">Ready to begin</p>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            Get health answers instantly
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--muted-foreground)] sm:text-lg">
            Start with symptoms, wearable signals, or a quick question and let Prognos.ai guide the next step.
          </p>
          <div className="mt-8">
            <a href="/check">
              <Button size="lg">Start your health check</Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function SignalCard({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
      <div className="flex items-center gap-2 text-[var(--accent)]">
        <Icon className="h-4 w-4" />
        <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
          {label}
        </span>
      </div>
      <div className="mt-3 text-sm leading-6 text-white">{value}</div>
    </div>
  );
}

function MiniIcon({
  icon: Icon,
  label,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/82">
      <Icon className="h-4 w-4 text-[var(--accent)]" />
      {label}
    </div>
  );
}

function TrustBlock({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/8 bg-[#0b190d]/90 p-6">
      <p className="text-lg font-semibold tracking-[-0.02em] text-white">{title}</p>
      <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">{text}</p>
    </div>
  );
}
