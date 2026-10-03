import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2 } from 'lucide-react';
import { PROCESSING_MESSAGES } from '../config/themes';
import { useMischiefStore } from '../store/useMischiefStore';

export const ProcessingScreen: React.FC = () => {
  const { seniorName, previewUrl } = useMischiefStore();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % PROCESSING_MESSAGES.length);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 94) return 94;
        const next = prev + Math.floor(Math.random() * 14) + 5;
        return next > 94 ? 94 : next;
      });
    }, 450);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="relative max-w-md mx-auto py-6 text-center flex flex-col items-center justify-center">
      {/* Top Header Stamp */}
      <div className="inline-block bg-amber-400 text-stone-900 font-marker text-xs tracking-wider px-3.5 py-1 rounded shadow transform -rotate-1 mb-4">
        ⚡ MISCHIEF ENGINE IN ACTION
      </div>

      {/* Polaroid Frame Container */}
      <div className="relative mb-6">
        <div className="relative bg-amber-50 p-3 pb-6 rounded shadow-2xl transform -rotate-1 max-w-[240px] w-full border border-stone-300 text-stone-900">
          <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-4 transform -rotate-2 z-20" />

          <div className="w-full aspect-square bg-stone-900 rounded-sm overflow-hidden border border-stone-400/50 relative">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Processing Senior"
                className="w-full h-full object-cover filter saturate-[1.1] brightness-90"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl">🎓</div>
            )}

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b] animate-scanline" />
            </div>

            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-400" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-400" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-400" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-400" />
          </div>

          <div className="pt-2 text-center">
            <p className="font-hand text-base text-stone-800 font-bold leading-tight truncate px-1">
              {seniorName ? `Weaving Magic for ${seniorName}... ✨` : 'Weaving Senior Magic... ✨'}
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center shadow-lg text-lg border-2 border-white pointer-events-none"
        >
          🪄
        </motion.div>
      </div>

      <h2 className="font-marker text-2xl sm:text-3xl text-stone-900 tracking-wide mb-2 flex items-center justify-center gap-2">
        <span>PROCESSING MISCHIEF</span>
        <span className="text-2xl animate-bounce">😎</span>
      </h2>

      <div className="h-12 flex items-center justify-center mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold font-hand text-stone-900 bg-amber-200/90 px-4 py-1.5 rounded-full border border-amber-400 shadow-sm"
          >
            <Wand2 className="w-4 h-4 text-rose-700 shrink-0" />
            <span>&ldquo;{PROCESSING_MESSAGES[messageIndex]}&rdquo;</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-xs mb-3">
        <div className="flex justify-between text-xs font-monoRetro font-bold text-stone-700 mb-1">
          <span>MISCHIEF LEVEL</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-stone-300 overflow-hidden p-0.5 border border-stone-400">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          />
        </div>
      </div>

      <p className="text-[10px] font-monoRetro text-stone-500 uppercase tracking-widest mt-1">
        Hold tight — your juniors are finalizing the memory!
      </p>
    </div>
  );
};
