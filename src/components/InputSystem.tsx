'use client';

import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
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
      className="p-3 bg-white border-t border-slate-100"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isHovering && (
        <div className="absolute inset-0 z-50 drop-overlay rounded-t-2xl flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl px-6 py-4 flex items-center gap-3">
            <ImageIcon className="text-healing-500" />
            <span className="font-semibold text-slate-700">Drop image to attach</span>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto relative rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-healing-500/20 focus-within:border-healing-400 transition-all">
        
        {/* Attached Images Strips */}
        {images.length > 0 && (
          <div className="px-3 pt-3 pb-1 flex gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <div key={i} className="relative w-16 h-16 flex-shrink-0 group rounded-lg overflow-hidden border border-slate-200">
                <img src={img.preview} alt={`Upload ${i}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2 p-2 relative">
          {/* Attach Button Menu */}
          <div className="flex gap-1 pb-1">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-slate-400 hover:text-healing-600 hover:bg-healing-50 rounded-xl transition-colors"
              title="Attach Image"
            >
              <Paperclip size={20} />
            </button>
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="p-2 text-slate-400 hover:text-healing-600 hover:bg-healing-50 rounded-xl transition-colors sm:hidden"
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
            className="flex-1 max-h-[120px] bg-transparent border-0 resize-none py-2.5 px-2 text-slate-700 placeholder:text-slate-400 focus:ring-0 leading-relaxed min-h-[44px]"
            disabled={isLoading}
          />

          <div className="flex gap-1 pb-1">
            <button
              className="p-2 text-slate-400 hover:text-slate-600 active:bg-slate-200 rounded-xl transition-colors relative group"
              title="Voice Input (Coming Soon)"
            >
              <Mic size={20} />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
                Coming Soon
              </span>
            </button>

            <button
              onClick={handleSend}
              disabled={(!text.trim() && images.length === 0) || isLoading}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${
                (!text.trim() && images.length === 0) || isLoading
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-healing-600 text-white hover:bg-healing-700 hover:scale-105 active:scale-95 shadow-md shadow-healing-500/20'
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
