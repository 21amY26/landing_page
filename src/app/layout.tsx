import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prognos.ai',
  description:
    'AI-powered health assistant for instant symptom insights, verified medical guidance, and real-world next steps.',
  appleWebApp: {
    capable: true,
    title: 'Prognos.ai',
    statusBarStyle: 'black-translucent',
  },
};

export const viewport: Viewport = {
  themeColor: '#082108',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] antialiased selection:bg-[rgba(120,222,171,0.35)] selection:text-white">
        {children}
      </body>
    </html>
  );
}
