import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMischiefStore } from '../store/useMischiefStore';

export const LandingScreen: React.FC = () => {
  const { seniorName, setSeniorName, setStep } = useMischiefStore();
  const [nameError, setNameError] = useState<string | null>(null);

  const handleStartMischief = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!seniorName || !seniorName.trim()) {
      setNameError('Please enter your name first, Senior! 🎓');
      return;
    }
    setNameError(null);
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([40, 30, 40]);
    }
    setStep('upload');
  };

  return (
    <div className="relative text-center">
      {/* Washi Masking Tape Top Header */}
      <div className="relative flex justify-center -mt-6 mb-3">
        <div className="washi-tape px-4 py-1 transform -rotate-1 text-center shadow-md border-t border-b border-amber-300/50">
          {/* Crown Icon Doodle */}
          <div className="text-center -mb-1 text-stone-700">
            <svg className="w-5 h-4 inline-block stroke-stone-800 fill-amber-300 stroke-2" viewBox="0 0 24 24">
              <path d="M2 18h20L19 7l-5 5-2-7-2 7-5-5z" />
            </svg>
          </div>
          <p className="font-monoRetro font-black text-[10px] sm:text-xs text-stone-800 tracking-wider uppercase">
            MCA 2024–2026 EXCLUSIVE FAREWELL EXPERIENCE
          </p>
        </div>
      </div>

      {/* Cutout Ransom Typography: "SENIOR" */}
      <div className="flex justify-center items-center gap-1.5 sm:gap-2 my-2 py-1" data-purpose="senior-ransom-letters">
        {/* Letter S - Vintage Plaid */}
        <div className="letter-s-plaid w-10 h-12 sm:w-12 sm:h-14 flex items-center justify-center font-bungee text-2xl sm:text-3xl rounded transform -rotate-6 transition-transform hover:scale-110">
          S
        </div>
        {/* Letter E - Distressed Cardboard */}
        <div className="letter-e-kraft w-9 h-12 sm:w-11 sm:h-14 flex items-center justify-center font-marker text-2xl sm:text-3xl rounded-sm transform rotate-4 transition-transform hover:scale-110">
          E
        </div>
        {/* Letter N - Bright Mustard Yellow Cutout */}
        <div className="letter-n-yellow w-10 h-13 sm:w-12 sm:h-15 flex items-center justify-center font-monoRetro font-black text-2xl sm:text-3xl transform -rotate-3 transition-transform hover:scale-110">
          N
        </div>
        {/* Letter I - Aged Newspaper Newsprint */}
        <div className="letter-i-news w-7 h-12 sm:w-9 sm:h-14 flex items-center justify-center font-bungee text-2xl sm:text-3xl rounded transform rotate-6 transition-transform hover:scale-110">
          I
        </div>
        {/* Letter O - Crimson Vintage Red */}
        <div className="letter-o-red w-10 h-11 sm:w-12 sm:h-13 flex items-center justify-center font-sans font-black text-2xl sm:text-3xl transform -rotate-6 transition-transform hover:scale-110">
          O
        </div>
        {/* Letter R - Raw Stitched Blue Denim */}
        <div className="letter-r-denim w-10 h-12 sm:w-12 sm:h-14 flex items-center justify-center font-bungee text-2xl sm:text-3xl rounded-md transform rotate-3 transition-transform hover:scale-110">
          R
        </div>
      </div>

      {/* Bold Marker Stroke: "MISCHIEF" with 3D Smiley Sticker */}
      <div className="relative flex items-center justify-center my-1" data-purpose="mischief-banner">
        {/* Hand-drawn Star Doodle Left */}
        <div className="absolute left-2 sm:left-4 top-1 text-stone-700 text-lg sm:text-xl select-none font-scribble">
          ✦
        </div>
        {/* Ripped Yellow Highlighter Background */}
        <div className="relative inline-block px-5 py-1 transform -rotate-1 bg-yellow-300 shadow-md border-l-4 border-r-4 border-amber-400">
          <span className="font-marker text-3xl sm:text-4xl tracking-wide text-stone-900 block transform -skew-x-6">
            MISCHIEF
          </span>
        </div>
        {/* Smiley Sticker Right */}
        <div className="relative -ml-2 -mt-4 sticker-float" style={{ '--rot': '12deg' } as React.CSSProperties}>
          <span className="text-3xl sm:text-4xl filter drop-shadow-md cursor-pointer active:scale-125 transition-transform inline-block">
            😎
          </span>
        </div>
        {/* Hand-drawn Star Doodle Right */}
        <div className="absolute right-3 -bottom-2 text-stone-700 text-base sm:text-lg select-none">
          ★
        </div>
      </div>

      {/* Playful Handwritten Tagline */}
      <div className="text-center my-3 relative px-2">
        <p className="font-hand text-lg sm:text-xl text-stone-800 font-bold leading-tight">
          “Your juniors have prepared<br />a little surprise for you...”
        </p>
        <div className="w-32 h-1.5 mx-auto bg-amber-400/80 rounded-full transform -rotate-1 mt-0.5" />
      </div>

      {/* Senior Name Input Card */}
      <form onSubmit={handleStartMischief} className="relative my-4 bg-[#fbf6ec] border-2 border-[#e3d5be] p-3.5 sm:p-4 rounded-lg shadow-md text-left font-monoRetro">
        <div className="washi-tape absolute -top-2.5 left-1/2 -translate-x-1/2 w-28 h-4 transform -rotate-1 z-10" />
        <label htmlFor="senior-name-input" className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="text-amber-600">🎓</span>
            <span>Enter Your Name, Senior:</span>
          </span>
          <span className="text-[10px] text-pink-700 font-hand font-bold text-right">* Required</span>
        </label>
        <div className="relative">
          <input
            id="senior-name-input"
            type="text"
            value={seniorName}
            onChange={(e) => {
              setSeniorName(e.target.value);
              if (nameError) setNameError(null);
            }}
            placeholder="e.g. Karun Poojari"
            className="w-full bg-white text-stone-900 placeholder-stone-400 px-3.5 py-2.5 rounded border-2 border-stone-400 focus:border-amber-500 focus:outline-none font-bold text-sm sm:text-base shadow-inner"
            maxLength={40}
            required
          />
        </div>
        {nameError && (
          <p className="mt-1.5 text-xs text-rose-600 font-bold font-hand animate-pulse">{nameError}</p>
        )}
      </form>

      {/* Grad Hat Sticker Floating */}
      <div className="absolute -right-2 top-28 sm:top-24 w-14 h-14 sticker-float pointer-events-none" style={{ '--rot': '15deg' } as React.CSSProperties}>
        <div className="relative text-3xl sm:text-4xl filter drop-shadow-lg">
          🎓
          <span className="absolute -bottom-1 -left-1 text-xs">✨</span>
        </div>
      </div>

      {/* 3-Step Interactive Process Card (Craft Cardboard Insert) */}
      <div className="relative mt-2 mb-2 bg-[#EFE6D4] border border-[#D5C5AC] p-2.5 rounded shadow-inner" data-purpose="interactive-steps-card">
        <div className="absolute -top-2 left-6 washi-tape-dark w-12 h-3.5 transform -rotate-3" />
        <div className="flex items-center justify-around gap-1 text-center pt-1">
          {/* Step 1: Scan */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-stone-900 font-black text-xs flex items-center justify-center font-monoRetro shadow">
              1
            </div>
            <div className="flex items-center gap-1 mt-1 text-stone-800">
              <svg className="w-3.5 h-3.5 stroke-stone-800" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                <rect height="7" width="7" x="3" y="3" />
                <rect height="7" width="7" x="14" y="3" />
                <rect height="7" width="7" x="14" y="14" />
                <rect height="7" width="7" x="3" y="14" />
              </svg>
              <span className="font-black text-[10px] tracking-wider uppercase font-monoRetro">SCAN</span>
            </div>
          </div>
          {/* Dotted Arrow 1 */}
          <div className="text-stone-400 font-hand font-bold text-xs select-none">---&gt;</div>
          {/* Step 2: Upload */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center font-monoRetro shadow">
              2
            </div>
            <div className="flex items-center gap-1 mt-1 text-stone-800">
              <svg className="w-3.5 h-3.5 stroke-stone-800" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-black text-[10px] tracking-wider uppercase font-monoRetro">UPLOAD</span>
            </div>
          </div>
          {/* Dotted Arrow 2 */}
          <div className="text-stone-400 font-hand font-bold text-xs select-none">---&gt;</div>
          {/* Step 3: Reveal */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-6 h-6 rounded-full bg-pink-500 text-white font-black text-xs flex items-center justify-center font-monoRetro shadow">
              3
            </div>
            <div className="flex items-center gap-1 mt-1 text-stone-800">
              <svg className="w-3.5 h-3.5 stroke-stone-800" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-black text-[10px] tracking-wider uppercase font-monoRetro">REVEAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary CTA Button (Torn Vibrant Banner) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 pt-1 pb-1 px-1"
      >
        <button
          type="button"
          onClick={() => handleStartMischief()}
          className="torn-btn w-full group relative overflow-hidden py-3.5 px-4 rounded bg-gradient-to-r from-[#FF7A00] via-[#FF3366] to-[#E91E63] text-white font-black text-base sm:text-lg tracking-wider uppercase font-sans flex items-center justify-center gap-2 transform active:scale-95 hover:scale-[1.02] transition-all border-2 border-white/90 cursor-pointer shadow-xl"
        >
          <span className="text-yellow-200 text-lg leading-none transform group-hover:rotate-45 transition-transform">⚡</span>
          <span className="drop-shadow-md">START MISCHIEF</span>
          <span className="text-xl leading-none transform group-hover:translate-x-1.5 transition-transform">➔</span>
        </button>
      </motion.div>
    </div>
  );
};
