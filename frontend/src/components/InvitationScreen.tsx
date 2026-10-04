import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { Download, RotateCcw, Home, Sparkles, Trophy } from 'lucide-react';
import { useMischiefStore } from '../store/useMischiefStore';
import { InvitationCard } from './InvitationCard';

export const InvitationScreen: React.FC = () => {
  const { seniorName, setStep, resetMischief } = useMischiefStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadInvitation = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      await new Promise((r) => setTimeout(r, 150));
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.98,
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement('a');
      const safeName = (seniorName || 'Senior').replace(/[^a-zA-Z0-9_-]/g, '_');
      link.download = `Farewell_26_Invitation_${safeName}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.warn('Invitation capture fallback:', err);
      alert('📷 Invitation saved! Take a screenshot to keep it safe.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative text-center max-w-xl mx-auto">
      {/* Top Header Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-2"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-stone-900 font-marker text-xs sm:text-sm font-bold tracking-wider uppercase mb-1 shadow-md transform -rotate-1">
          <Sparkles className="w-4 h-4 text-stone-900" />
          <span>OFFICIAL EVENT INVITATION</span>
          <span className="text-base">✉️</span>
        </div>
      </motion.div>

      {/* Main Invitation Card Element */}
      <div ref={cardRef}>
        <InvitationCard seniorName={seniorName} />
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <button
          type="button"
          onClick={handleDownloadInvitation}
          disabled={isDownloading}
          className="torn-cta-button w-full sm:flex-1 py-3.5 px-5 text-white font-marker text-base tracking-wider flex items-center justify-center gap-2 shadow-xl hover:brightness-110 active:scale-[0.98] transition-all border-2 border-white/90 cursor-pointer"
        >
          <Download className="w-4 h-4 text-amber-100" />
          <span>{isDownloading ? 'SAVING INVITATION...' : 'DOWNLOAD INVITATION'}</span>
        </button>

        <button
          type="button"
          onClick={() => setStep('quiz')}
          className="w-full sm:w-auto py-3.5 px-5 rounded bg-[#172554] hover:bg-[#1e3a8a] text-white font-monoRetro font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer border border-blue-900 shadow-md active:scale-[0.98]"
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Awards Quiz</span>
        </button>
      </motion.div>

      {/* Secondary Actions */}
      <div className="mt-5 flex items-center justify-center gap-4 text-xs font-monoRetro">
        <button
          type="button"
          onClick={resetMischief}
          className="inline-flex items-center gap-1 text-stone-700 hover:text-stone-900 font-bold transition cursor-pointer underline"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Transform Another Photo</span>
        </button>

        <span className="text-stone-400">•</span>

        <button
          type="button"
          onClick={() => setStep('landing')}
          className="inline-flex items-center gap-1 text-stone-700 hover:text-stone-900 font-bold transition cursor-pointer underline"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
      </div>
    </div>
  );
};
