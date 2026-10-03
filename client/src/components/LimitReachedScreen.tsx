import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { BATCH_DETAILS } from '../config/themes';

export const LimitReachedScreen: React.FC = () => {
  return (
    <div className="relative max-w-md mx-auto py-6 text-center flex flex-col items-center justify-center">
      {/* Stamp Header */}
      <div className="inline-block bg-amber-400 text-stone-900 font-marker text-xs tracking-wider px-3.5 py-1 rounded shadow transform -rotate-1 mb-4">
        🏆 EVENT SLOTS FULLY MINTED
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-20 h-20 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl mb-4 shadow-lg transform rotate-2"
      >
        🎓
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-marker text-xl sm:text-2xl text-stone-900 tracking-wide leading-tight mb-2"
      >
        THE MISCHIEF MACHINE IS <br />
        <span className="text-amber-700">TAKING A LITTLE BREAK! 😭</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-hand font-bold text-base text-stone-800 max-w-sm mb-5 leading-tight px-2"
      >
        All 100 official farewell transformations for the MCA 2nd Batch have been successfully minted! Thank you for the memories and laughter.
      </motion.p>

      {/* Batch Commemorative Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-amber-100/90 w-full rounded p-4 border border-amber-300 text-center font-monoRetro shadow-sm"
      >
        <div className="flex items-center justify-center gap-1 text-xs text-amber-800 font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{BATCH_DETAILS.batch}</span>
        </div>
        <div className="text-xs font-black text-stone-900">
          {BATCH_DETAILS.department}
        </div>
        <div className="text-[10px] text-stone-600 font-bold">
          {BATCH_DETAILS.university}
        </div>
      </motion.div>

      <div className="mt-6 flex items-center justify-center gap-1.5 text-xs font-hand font-bold text-stone-700">
        <span>Always cheering for our 71 Seniors</span>
        <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
      </div>
    </div>
  );
};
