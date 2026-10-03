import React from 'react';
import { useMischiefStore } from '../store/useMischiefStore';

export const Navbar: React.FC = () => {
  const { setStep } = useMischiefStore();

  return (
    <header className="w-full border-b border-white/[0.06] bg-[#07080e]/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <button
          onClick={() => setStep('landing')}
          className="flex items-center gap-2 text-left cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500/20 via-orange-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-lg group-hover:scale-105 transition shadow-md">
            😎
          </div>
          <div>
            <div className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
              <span>SENIOR MISCHIEF</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-300 font-mono font-semibold border border-amber-500/30">
                MCA &apos;26
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium hidden sm:block">
              GM University Farewell
            </div>
          </div>
        </button>

        {/* Live Status indicator */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="hidden sm:inline">LIVE FOR 71 SENIORS</span>
            <span className="sm:hidden">71 SENIORS</span>
          </div>
        </div>
      </div>
    </header>
  );
};
