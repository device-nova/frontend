import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RadarSweep from '../ui/RadarSweep.jsx';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';

const SESSION_KEY = 'device-nova-loaded';

const STATUS_STEPS = [
  { at: 0, label: 'Initializing edge nodes...' },
  { at: 35, label: 'Establishing connections...' },
  { at: 70, label: 'Calibrating inference engine...' },
  { at: 95, label: 'Ready.' },
];

function getStatusLabel(progress) {
  let label = STATUS_STEPS[0].label;
  for (const step of STATUS_STEPS) {
    if (progress >= step.at) label = step.label;
  }
  return label;
}

export default function LoadingScreen({ onComplete }) {
  const reducedMotion = usePrefersReducedMotion();

  const [shouldShow, setShouldShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.sessionStorage.getItem(SESSION_KEY);
  });
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!shouldShow) {
      onComplete?.();
      return;
    }

    window.sessionStorage.setItem(SESSION_KEY, 'true');

    const duration = reducedMotion ? 900 : 1900 + Math.random() * 500;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        setTimeout(() => onComplete?.(), 500);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          role="status"
          aria-live="polite"
        >
          <motion.div
            initial={reducedMotion ? {} : { scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-12"
          >
            <RadarSweep
              active={!reducedMotion}
              size={reducedMotion ? 120 : 200}
              centerImage="/favicon.png"
            />
          </motion.div>

          <motion.div
            className="w-72 sm:w-96"
            initial={reducedMotion ? {} : { y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            <div className="h-1.5 w-full rounded-full bg-surface-raised overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00d9ff, #7c3aed, #00d9ff)',
                  backgroundSize: '200% 100%',
                }}
                animate={
                  reducedMotion
                    ? {}
                    : { backgroundPosition: ['0% 0%', '200% 0%'] }
                }
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <div
                  className="h-full bg-gradient-primary rounded-full"
                  style={{ width: `${progress}%`, transition: reducedMotion ? 'none' : 'width 80ms linear' }}
                />
              </motion.div>
            </div>
            <div className="flex items-center justify-between mt-3 font-mono text-xs text-muted tracking-wide">
              <motion.span
                key={getStatusLabel(progress)}
                initial={reducedMotion ? {} : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                {getStatusLabel(progress)}
              </motion.span>
              <motion.span
                key={Math.floor(progress / 10)}
                initial={reducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {Math.floor(progress)}%
              </motion.span>
            </div>
          </motion.div>

          {!reducedMotion && (
            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan/50" />
                <span className="h-1.5 w-1.5 rounded-full bg-cyan/30" />
                <span className="h-1.5 w-1.5 rounded-full bg-cyan/10" />
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
