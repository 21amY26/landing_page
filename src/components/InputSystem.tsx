'use client';
/* eslint-disable @next/next/no-img-element */

import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { Send, Image as ImageIcon, Mic, X, Camera, Paperclip } from 'lucide-react';
import { fileToBase64, compressImage } from '@/lib/image-utils';

interface InputSystemProps {
  onSendMessage: (text: string, images: { data: string; mimeType: string; preview: string }[]) => void;
  isLoading: boolean;
}

interface AttachedImage {
  file: File;
  preview: string;
  base64: string;
  mimeType: string;
}

export default function InputSystem({ onSendMessage, isLoading }: InputSystemProps) {
  const [text, setText] = useState('');
  const [images, setImages] = useState<AttachedImage[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    
    try {
      const compressed = await compressImage(file, 800);
      const base64Str = await fileToBase64(compressed);
      const base64Data = base64Str.split(',')[1];
      
      setImages(prev => [...prev, {
        file: compressed,
        preview: base64Str,
        base64: base64Data,
        mimeType: compressed.type || 'image/jpeg'
      }]);
    } catch (err) {
      console.error('Error processing image:', err);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    Array.from(files).forEach(processFile);
    if (e.target) e.target.value = ''; // Reset
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if ((!text.trim() && images.length === 0) || isLoading) return;

    onSendMessage(
      text,
      images.map(img => ({
        data: img.base64,
        mimeType: img.mimeType,
        preview: img.preview,
      }))
    );

    setText('');
    setImages([]);
    
    // Reset textarea height
    const textarea = document.getElementById('chat-input');
    if (textarea) textarea.style.height = 'auto';
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Drag and drop logic
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(true);
  };
  
  const handleDragLeave = () => {
    setIsHovering(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
    if (e.dataTransfer.files?.length) {
      Array.from(e.dataTransfer.files).forEach(processFile);
    }
  };

  return (
    <div 
      className="border-t border-white/8 bg-[rgba(7,26,7,0.72)] p-3 backdrop-blur-xl"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isHovering && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-t-[28px] border-2 border-dashed border-[rgba(120,222,171,0.35)] bg-[rgba(120,222,171,0.08)]">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0a1c0d] px-6 py-4 shadow-xl">
            <ImageIcon className="text-[var(--accent)]" />
            <span className="font-semibold text-white">Drop image to attach</span>
          </div>
        </div>
      )}

      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] shadow-[0_18px_40px_rgba(0,0,0,0.14)] transition-all focus-within:border-[rgba(120,222,171,0.25)] focus-within:ring-2 focus-within:ring-[rgba(120,222,171,0.12)]">
        
        {images.length > 0 && (
          <div className="flex gap-2 overflow-x-auto px-3 pb-1 pt-3">
            {images.map((img, i) => (
              <div key={i} className="group relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-white/10">
                <img src={img.preview} alt={`Upload ${i}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="relative flex items-end gap-2 p-2">
          <div className="flex gap-1 pb-1">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="rounded-xl p-2 text-white/45 transition-colors hover:bg-white/[0.06] hover:text-[var(--accent)]"
              title="Attach Image"
            >
              <Paperclip size={20} />
            </button>
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="rounded-xl p-2 text-white/45 transition-colors hover:bg-white/[0.06] hover:text-[var(--accent)] sm:hidden"
              title="Take Photo"
            >
              <Camera size={20} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              multiple
              className="hidden"
            />
            <input
              type="file"
              ref={cameraInputRef}
              onChange={handleFileChange}
              accept="image/*"
              capture="environment"
              className="hidden"
            />
          </div>

          <textarea
            id="chat-input"
            rows={1}
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Describe symptoms or medical queries..."
            className="min-h-[44px] max-h-[120px] flex-1 resize-none border-0 bg-transparent px-2 py-2.5 leading-relaxed text-white placeholder:text-white/38 focus:ring-0"
            disabled={isLoading}
          />

          <div className="flex gap-1 pb-1">
            <button
              className="group relative rounded-xl p-2 text-white/45 transition-colors hover:bg-white/[0.06] hover:text-white/70"
              title="Voice Input (Coming Soon)"
            >
              <Mic size={20} />
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#051406] px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                Coming Soon
              </span>
            </button>

            <button
              onClick={handleSend}
              disabled={(!text.trim() && images.length === 0) || isLoading}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${
                (!text.trim() && images.length === 0) || isLoading
                  ? 'cursor-not-allowed bg-white/[0.06] text-white/25'
                  : 'bg-[var(--accent)] text-[#052311] shadow-[0_14px_30px_rgba(120,222,171,0.18)] hover:bg-[#91e5bb] hover:scale-105 active:scale-95'
              }`}
            >
              <Send size={18} className={isLoading ? 'animate-pulse' : ''} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
