import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Prognos AI – Medical Triage',
  description: 'AI-powered multimodal healthcare triage system. Instant medical assessment using text and images.',
  themeColor: '#f8fafc',
  appleWebApp: {
    capable: true,
    title: 'Prognos AI',
    statusBarStyle: 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen w-full flex flex-col overflow-hidden bg-slate-50 antialiased selection:bg-healing-200`}>
        {children}
      </body>
    </html>
  );
}
