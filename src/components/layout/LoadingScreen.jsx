import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RadarSweep from '../ui/RadarSweep.jsx';
import Logo from '../ui/Logo.jsx';
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

    const duration = reducedMotion ? 900 : 1900 + Math.random() * 500; // 1.9-2.4s
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
          <div className="mb-10">
            <Logo className="scale-125" />
          </div>

          <div className="mb-10">
            <RadarSweep active={!reducedMotion} size={reducedMotion ? 96 : 160} />
          </div>

          <div className="w-64 sm:w-80">
            <div className="h-1 w-full rounded-full bg-surface-raised overflow-hidden">
              <div
                className="h-full bg-gradient-primary rounded-full"
                style={{ width: `${progress}%`, transition: reducedMotion ? 'none' : 'width 80ms linear' }}
              />
            </div>
            <div className="flex items-center justify-between mt-3 font-mono text-xs text-muted tracking-wide">
              <span>{getStatusLabel(progress)}</span>
              <span>{Math.floor(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
