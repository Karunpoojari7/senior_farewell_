import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import { useMischiefStore } from '../store/useMischiefStore';

export const ErrorScreen: React.FC = () => {
  const { errorMessage, resetMischief, setStep } = useMischiefStore();

  return (
    <div className="relative max-w-md mx-auto py-6 text-center flex flex-col items-center justify-center">
      {/* Stamp Header */}
      <div className="inline-block bg-rose-600 text-white font-marker text-xs tracking-wider px-3.5 py-1 rounded shadow transform -rotate-1 mb-4">
        😭 SENIOR MOMENT DETECTED
      </div>

      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-20 h-20 rounded-2xl bg-amber-100 border-2 border-rose-300 flex items-center justify-center text-4xl mb-4 shadow-lg transform -rotate-2"
      >
        😭
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-marker text-xl sm:text-2xl text-stone-900 tracking-wide leading-tight mb-3"
      >
        THE MISCHIEF MACHINE <br />
        <span className="text-rose-700">HAD A SENIOR MOMENT!</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-hand font-bold text-base text-stone-800 max-w-sm mb-6 leading-tight px-2"
      >
        &ldquo;{errorMessage || 'Even our AI got overwhelmed by all that graduation confidence! Let’s give it another spin.'}&rdquo;
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full space-y-3 max-w-xs"
      >
        <button
          type="button"
          onClick={resetMischief}
          className="torn-cta-button w-full py-3.5 px-6 text-white font-marker text-base tracking-wider flex items-center justify-center gap-2 shadow-xl hover:brightness-110 active:scale-[0.98] transition-all border-2 border-white/90 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-amber-100" />
          <span>TRY AGAIN</span>
        </button>

        <button
          type="button"
          onClick={() => setStep('landing')}
          className="w-full py-2.5 px-4 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 font-monoRetro font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer border border-stone-300"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
      </motion.div>
    </div>
  );
};
