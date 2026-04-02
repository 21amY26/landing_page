import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are Prognos AI, a medical triage specialist. Analyze symptoms and images.
Rules:
1. Categorize EVERY response at the very beginning exactly as [ROUTINE], [URGENT], or [EMERGENCY]. If life-threatening, output [EMERGENCY].
2. For images, physically describe them FIRST inside XML tags exactly like this: <image_analysis>The image displays...</image_analysis>. 
3. KEEP YOUR REPLY VERY SHORT AND DIRECT. Use bullet points for actionable advice ONLY. Maximum 4-5 sentences total. No long paragraphs.
4. End with: "⚕️ *Prognos AI is an assessment tool, not a diagnostic replacement for a licensed doctor.*"
5. IMPORTANT - FULFILLMENT ENGINE: If you recommend ANY physical over-the-counter items, you MUST append a hidden JSON block at the absolute end. Format exactly like this:
_CART_DATA_[{"item": "ProductName", "type": "medicine/first-aid", "urgency": "high/medium/low", "requiresPrescription": false}]_CART_DATA_
If you recommend prescription drugs (Schedule H), set requiresPrescription: true. Only output the JSON if there is at least one physical product to buy.`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured. Please add it to your .env.local file.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const body = await request.json();
    const { message, images, isVerifiedMode } = body as {
      message: string;
      images?: { data: string; mimeType: string }[];
      isVerifiedMode: boolean;
    };

    if (!message && (!images || images.length === 0)) {
      return NextResponse.json(
        { error: 'Please provide a message or an image.' },
        { status: 400 }
      );
    }

    // Build parts array
    const parts: Array<{ text: string } | { inlineData: { data: string; mimeType: string } }> = [];

    // Add text
    if (message) {
      parts.push({ text: message });
    }

    // Add images
    if (images && images.length > 0) {
      for (const img of images) {
        parts.push({
          inlineData: {
            data: img.data,
            mimeType: img.mimeType,
          },
        });
      }
      if (!message) {
        parts.push({ text: 'Please analyze this medical image and provide a triage assessment.' });
      }
    }

    // Add verified mode context if enabled
    const systemInstruction = isVerifiedMode
      ? SYSTEM_PROMPT + '\n\nNote: VERIFIED MODE. Be extra thorough.'
      : SYSTEM_PROMPT;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts,
        },
      ],
      config: {
        systemInstruction,
        temperature: 0.3,
        maxOutputTokens: 2048,
      },
    });

    const text = response.text || 'I was unable to generate a response. Please try again.';

    return NextResponse.json({ response: text });
  } catch (error: unknown) {
    console.error('Gemini API Error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json(
      { error: `Failed to get AI response: ${errorMessage}` },
      { status: 500 }
    );
  }
}
