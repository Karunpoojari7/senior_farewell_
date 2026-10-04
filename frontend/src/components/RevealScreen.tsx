import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import { Download, Share2, Sparkles, RotateCcw, Check, Trophy } from 'lucide-react';
import { useMischiefStore } from '../store/useMischiefStore';
import { FAREWELL_THEMES, BATCH_DETAILS } from '../config/themes';

const FALLBACK_MOCK_IMAGE = '/mock-art.svg';

export const RevealScreen: React.FC = () => {
  const { result, resetMischief, previewUrl, seniorName, setStep } = useMischiefStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Trigger grand confetti explosion upon entering reveal screen
  useEffect(() => {
    const end = Date.now() + 2 * 1000;
    const colors = ['#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f43f5e'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const themeMeta =
    FAREWELL_THEMES.find((t) => t.title === result?.title || t.id === result?.themeId) ||
    FAREWELL_THEMES[0];

  const resolvedImageSrc = imageError
    ? FALLBACK_MOCK_IMAGE
    : result?.imageUrl || previewUrl || FALLBACK_MOCK_IMAGE;

  const handleDownload = async () => {
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
      const safeTitle = (seniorName || result?.title || 'Masterpiece').replace(/[^a-zA-Z0-9_-]/g, '_');
      link.download = `Senior_Mischief_${safeTitle}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.warn('html-to-image download notice, initiating direct fallback download:', err);
      if (resolvedImageSrc) {
        const link = document.createElement('a');
        link.download = 'Senior-Mischief-Artwork.png';
        link.href = resolvedImageSrc;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const nameStr = seniorName ? `${seniorName}'s` : 'Senior';
    const shareTitle = `${nameStr} Farewell Mischief: ${result?.title || 'Farewell Masterpiece'}`;
    const shareText = `🎓 Look at ${nameStr} Senior Mischief alter-ego: "${result?.title || 'CAMPUS LEGEND'}"! 😎\n\n"${result?.caption || themeMeta.caption}"\n\nMCA Farewell 2024-2026 | GM University`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareTitle}\n\n${shareText}\n${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (clipErr) {
      console.warn('Clipboard copy failed:', clipErr);
    }
  };

  return (
    <div className="relative text-center">
      {/* Header Banner */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="mb-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-stone-900 font-marker text-xs sm:text-sm font-bold tracking-wider uppercase mb-1 shadow-md transform -rotate-1">
          <Sparkles className="w-4 h-4 text-stone-900" />
          <span>{seniorName ? `${seniorName.toUpperCase()} HAS BEEN MISCHIEFIFIED` : 'YOU HAVE BEEN MISCHIEFIFIED'}</span>
          <span className="text-base">✨</span>
        </div>
      </motion.div>

      {/* The Masterpiece Keepsake Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        ref={cardRef}
        className="relative bg-amber-50 p-4 sm:p-5 pb-6 rounded shadow-2xl transform -rotate-1 max-w-md mx-auto border-2 border-stone-300 text-stone-900 overflow-hidden text-left"
      >
        <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 transform -rotate-1 z-20" />

        <div className="flex items-center justify-between border-b border-stone-300 pb-2 mb-3">
          <div className="flex items-center gap-1.5 text-[10px] font-monoRetro font-bold text-stone-700 tracking-wider uppercase">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>OFFICIAL KEEPSAKE</span>
          </div>
          <div className="text-xl filter drop-shadow">
            {themeMeta.badgeEmoji || '😎'}
          </div>
        </div>

        <div className="relative rounded-sm overflow-hidden aspect-[4/3] bg-stone-900 border border-stone-400 shadow-inner flex items-center justify-center group">
          <img
            src={resolvedImageSrc}
            alt={result?.title || 'Farewell Cartoon'}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            onError={() => {
              console.warn('[Image] Artwork failed to load, switching to vector caricature fallback.');
              setImageError(true);
            }}
          />

          <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded bg-stone-900/90 text-amber-300 text-[10px] font-monoRetro font-bold flex items-center gap-1 border border-stone-700 shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span className="uppercase">{result?.title || 'CAMPUS LEGEND'}</span>
          </div>
        </div>

        <div className="mt-3 text-center">
          <h3 className="font-marker text-2xl sm:text-3xl text-stone-900 tracking-wide uppercase">
            {result?.title || 'CAMPUS LEGEND'}
          </h3>

          <p className="mt-1.5 text-sm sm:text-base text-stone-800 font-hand font-bold italic px-2 leading-tight">
            &ldquo;{result?.caption || themeMeta.caption}&rdquo;
          </p>
        </div>

        <div className="my-3 h-px bg-dashed border-t border-stone-300" />

        <div className="text-center font-monoRetro text-[10px] text-stone-600 font-bold uppercase tracking-wider">
          {seniorName && (
            <p className="text-rose-700 font-marker text-xs mb-0.5 tracking-wide">
              KEEPSAKE FOR {seniorName.toUpperCase()}
            </p>
          )}
          <p className="text-stone-900">{BATCH_DETAILS.batch}</p>
          <p>{BATCH_DETAILS.department} • {BATCH_DETAILS.university}</p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
      >
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="torn-cta-button w-full sm:flex-1 py-3.5 px-5 text-white font-marker text-base tracking-wider flex items-center justify-center gap-2 shadow-xl hover:brightness-110 active:scale-[0.98] transition-all border-2 border-white/90 cursor-pointer"
        >
          <Download className="w-4 h-4 text-amber-100" />
          <span>{isDownloading ? 'SAVING...' : 'SAVE MY MASTERPIECE'}</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="w-full sm:w-auto py-3.5 px-6 rounded bg-[#172554] hover:bg-[#1e3a8a] text-white font-monoRetro font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer border border-blue-900 shadow-md active:scale-[0.98]"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300">COPIED!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-slate-300" />
              <span>SHARE</span>
            </>
          )}
        </button>
      </motion.div>

      {/* NEXT STEP: SENIOR AWARDS QUIZ CTA */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-rose-400 text-stone-900 border-2 border-stone-900 shadow-xl max-w-md mx-auto transform hover:-rotate-1 transition-transform text-center"
      >
        <div className="flex items-center gap-2 mb-1 justify-center">
          <Trophy className="w-6 h-6 text-stone-900 animate-bounce" />
          <h4 className="font-marker text-xl sm:text-2xl text-stone-900 uppercase tracking-wide">
            KNOW YOURSELF QUIZ 🏆
          </h4>
        </div>
        <p className="font-hand font-bold text-stone-900 text-sm sm:text-base mb-3 leading-snug">
          Tag your senior friends for 10 hilarious awards! Winner gets exciting hampers & prizes on Farewell day! 🎁✨
        </p>
        <button
          type="button"
          onClick={() => setStep('quiz')}
          className="w-full py-3.5 px-5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 font-marker text-lg tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition active:scale-[0.98] border border-amber-400"
        >
          <span>TAKE QUIZ & TAG FRIENDS ➔</span>
        </button>
      </motion.div>

      <div className="mt-4 flex items-center justify-center">
        <button
          type="button"
          onClick={resetMischief}
          className="inline-flex items-center gap-1.5 text-xs font-monoRetro text-stone-700 hover:text-stone-900 font-bold transition cursor-pointer underline"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Transform Another Photo</span>
        </button>
      </div>
    </div>
  );
};
