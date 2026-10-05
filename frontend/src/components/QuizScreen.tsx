import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Gift, ArrowRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useMischiefStore } from '../store/useMischiefStore';
import { QUIZ_QUESTIONS } from '../config/quizQuestions';
import { API_ENDPOINTS } from '../config/api.config';
import { saveLocalSubmission } from '../services/nominationsStorage';
import type { QuizNominationPayload, QuizSubmissionRecord } from '../types';

export const QuizScreen: React.FC = () => {
  const { seniorName, setStep, hasSubmittedQuiz, setHasSubmittedQuiz } = useMischiefStore();
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

    if (hasSubmittedQuiz) {
      setStep('invitation');
      return;
    }

    // Check if at least one friend is nominated
    const filledNominations: QuizNominationPayload[] = QUIZ_QUESTIONS.map((q) => ({
      awardId: q.id,
      awardTitle: `${q.emoji} ${q.title}`,
      taggedName: (answers[q.id] || '').trim(),
    })).filter((item) => item.taggedName.length > 0);

    if (filledNominations.length === 0) {
      setErrorMsg('Please tag at least one friend for any award before submitting! 🎓');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    // Save locally first to guarantee zero data loss
    const localRecord: QuizSubmissionRecord = {
      id: `quiz_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      submittedBy: seniorName?.trim() || 'Anonymous Senior',
      submittedAt: new Date().toISOString(),
      nominations: filledNominations,
    };
    saveLocalSubmission(localRecord);

    try {
      const response = await fetch(API_ENDPOINTS.QUIZ, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submittedBy: seniorName || 'Anonymous Senior',
          nominations: filledNominations,
        }),
      });

      const data = await response.json().catch(() => ({ success: true }));
      if (response.ok && data.success) {
        setSubmitted(true);
        setHasSubmittedQuiz(true);
        setTimeout(() => {
          setStep('invitation');
        }, 1200);
      } else {
        setSubmitted(true);
        setHasSubmittedQuiz(true);
        setTimeout(() => {
          setStep('invitation');
        }, 1200);
      }
    } catch (err) {
      console.warn('[Quiz] Submission network fallback (saved locally), proceeding to invitation:', err);
      setSubmitted(true);
      setHasSubmittedQuiz(true);
      setTimeout(() => {
        setStep('invitation');
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ONE-TIME QUIZ SUBMISSION GUARD
  if (hasSubmittedQuiz && !submitted) {
    return (
      <div className="relative text-center max-w-xl mx-auto py-4 font-sans">
        <div className="bg-stone-900 border-2 border-amber-400 p-6 rounded-xl shadow-2xl text-stone-100 text-center">
          <div className="w-14 h-14 bg-amber-400 text-stone-950 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md font-black">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h2 className="font-marker text-2xl sm:text-3xl text-amber-300 tracking-wide uppercase mb-2">
            QUIZ ALREADY COMPLETED! 🎉
          </h2>
          <p className="font-sans font-bold text-stone-200 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-6">
            {seniorName ? `Hey ${seniorName}! ` : ''}You have already submitted your friend nominations for the Senior Awards. Multiple responses are disabled to keep the voting 100% fair!
          </p>
          <button
            type="button"
            onClick={() => setStep('invitation')}
            className="w-full sm:w-auto py-3.5 px-8 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-marker text-lg tracking-wider shadow-xl flex items-center justify-center gap-2 mx-auto cursor-pointer transition active:scale-[0.98] border-2 border-stone-950 font-black"
          >
            <span>PROCEED TO FAREWELL INVITATION ✉️ ➔</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative text-center max-w-xl mx-auto font-sans">
      {/* Top Stamp Header */}
      <div className="inline-block bg-amber-400 text-stone-950 font-marker text-xs sm:text-sm tracking-wider px-4 py-1.5 rounded shadow-md transform -rotate-1 mb-3 border border-stone-900 font-black">
        🏆 KNOW YOURSELF AWARDS QUIZ
      </div>

      <h2 className="font-marker text-2xl sm:text-3xl text-stone-950 tracking-wide uppercase mb-1 font-black">
        TAG YOUR FRIENDS! 👑
      </h2>
      <p className="font-sans font-extrabold text-base sm:text-lg text-stone-900 leading-tight mb-4">
        {seniorName ? `Hey ${seniorName}! ` : ''}Nominate your friends for these 10 legendary awards!
      </p>

      {/* Prizes Banner Card */}
      <div className="bg-[#f5ebd7] border-2 border-amber-500 p-4 rounded-xl shadow-md mb-6 text-left relative overflow-hidden font-sans">
        <div className="washi-tape absolute -top-2.5 right-6 w-20 h-4 transform rotate-2 z-10" />
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-amber-400 text-stone-950 shrink-0 mt-0.5 shadow-sm">
            <Gift className="w-5 h-5 text-stone-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="font-black text-xs text-amber-950 uppercase tracking-wider flex items-center gap-1.5 font-monoRetro">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>EVENT PRIZES & TROPHIES</span>
            </div>
            <p className="text-stone-900 font-extrabold text-xs sm:text-sm mt-1 leading-snug">
              🎁 Top nominated friends win exclusive MCA Farewell Superlative Trophies & Special Hampers live at the event!
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
              className="bg-white border-2 border-stone-300 p-4 rounded-xl shadow-sm font-sans relative transition-all hover:border-amber-400 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center font-monoRetro shadow-sm shrink-0 border border-stone-900">
                    {q.number}
                  </span>
                  <h3 className="font-marker text-base sm:text-lg text-stone-950 tracking-wide font-black">
                    {q.emoji} &ldquo;{q.title}&rdquo;
                  </h3>
                </div>
              </div>

              <p className="font-sans font-bold text-xs sm:text-sm text-stone-800 mb-3 pl-9 leading-snug">
                {q.tagline}
              </p>

              <div className="pl-9">
                <input
                  type="text"
                  value={taggedVal}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  placeholder="Tag a Friend's Name (e.g. Preetham)..."
                  className="w-full bg-stone-50 text-stone-950 placeholder-stone-400 px-3.5 py-2.5 rounded-lg border-2 border-stone-300 focus:border-amber-500 focus:bg-white focus:outline-none font-bold text-sm shadow-inner"
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
              className="p-3.5 rounded-lg bg-rose-500/10 border-2 border-rose-500/40 text-rose-800 text-xs sm:text-sm font-bold font-sans flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-lg bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-900 text-xs sm:text-sm font-extrabold font-sans flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Nominations Saved! Redirecting to Farewell Invitation... ✉️</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting || submitted}
            className="torn-cta-button w-full sm:flex-1 py-4 px-6 text-white font-marker text-base sm:text-lg tracking-wider flex items-center justify-center gap-2 shadow-xl hover:brightness-110 active:scale-[0.98] transition-all border-2 border-white/90 cursor-pointer font-black"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT AWARDS QUIZ ➔'}</span>
          </button>

          <button
            type="button"
            onClick={() => setStep('invitation')}
            className="w-full sm:w-auto py-3.5 px-5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-900 font-sans font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer border border-stone-400"
          >
            <span>Skip to Invitation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
