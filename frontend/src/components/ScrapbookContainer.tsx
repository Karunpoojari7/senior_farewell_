import React from 'react';
import { useMischiefStore } from '../store/useMischiefStore';
import { BATCH_DETAILS } from '../config/themes';

interface ScrapbookContainerProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

export const ScrapbookContainer: React.FC<ScrapbookContainerProps> = ({
  children,
  showBackButton = false,
}) => {
  const { setStep } = useMischiefStore();

  return (
    <div className="relative min-w-[320px] max-w-[430px] sm:max-w-xl md:max-w-2xl mx-auto min-h-screen scrapbook-bg flex flex-col justify-between overflow-hidden shadow-2xl rounded-xl border border-blue-900/40 my-0 sm:my-4">
      {/* BEGIN: Sticky Top Navigation Bar */}
      <header className="sticky top-0 z-50 px-3.5 pt-3 pb-2.5 bg-[#0b172e]/95 backdrop-blur-md border-b border-blue-900/60 transition-all shadow-md">
        <div className="flex items-center justify-between gap-2">
          {/* Left / Back / Branding */}
          <div className="flex items-center space-x-2">
            {showBackButton ? (
              <button
                type="button"
                onClick={() => setStep('landing')}
                className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e4cc9e] hover:bg-[#d8bd8c] text-neutral-900 rounded font-monoRetro font-bold text-xs uppercase tracking-wider shadow-sm transform -rotate-2 active:scale-95 transition-transform cursor-pointer"
                aria-label="Go back to home"
              >
                <span className="w-2.5 h-4 -left-1 absolute bg-yellow-100/60 -top-1 -rotate-45" />
                <svg
                  className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep('landing')}
                className="flex items-center space-x-2 text-left cursor-pointer group"
              >
                <div className="relative w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                  <span className="text-xl leading-none select-none">😎</span>
                  <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <h1 className="text-xs font-black tracking-wider text-white uppercase font-sans">
                      Senior Mischief
                    </h1>
                    <span className="text-[10px] font-black bg-amber-400 text-stone-900 px-1.5 py-0.5 rounded shadow-sm leading-none uppercase font-monoRetro transform -rotate-2">
                      MCA &apos;26
                    </span>
                  </div>
                  <p className="text-[9.5px] font-medium text-slate-300/85 tracking-wide">
                    GM University Farewell
                  </p>
                </div>
              </button>
            )}
          </div>

          {/* Right: Live Seniors Counter Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[9.5px] font-black tracking-wider text-emerald-300 uppercase whitespace-nowrap">
              LIVE FOR 71 SENIORS
            </span>
          </div>
        </div>
      </header>
      {/* END: Sticky Top Navigation Bar */}

      {/* BEGIN: Main Stage Area */}
      <main className="relative flex-1 flex flex-col justify-start p-2 sm:p-4">
        {/* Navy Upper Layer with Floating Camera & Stars */}
        <div className="relative pt-2 pb-1 px-2 z-10 flex justify-between items-start">
          {/* Retro Camera Sticker (Left) */}
          <div className="relative sticker-float" style={{ '--rot': '-8deg' } as React.CSSProperties}>
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-stone-900 border-2 border-white rounded-lg p-1 shadow-lg transform -rotate-12 overflow-hidden flex flex-col items-center justify-center">
              <div className="w-full flex justify-between items-center px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-[6px] text-zinc-300 font-monoRetro">35MM</span>
              </div>
              <div className="text-xl leading-none my-0.5">📸</div>
              <div className="text-[7px] tracking-tight font-black text-amber-200 uppercase font-monoRetro">
                CLICK!
              </div>
            </div>
          </div>

          {/* Chrome Star & College Days Doodle (Right) */}
          <div className="relative sticker-float flex flex-col items-end" style={{ '--rot': '10deg' } as React.CSSProperties}>
            <div className="w-10 h-10 flex items-center justify-center drop-shadow-[0_4px_8px_rgba(255,255,255,0.35)]">
              <svg className="w-9 h-9 fill-slate-200 stroke-stone-300 stroke-1 filter drop-shadow" viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div className="transform rotate-3 text-right mt-0.5">
              <p className="font-hand text-xs text-amber-200 font-bold leading-tight drop-shadow-sm">
                College Days<br />Forever &gt;&gt; ♡
              </p>
            </div>
          </div>
        </div>

        {/* Center Ripped Parchment Sheet Section */}
        <section className="relative z-20 my-1 mx-1 sm:mx-2">
          {/* Torn Paper Top Edge SVG */}
          <div className="w-full overflow-hidden leading-none filter drop-shadow-[0_8px_12px_rgba(10,20,40,0.45)]">
            <svg className="w-full h-6 text-[#F8F4EC]" preserveAspectRatio="none" viewBox="0 0 1200 40">
              <path d="M0,35 Q30,10 60,30 T120,25 T180,38 T240,15 T300,32 T360,18 T420,36 T480,20 T540,35 T600,15 T660,38 T720,22 T780,35 T840,16 T900,34 T960,20 T1020,38 T1080,18 T1140,35 T1200,25 L1200,40 L0,40 Z" fill="currentColor" />
            </svg>
          </div>

          {/* Main Body: Graph Paper Sheet */}
          <div className="graph-paper-bg px-3.5 pt-4 pb-6 relative rounded-sm shadow-xl text-stone-800">
            {children}
          </div>

          {/* Torn Paper Bottom Edge SVG */}
          <div className="w-full overflow-hidden leading-none filter drop-shadow-[0_-8px_12px_rgba(10,20,40,0.45)] -mt-0.5">
            <svg className="w-full h-6 text-[#F8F4EC] rotate-180" preserveAspectRatio="none" viewBox="0 0 1200 40">
              <path d="M0,35 Q30,10 60,30 T120,25 T180,38 T240,15 T300,32 T360,18 T420,36 T480,20 T540,35 T600,15 T660,38 T720,22 T780,35 T840,16 T900,34 T960,20 T1020,38 T1080,18 T1140,35 T1200,25 L1200,40 L0,40 Z" fill="currentColor" />
            </svg>
          </div>
        </section>

        {/* Bottom Stickers (Vinyl & Filmstrip) */}
        <div className="relative px-3 pt-2 pb-4 z-10 flex items-end justify-between overflow-hidden">
          {/* Vinyl Record */}
          <div className="relative flex items-center -space-x-3">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full vinyl-grooves border-2 border-stone-800 shadow-2xl flex items-center justify-center transform -rotate-12 sticker-float"
              style={{ '--rot': '-12deg' } as React.CSSProperties}
            >
              <div className="w-7 h-7 rounded-full bg-[#f6eedb] flex flex-col items-center justify-center text-center p-0.5 border border-stone-400">
                <span className="text-[5px] font-black text-stone-900 leading-none">Limited</span>
                <span className="text-[4px] text-stone-600 font-monoRetro">edition</span>
                <div className="w-1 h-1 rounded-full bg-stone-950 mt-0.5" />
              </div>
            </div>
            <div className="w-20 p-1.5 bg-[#F5E5C9] shadow-lg rounded-sm transform rotate-6 border border-stone-300 relative z-10">
              <div className="absolute -top-2 left-4 washi-tape w-6 h-2.5" />
              <p className="font-hand text-[10px] sm:text-xs font-bold text-stone-900 leading-tight pt-1">
                Same Person.<br />More Mischief. ☻
              </p>
            </div>
          </div>

          {/* Disco Ball & Clapperboard */}
          <div className="flex flex-col items-end space-y-1">
            <div className="mr-3 sticker-float" style={{ '--rot': '5deg' } as React.CSSProperties}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-400 via-white to-slate-300 border border-slate-300 shadow-md flex items-center justify-center text-xs">
                🪩
              </div>
            </div>
            <div className="w-20 bg-stone-900 border border-zinc-700 text-white rounded p-1 shadow-xl transform rotate-3">
              <div className="h-2 w-full bg-[repeating-linear-gradient(45deg,#fff,#fff_4px,#000_4px,#000_8px)] rounded-sm mb-0.5" />
              <p className="font-marker text-center text-[10px] tracking-wider text-amber-200">The End</p>
            </div>
          </div>
        </div>
      </main>
      {/* END: Main Stage Area */}

      {/* BEGIN: Scrapbook Heritage Footer */}
      <footer className="relative z-30 bg-[#0b172e]/95 border-t border-blue-900/60 py-3 px-4 text-center">
        <div className="flex items-center justify-center gap-1.5 mb-0.5 text-amber-300/90 text-xs">
          <span>🎗️</span>
          <p className="font-monoRetro font-bold text-[10px] sm:text-[11px] tracking-wider uppercase text-slate-200">
            {BATCH_DETAILS.department} • {BATCH_DETAILS.university}
          </p>
        </div>
        <p className="text-[9px] sm:text-[10px] font-semibold text-slate-400 tracking-wide">
          DEDICATED TO 71 MCA SENIORS WITH JUNIOR LOVE <span className="text-pink-500 inline-block animate-pulse">❤️</span>
        </p>
      </footer>
      {/* END: Scrapbook Heritage Footer */}
    </div>
  );
};
