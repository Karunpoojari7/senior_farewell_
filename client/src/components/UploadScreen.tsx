import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, X, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useMischiefStore } from '../store/useMischiefStore';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const UploadScreen: React.FC = () => {
  const { seniorName, previewUrl, setSelectedFile, processMischief } = useMischiefStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setValidationError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setValidationError('Please upload a valid image file (JPG, JPEG, PNG, or WEBP).');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setValidationError('Image size exceeds 10 MB. Please choose a smaller photo.');
      return;
    }

    setSelectedFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setValidationError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDemoSample = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffedd5';
      ctx.fillRect(0, 0, 400, 400);

      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(200, 180, 80, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 22px Courier';
      ctx.textAlign = 'center';
      ctx.fillText(`🎓 ${seniorName ? seniorName.toUpperCase() : 'SENIOR'} 2026`, 200, 320);

      canvas.toBlob((blob) => {
        if (blob) {
          const sampleFile = new File([blob], 'demo_senior_sample.png', { type: 'image/png' });
          handleFile(sampleFile);
        }
      });
    }
  };

  return (
    <div className="relative text-center">
      {/* BEGIN: HeadlineSection */}
      <section className="text-center relative z-10 mb-4" data-purpose="headline-area">
        {/* Crown Doodle */}
        <div className="flex justify-center mb-0.5">
          <svg className="w-8 h-8 text-slate-800 transform -rotate-3" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 48 48">
            <path d="M6 34L10 16L20 25L24 12L28 25L38 16L42 34H6Z" fill="rgba(253, 224, 71, 0.25)" />
            <circle cx="24" cy="9" fill="currentColor" r="2.5" />
            <circle cx="10" cy="13" fill="currentColor" r="2.5" />
            <circle cx="38" cy="13" fill="currentColor" r="2.5" />
          </svg>
        </div>

        {/* Personalized Senior Name Welcome Stamp */}
        {seniorName && (
          <div className="inline-block bg-pink-700 text-white font-marker text-xs sm:text-sm tracking-wider px-3 py-1 rounded shadow transform -rotate-2 mb-2">
            WELCOME, {seniorName.toUpperCase()}! 🎓
          </div>
        )}

        {/* Torn Paper Stamp Header: READY FOR SOME */}
        <div className="inline-block relative mb-1.5">
          <span className="inline-block bg-[#f3ecd8] border-2 border-stone-800/80 text-stone-900 font-marker text-xl sm:text-2xl tracking-wider px-3.5 py-1 shadow-sm transform -rotate-1">
            READY FOR SOME
          </span>
          <span className="absolute -left-3 top-0 font-hand text-lg text-slate-700 select-none">✦</span>
          <span className="absolute -right-4 -top-2 font-hand text-lg text-slate-700 select-none">★</span>
        </div>

        {/* Cutout Letters: M I S C H I E F ? */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 my-2 flex-wrap" data-purpose="cutout-letters-container">
          <span className="letter-scrap bg-stone-900 text-stone-100 rotate-[-4deg]">M</span>
          <span className="letter-scrap bg-rose-600 text-white rotate-[3deg]">i</span>
          <span className="letter-scrap bg-amber-400 text-stone-900 rotate-[-2deg]">S</span>
          <span className="letter-scrap bg-sky-700 text-white rotate-[5deg]">C</span>
          <span className="letter-scrap bg-emerald-600 text-white rotate-[-3deg]">H</span>
          <span className="letter-scrap bg-amber-500 text-stone-900 rotate-[2deg]">i</span>
          <span className="letter-scrap bg-red-700 text-white rotate-[-5deg]">E</span>
          <span className="letter-scrap bg-blue-900 text-white rotate-[4deg]">F</span>
          <span className="letter-scrap bg-purple-700 text-yellow-300 font-bold rotate-[-3deg]">?</span>
          <span className="text-3xl ml-1 transform rotate-6 inline-block hover:scale-125 transition-transform cursor-pointer" title="Ready for mischief?">
            😎
          </span>
        </div>

        {/* Sub-banner */}
        <div className="inline-block relative mt-1 max-w-[90%]">
          <div className="bg-amber-300/90 text-stone-900 font-monoRetro font-bold text-xs sm:text-sm px-3 py-1 shadow-sm transform rotate-1 border-t border-b border-amber-400">
            Upload a clear solo or group photo.
          </div>
        </div>

        {/* Navy Cursive Pill */}
        <div className="mt-2.5">
          <div className="inline-flex items-center gap-1.5 bg-[#172554] text-[#e0e7ff] px-3.5 py-1 rounded-full font-hand text-sm sm:text-base tracking-wide shadow transform -rotate-1 border border-blue-900/50">
            <span>Don&apos;t worry... we decide what happens next.</span>
            <span className="text-base select-none">☻</span>
          </div>
        </div>
      </section>
      {/* END: HeadlineSection */}

      {/* BEGIN: InteractiveUploadZone */}
      <section className="mt-4 mb-3 relative z-20" data-purpose="photo-upload-container">
        <div className="absolute -top-3.5 left-4 z-30 pointer-events-none drop-shadow">
          <svg fill="none" height="42" stroke="#64748b" strokeLinecap="round" strokeWidth="2.5" viewBox="0 0 24 48" width="22">
            <path d="M8 12V34C8 38 12 41 16 41C20 41 24 38 24 34V8C24 4 19 1 14 1C9 1 4 4 4 9V34" />
          </svg>
        </div>
        <div className="washi-tape absolute -top-2.5 -right-2 w-16 h-5 transform rotate-12 z-30" />

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => {
            if (!previewUrl) fileInputRef.current?.click();
          }}
          className={`torn-chalkboard rounded-lg p-5 border-2 transition-all duration-200 cursor-pointer text-center relative overflow-hidden ${
            dragActive
              ? 'border-amber-400 scale-[1.02]'
              : previewUrl
              ? 'border-solid border-amber-400/40'
              : 'border-dashed border-stone-600/80 hover:border-amber-400/70'
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !previewUrl) {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleChange}
            className="hidden"
            id="photo-input"
          />

          {!previewUrl ? (
            /* STATE 1: Empty Upload State */
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative mb-3">
                <span className="absolute -top-2 -left-4 text-stone-400 font-hand text-xl">✦</span>
                <span className="absolute -bottom-1 -right-4 text-stone-400 font-hand text-lg">★</span>
                <div className="w-16 h-16 bg-[#f7f0e1] rounded shadow-inner flex items-center justify-center transform -rotate-2 border border-stone-300">
                  <UploadCloud className="w-8 h-8 text-stone-800" />
                </div>
              </div>

              <p className="font-marker text-base sm:text-lg text-white tracking-wide mb-1">
                Tap to choose photo or drag &amp; drop
              </p>
              <p className="font-monoRetro text-xs text-stone-400 mb-3 tracking-tight">
                JPG, JPEG, PNG, WEBP (Max 10 MB)
              </p>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/90 border border-stone-600 text-stone-200 text-xs font-medium tracking-tight">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Clear face photo works best</span>
              </div>
            </div>
          ) : (
            /* STATE 2: Interactive Polaroid Preview State */
            <div className="flex flex-col items-center justify-center py-2 animate-fade-in">
              <div className="relative bg-amber-50 p-2.5 pb-5 rounded shadow-2xl transform -rotate-2 max-w-[240px] w-full border border-stone-300 text-stone-900">
                <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 transform -rotate-1 z-10" />

                <div className="w-full aspect-square bg-stone-900 rounded-sm overflow-hidden border border-stone-400/50 relative">
                  <img
                    src={previewUrl}
                    alt="Senior preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemove}
                    title="Remove selected photo"
                    className="absolute top-2 right-2 bg-red-600/90 text-white rounded-full p-1 shadow hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[10px] font-bold flex items-center gap-1 backdrop-blur-md">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Ready</span>
                  </div>
                </div>

                <div className="pt-3 text-center">
                  <p className="font-hand text-lg text-slate-800 font-bold leading-tight">
                    {seniorName ? `${seniorName} Ready! ✨` : 'Batch 2026 Senior Ready! ✨'}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="mt-1 text-[11px] font-monoRetro underline text-stone-600 hover:text-stone-900 block mx-auto uppercase tracking-wider cursor-pointer"
                  >
                    Change Photo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Demo Preview Switch */}
        <div className="flex items-center justify-between mt-2 px-1 text-[11px] font-monoRetro text-stone-600">
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            Automatic Cartoon Transform
          </span>
          <button
            type="button"
            onClick={handleDemoSample}
            className="underline text-indigo-700 hover:text-indigo-900 cursor-pointer font-bold"
          >
            [Demo: Load Sample Photo]
          </button>
        </div>
      </section>
      {/* END: InteractiveUploadZone */}

      {/* Validation Error Message */}
      <AnimatePresence>
        {validationError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="my-3 p-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-600 text-xs flex items-center justify-center gap-2 font-monoRetro"
          >
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{validationError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BEGIN: CallToActionArea */}
      <section className="mt-3 mb-2 text-center z-20 relative" data-purpose="submission-cta-wrapper">
        <button
          type="button"
          onClick={processMischief}
          disabled={!previewUrl}
          className={`torn-cta-button w-full py-4 px-6 text-white font-marker text-lg sm:text-xl tracking-wider flex items-center justify-center gap-2.5 shadow-xl transition-all border-2 border-white/90 ${
            previewUrl
              ? 'hover:brightness-110 active:scale-[0.98] transform hover:-rotate-1 cursor-pointer'
              : 'opacity-60 cursor-not-allowed filter grayscale-[0.3]'
          }`}
        >
          <span className="text-xl filter drop-shadow">🪄</span>
          <span className="drop-shadow-md">SUBMIT PHOTO</span>
          <span className="text-xl font-bold ml-1">→</span>
        </button>

        <p className="mt-3 text-stone-600 text-[11px] font-sans leading-tight">
          🔒 Uploaded photos are used solely for your cartoon keepsake and deleted after processing.
        </p>
      </section>
      {/* END: CallToActionArea */}
    </div>
  );
};
