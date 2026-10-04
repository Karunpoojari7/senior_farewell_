import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMischiefStore } from './store/useMischiefStore';
import { ScrapbookContainer } from './components/ScrapbookContainer';
import { LandingScreen } from './components/LandingScreen';
import { UploadScreen } from './components/UploadScreen';
import { ProcessingScreen } from './components/ProcessingScreen';
import { RevealScreen } from './components/RevealScreen';
import { QuizScreen } from './components/QuizScreen';
import { InvitationScreen } from './components/InvitationScreen';
import { AdminScreen } from './components/AdminScreen';
import { ErrorScreen } from './components/ErrorScreen';
import { LimitReachedScreen } from './components/LimitReachedScreen';

export function App() {
  const { step, setStep } = useMischiefStore();

  // Support direct secret URL access via ?admin=true or ?admin=mischief2026
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') || window.location.pathname.includes('/admin')) {
      setStep('admin');
    }
  }, [setStep]);

  return (
    <div className="min-h-screen scrapbook-bg text-slate-900 selection:bg-amber-300 selection:text-black py-0 sm:py-2">
      <ScrapbookContainer showBackButton={step !== 'landing'}>
        <AnimatePresence mode="wait">
          {step === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <LandingScreen />
            </motion.div>
          )}

          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <UploadScreen />
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <ProcessingScreen />
            </motion.div>
          )}

          {step === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <RevealScreen />
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <QuizScreen />
            </motion.div>
          )}

          {step === 'invitation' && (
            <motion.div
              key="invitation"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <InvitationScreen />
            </motion.div>
          )}

          {step === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <AdminScreen />
            </motion.div>
          )}

          {step === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <ErrorScreen />
            </motion.div>
          )}

          {step === 'limit_reached' && (
            <motion.div
              key="limit"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <LimitReachedScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </ScrapbookContainer>
    </div>
  );
}

export default App;
