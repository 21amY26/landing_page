'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import InputSystem from '@/components/InputSystem';
import EmergencyAlert from '@/components/EmergencyAlert';
import { ChatMessage, RiskLevel } from '@/lib/types';
import { parseRiskLevel } from '@/lib/parse-risk';

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifiedMode, setIsVerifiedMode] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  const handleSendMessage = async (
    text: string,
    images: { data: string; mimeType: string; preview: string }[]
  ) => {
    // 1. Add user message to UI
    const newUserMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      images: images.map((i) => i.preview), // Add base64 data URIs for display
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      // 2. Call API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          images: images.map((img) => ({
            data: img.data, // pure base64
            mimeType: img.mimeType,
          })),
          isVerifiedMode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      // 3. Parse risk and append AI message
      let aiResponseText = data.response;
      const riskLevel = parseRiskLevel(aiResponseText);

      // Trigger emergency banner
      if (riskLevel === 'EMERGENCY') {
        setShowEmergency(true);
      }

      // Extract <image_analysis> data
      let imageAnalysis = undefined;
      const analysisRegex = /<image_analysis>([\s\S]*?)<\/image_analysis>/;
      const analysisMatch = analysisRegex.exec(aiResponseText);
      if (analysisMatch && analysisMatch[1]) {
        imageAnalysis = analysisMatch[1].trim();
        aiResponseText = aiResponseText.replace(analysisRegex, '').trim();
      }

      // Extract _CART_DATA_
      let cartItems = undefined;
      const cartRegex = /_CART_DATA_([\s\S]*?)_CART_DATA_/;
      const match = cartRegex.exec(aiResponseText);
      if (match && match[1]) {
        try {
          cartItems = JSON.parse(match[1].trim());
          aiResponseText = aiResponseText.replace(cartRegex, '').trim();
        } catch (e) {
          console.error("Failed to parse cart data", e);
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
    <div className="flex flex-col h-full w-full bg-slate-50 relative">
      <EmergencyAlert
        visible={showEmergency}
        onDismiss={() => setShowEmergency(false)}
      />

      <Header
        isVerifiedMode={isVerifiedMode}
        onToggleMode={() => setIsVerifiedMode(!isVerifiedMode)}
      />

      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto bg-white shadow-xl shadow-slate-200/50 sm:border-x border-slate-200/60 overflow-hidden relative">
        <ChatInterface messages={messages} isLoading={isLoading} />
        
        <InputSystem
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}
