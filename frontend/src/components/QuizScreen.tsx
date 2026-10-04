import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Gift, ArrowRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useMischiefStore } from '../store/useMischiefStore';
import { QUIZ_QUESTIONS } from '../config/quizQuestions';
import { API_ENDPOINTS } from '../config/api.config';
import type { QuizNominationPayload } from '../types';

export const QuizScreen: React.FC = () => {
  const { seniorName, setStep } = useMischiefStore();
  const [answers, setAnswers] = useState<{ [awardId: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInputChange = (awardId: string, val: string) => {
    setAnswers((prev) => ({
      ...prev,
      [awardId]: val,
    }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmitQuiz = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if at least one friend is nominated
    const filledNominations: QuizNominationPayload[] = QUIZ_QUESTIONS.map((q) => ({
      awardId: q.id,
      awardTitle: `${q.emoji} ${q.title}`,
      taggedName: (answers[q.id] || '').trim(),
    })).filter((item) => item.taggedName.length > 0);

    if (filledNominations.length === 0) {
      setErrorMsg('Please tag at least one senior friend for any award before submitting! 🎓');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch(API_ENDPOINTS.QUIZ, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submittedBy: seniorName || 'Anonymous Senior',
          nominations: filledNominations,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setStep('invitation');
        }, 1200);
      } else {
        setErrorMsg(data.message || 'Failed to record nominations. Proceeding to invitation...');
        setTimeout(() => {
          setStep('invitation');
        }, 1500);
      }
    } catch (err) {
      console.warn('[Quiz] Submission network fallback, proceeding to invitation:', err);
      setSubmitted(true);
      setTimeout(() => {
        setStep('invitation');
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative text-center max-w-xl mx-auto">
      {/* Top Stamp Header */}
      <div className="inline-block bg-amber-400 text-stone-900 font-marker text-xs sm:text-sm tracking-wider px-4 py-1 rounded shadow transform -rotate-1 mb-3">
        🏆 KNOW YOURSELF SENIOR AWARDS QUIZ
      </div>

      <h2 className="font-marker text-2xl sm:text-3xl text-stone-900 tracking-wide uppercase mb-1">
        TAG YOUR SENIOR FRIENDS! 👑
      </h2>
      <p className="font-hand font-bold text-base sm:text-lg text-stone-800 leading-tight mb-4">
        {seniorName ? `Hey ${seniorName}! ` : ''}Nominate your fellow seniors for these 10 legendary awards!
      </p>

      {/* Prizes Banner Card */}
      <div className="bg-[#efe6d4] border-2 border-amber-400 p-3 sm:p-4 rounded-lg shadow-md mb-6 text-left relative overflow-hidden font-monoRetro">
        <div className="washi-tape absolute -top-2.5 right-6 w-20 h-4 transform rotate-2 z-10" />
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-amber-400 text-stone-900 shrink-0 mt-0.5">
            <Gift className="w-5 h-5 text-stone-900" />
          </div>
          <div>
            <div className="font-bold text-xs text-amber-900 uppercase tracking-wider flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>EVENT PRIZES & TROPHIES</span>
            </div>
            <p className="text-xs text-stone-800 font-bold font-hand text-sm mt-0.5 leading-snug">
              🎁 Top nominated seniors win exclusive MCA Farewell Superlative Trophies & Special Hampers live at the event!
            </p>
          </div>
        </div>
      </div>

      {/* Quiz Form */}
      <form onSubmit={handleSubmitQuiz} className="space-y-4 text-left">
        {QUIZ_QUESTIONS.map((q) => {
          const taggedVal = answers[q.id] || '';
          return (
            <div
              key={q.id}
              className="bg-[#fbf6ec] border-2 border-[#e3d5be] p-3.5 sm:p-4 rounded-lg shadow-sm font-monoRetro relative transition-all hover:border-amber-400"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-amber-400 text-stone-900 font-black text-xs flex items-center justify-center font-monoRetro shadow-sm shrink-0">
                    {q.number}
                  </span>
                  <h3 className="font-marker text-sm sm:text-base text-stone-900 tracking-wide">
                    {q.emoji} &ldquo;{q.title}&rdquo;
                  </h3>
                </div>
              </div>

              <p className="font-hand font-bold text-xs sm:text-sm text-stone-700 mb-2 pl-8 leading-tight">
                {q.tagline}
              </p>

              <div className="pl-8">
                <input
                  type="text"
                  value={taggedVal}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  placeholder="Tag a Senior Friend's Name (e.g. Preetham)..."
                  className="w-full bg-white text-stone-900 placeholder-stone-400 px-3 py-2 rounded border-2 border-stone-300 focus:border-amber-500 focus:outline-none font-bold text-xs sm:text-sm shadow-inner"
                  maxLength={40}
                />
              </div>
            </div>
          );
        })}

        {/* Validation / Success Messages */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 rounded bg-red-500/10 border border-red-500/30 text-rose-700 text-xs font-bold font-monoRetro flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs font-bold font-monoRetro flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Nominations Saved! Redirecting to Farewell Invitation... ✉️</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting || submitted}
            className="torn-cta-button w-full sm:flex-1 py-3.5 px-6 text-white font-marker text-base sm:text-lg tracking-wider flex items-center justify-center gap-2 shadow-xl hover:brightness-110 active:scale-[0.98] transition-all border-2 border-white/90 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT AWARDS QUIZ ➔'}</span>
          </button>

          <button
            type="button"
            onClick={() => setStep('invitation')}
            className="w-full sm:w-auto py-3.5 px-5 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 font-monoRetro font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer border border-stone-300"
          >
            <span>Skip to Invitation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
