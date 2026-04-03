'use client';

import { useState } from 'react';

import ChatInterface from '@/components/ChatInterface';
import EmergencyAlert from '@/components/EmergencyAlert';
import Header from '@/components/Header';
import InputSystem from '@/components/InputSystem';
import { parseRiskLevel } from '@/lib/parse-risk';
import { ChatMessage } from '@/lib/types';

export default function ProductApp() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifiedMode, setIsVerifiedMode] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  const handleSendMessage = async (
    text: string,
    images: { data: string; mimeType: string; preview: string }[]
  ) => {
    const newUserMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      images: images.map((image) => image.preview),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          images: images.map((image) => ({
            data: image.data,
            mimeType: image.mimeType,
          })),
          isVerifiedMode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      let aiResponseText = data.response;
      const riskLevel = parseRiskLevel(aiResponseText);

      if (riskLevel === 'EMERGENCY') {
        setShowEmergency(true);
      }

      let imageAnalysis;
      const analysisRegex = /<image_analysis>([\s\S]*?)<\/image_analysis>/;
      const analysisMatch = analysisRegex.exec(aiResponseText);
      if (analysisMatch && analysisMatch[1]) {
        imageAnalysis = analysisMatch[1].trim();
        aiResponseText = aiResponseText.replace(analysisRegex, '').trim();
      }

      let cartItems;
      const cartRegex = /_CART_DATA_([\s\S]*?)_CART_DATA_/;
      const match = cartRegex.exec(aiResponseText);
      if (match && match[1]) {
        try {
          cartItems = JSON.parse(match[1].trim());
          aiResponseText = aiResponseText.replace(cartRegex, '').trim();
        } catch (error) {
          console.error('Failed to parse cart data', error);
        }
      }

      const newAiMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: aiResponseText,
        riskLevel,
        cartItems,
        imageAnalysis,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newAiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to connect to Prognos AI. Please try again.'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,rgba(120,222,171,0.08),transparent_24%),linear-gradient(180deg,#0a250a_0%,#082108_32%,#071a07_100%)]">
      <EmergencyAlert
        visible={showEmergency}
        onDismiss={() => setShowEmergency(false)}
      />

      <Header
        isVerifiedMode={isVerifiedMode}
        onToggleMode={() => setIsVerifiedMode(!isVerifiedMode)}
      />

      <main className="flex flex-1 min-h-0 px-4 pb-4 pt-2 sm:px-6 sm:pb-6">
        <div className="relative mx-auto flex h-[calc(100vh-6rem)] w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl">
          <ChatInterface messages={messages} isLoading={isLoading} />
          <InputSystem
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}
