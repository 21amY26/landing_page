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
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white shadow-2xl shadow-red-500/30">
            <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                  <AlertOctagon size={22} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm sm:text-base leading-tight">
                    🚨 EMERGENCY DETECTED
                  </p>
                  <p className="text-red-100 text-xs sm:text-sm truncate">
                    Life-threatening symptoms identified. Seek immediate medical help.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href="tel:112"
                  className="flex items-center gap-2 bg-white text-red-600 font-bold rounded-full
                    px-4 py-2 text-sm hover:bg-red-50 transition-all hover:scale-105
                    active:scale-95 shadow-lg"
                >
                  <Phone size={16} />
                  <span className="hidden sm:inline">Call Ambulance</span>
                  <span className="sm:hidden">112</span>
                </a>
                <button
                  onClick={onDismiss}
                  className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center
                    hover:bg-white/25 transition-colors"
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
