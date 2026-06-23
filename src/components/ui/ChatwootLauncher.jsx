import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatwoot } from '../../hooks/useChatwoot.js';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';

function RippleEffect({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,217,255,0.3) 0%, transparent 70%)',
          }}
          initial={{ opacity: 1, scale: 0.8 }}
          animate={{ opacity: 0, scale: 2.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}
    </AnimatePresence>
  );
}

function OuterRing({ reducedMotion }) {
  return (
    <span
      className="absolute inset-0 rounded-full"
      style={{
        border: '1px solid rgba(0,217,255,0.15)',
        animation: reducedMotion ? 'none' : 'chatwootRingRotate 8s linear infinite',
      }}
    />
  );
}

function MiddleRing({ reducedMotion }) {
  return (
    <span
      className="absolute inset-0 rounded-full"
      style={{
        border: '1px dashed rgba(0,217,255,0.1)',
        margin: 3,
        animation: reducedMotion ? 'none' : 'chatwootRingRotateReverse 6s linear infinite',
      }}
    />
  );
}

function InnerRing({ reducedMotion }) {
  return (
    <span
      className="absolute inset-0 rounded-full"
      style={{
        border: '1px solid rgba(0,217,255,0.06)',
        margin: 7,
        animation: reducedMotion ? 'none' : 'chatwootRingRotate 12s linear infinite',
      }}
    />
  );
}

function CoreGlow({ active }) {
  return (
    <motion.span
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(0,217,255,0.4) 0%, rgba(0,217,255,0.1) 40%, transparent 70%)',
      }}
      animate={{
        scale: active ? 1.4 : 1,
        opacity: active ? 0.8 : 0.4,
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    />
  );
}

function PulseRing() {
  return (
    <motion.span
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{
        border: '1px solid rgba(0,217,255,0.2)',
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.6, 0, 0.6],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function ChatwootLauncher() {
  const { toggle } = useChatwoot();
  const reducedMotion = usePrefersReducedMotion();
  const [rippleActive, setRippleActive] = useState(false);
  const [open, setOpen] = useState(false);
  const rippleTimeout = useRef(null);

  const handleClick = useCallback(() => {
    setRippleActive(true);
    if (rippleTimeout.current) clearTimeout(rippleTimeout.current);
    rippleTimeout.current = setTimeout(() => setRippleActive(false), 700);

    setOpen((prev) => !prev);
    toggle();
  }, [toggle]);

  return (
    <div className="fixed z-40" style={{ bottom: 28, right: 28 }}>
      <div className="relative" style={{ width: 60, height: 60 }}>
        <motion.button
          onClick={handleClick}
          className="relative w-full h-full rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#060a10]"
          style={{
            background: 'linear-gradient(135deg, #0d131c, #131b26)',
            border: '1px solid rgba(0,217,255,0.2)',
            boxShadow: '0 0 24px -4px rgba(0,217,255,0.15), 0 4px 16px -4px rgba(0,0,0,0.5)',
          }}
          whileHover={{
            scale: 1.08,
            boxShadow: '0 0 32px -4px rgba(0,217,255,0.3), 0 8px 24px -4px rgba(0,0,0,0.6)',
            borderColor: 'rgba(0,217,255,0.4)',
            transition: { duration: 0.3, ease: 'easeOut' },
          }}
          whileTap={{ scale: 0.92 }}
          animate={
            open
              ? {
                  boxShadow: '0 0 40px -4px rgba(0,217,255,0.35), 0 8px 24px -4px rgba(0,0,0,0.6)',
                }
              : {}
          }
          aria-label={open ? 'Close chat' : 'Open chat'}
        >
          <RippleEffect active={rippleActive && !reducedMotion} />
          <CoreGlow active={open} />
          {!reducedMotion && <PulseRing />}
          <OuterRing reducedMotion={reducedMotion} />
          <MiddleRing reducedMotion={reducedMotion} />
          <InnerRing reducedMotion={reducedMotion} />

          <span className="absolute inset-0 flex items-center justify-center z-10">
            {open ? (
              <motion.svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00d9ff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00d9ff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'backOut' }}
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <circle cx="9" cy="10" r="0.5" fill="#00d9ff" />
                <circle cx="12" cy="10" r="0.5" fill="#00d9ff" />
                <circle cx="15" cy="10" r="0.5" fill="#00d9ff" />
              </motion.svg>
            )}
          </span>
        </motion.button>

        {!reducedMotion && (
          <>
            <span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(0,217,255,0.08), transparent, rgba(0,217,255,0.04), transparent)',
                animation: 'chatwootConicSpin 4s linear infinite',
                margin: -2,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
