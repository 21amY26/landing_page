'use client';

import React from 'react';
import { Phone, AlertOctagon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmergencyAlertProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function EmergencyAlert({ visible, onDismiss }: EmergencyAlertProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="border-b border-red-400/15 bg-[linear-gradient(90deg,rgba(153,27,27,0.95),rgba(220,38,38,0.9),rgba(153,27,27,0.95))] text-white shadow-2xl shadow-red-950/30">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/15 animate-pulse">
                  <AlertOctagon size={22} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-tight sm:text-base">
                    EMERGENCY DETECTED
                  </p>
                  <p className="truncate text-xs text-red-100 sm:text-sm">
                    Life-threatening symptoms identified. Seek immediate medical help.
                  </p>
                </div>
              </div>

              <div className="flex flex-shrink-0 items-center gap-2">
                <a
                  href="tel:112"
                  className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-red-600 shadow-lg transition-all hover:bg-red-50 hover:scale-105 active:scale-95"
                >
                  <Phone size={16} />
                  <span className="hidden sm:inline">Call Ambulance</span>
                  <span className="sm:hidden">112</span>
                </a>
                <button
                  onClick={onDismiss}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
                  aria-label="Dismiss emergency alert"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
