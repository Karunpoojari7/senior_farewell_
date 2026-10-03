import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Award, Sparkles } from 'lucide-react';
import { BATCH_DETAILS } from '../config/themes';

interface InvitationCardProps {
  seniorName?: string;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ seniorName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative mt-8 max-w-md mx-auto"
    >
      {/* Visual Header Banner */}
      <div className="text-center mb-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-stone-900 font-marker text-xs sm:text-sm tracking-wider shadow-md transform -rotate-1">
          <Sparkles className="w-4 h-4 text-stone-900" />
          <span>ONE LAST THING...</span>
          <span className="text-base">✉️</span>
        </div>
        <p className="font-hand text-base sm:text-lg text-amber-200 font-bold mt-1.5">
          “You didn&apos;t think we&apos;d let you leave without an invitation, did you?”
        </p>
      </div>

      {/* Main Physical Parchment Invitation Card */}
      <div className="relative graph-paper-bg rounded-md p-5 sm:p-6 text-stone-900 shadow-2xl border-2 border-amber-300/80 overflow-hidden text-left">
        {/* Washi Masking Tape on Corners */}
        <div className="washi-tape absolute -top-3 left-8 w-24 h-5 transform -rotate-3 z-10" />
        <div className="washi-tape absolute -top-3 right-8 w-24 h-5 transform rotate-3 z-10" />

        {/* Top Crest / Header Stamp */}
        <div className="text-center border-b-2 border-dashed border-stone-400/80 pb-4 mb-4">
          {/* Personalized Senior Name if available */}
          {seniorName && (
            <div className="inline-block bg-pink-700 text-white font-marker text-xs tracking-wider px-3 py-0.5 rounded transform -rotate-2 mb-2 shadow">
              {seniorName.toUpperCase()}, YOUR FINAL ASSIGNMENT AWAITS!
            </div>
          )}

          <div className="flex items-center justify-center gap-1.5 text-stone-700 text-[10px] font-monoRetro font-bold tracking-widest uppercase mb-1">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>FACULTY OF COMPUTING & IT • GM UNIVERSITY</span>
          </div>

          <h3 className="font-bungee text-2xl sm:text-3xl text-stone-900 tracking-tight leading-none mt-1">
            FAREWELL &apos;26
          </h3>
          <p className="font-marker text-sm sm:text-base text-rose-700 tracking-wider mt-1">
            THE END OF AN ERA
          </p>
          <div className="inline-block mt-1 bg-stone-900 text-amber-300 font-monoRetro font-black text-xs px-2.5 py-0.5 rounded shadow-sm">
            {BATCH_DETAILS.batch}
          </div>
        </div>

        {/* Event Details Section */}
        <div className="space-y-3 mb-5 font-monoRetro text-xs">
          {/* Date */}
          <div className="flex items-start gap-3 bg-amber-100/80 p-2.5 rounded border border-amber-300/70">
            <div className="p-1.5 rounded bg-amber-400 text-stone-900 shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-stone-500 font-bold block uppercase tracking-wider">DATE</span>
              <span className="font-black text-sm text-stone-900">5 OCTOBER 2026</span>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-3 bg-amber-100/80 p-2.5 rounded border border-amber-300/70">
            <div className="p-1.5 rounded bg-amber-400 text-stone-900 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-stone-500 font-bold block uppercase tracking-wider">TIME</span>
              <span className="font-black text-sm text-stone-900">12:00 PM (NOON)</span>
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-start gap-3 bg-amber-100/80 p-2.5 rounded border border-amber-300/70">
            <div className="p-1.5 rounded bg-amber-400 text-stone-900 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-stone-500 font-bold block uppercase tracking-wider">VENUE</span>
              <span className="font-black text-xs sm:text-sm text-stone-900 block leading-tight">
                GM HALAMMA AUDITORIUM
              </span>
              <span className="text-[11px] text-stone-600">3rd Floor, Engineering Block</span>
            </div>
          </div>
        </div>

        {/* Dignitaries / Faculty Section */}
        <div className="bg-[#efe6d4] p-3 rounded border border-[#d5c5ac] mb-5">
          <div className="flex items-center gap-1.5 text-[10px] font-monoRetro font-bold text-stone-700 tracking-wider uppercase mb-2">
            <Users className="w-3.5 h-3.5 text-stone-800" />
            <span>IN THE PRESENCE OF</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-white/80 p-2 rounded border border-stone-300/80">
              <div className="font-bold text-stone-900">Dr. Shweta Marigoudar</div>
              <div className="text-[9.5px] text-stone-600 font-hand">Dean, FCIT</div>
            </div>
            <div className="bg-white/80 p-2 rounded border border-stone-300/80">
              <div className="font-bold text-stone-900">Usha Narayan</div>
              <div className="text-[9.5px] text-stone-600 font-hand">HOD</div>
            </div>
            <div className="bg-white/80 p-2 rounded border border-stone-300/80">
              <div className="font-bold text-stone-900">Rajashekhar G C</div>
              <div className="text-[9.5px] text-stone-600 font-hand">Director</div>
            </div>
            <div className="bg-white/80 p-2 rounded border border-stone-300/80">
              <div className="font-bold text-stone-900">Swathi</div>
              <div className="text-[9.5px] text-stone-600 font-hand">Class Mentor</div>
            </div>
          </div>
        </div>

        {/* Organized By & Heart Message */}
        <div className="text-center pt-2 border-t border-dashed border-stone-400">
          <div className="inline-block bg-stone-900 text-white font-monoRetro font-bold text-[10px] px-2.5 py-0.5 rounded tracking-widest uppercase mb-2">
            ORGANIZED BY MCA 1ST YEARS
          </div>
          <p className="font-hand font-bold text-base text-rose-800 leading-tight">
            “Come dressed for the memories. Leave with stories we&apos;ll never forget. ❤️”
          </p>
        </div>

        {/* Wax Stamp Graphic Bottom Right */}
        <div className="absolute -bottom-3 -right-3 w-16 h-16 pointer-events-none opacity-90 transform rotate-12">
          <div className="w-full h-full rounded-full bg-rose-800 border-2 border-rose-950 shadow-lg flex items-center justify-center text-white font-marker text-[9px] text-center p-1 leading-none">
            OFFICIAL PASS
          </div>
        </div>
      </div>
    </motion.div>
  );
};
