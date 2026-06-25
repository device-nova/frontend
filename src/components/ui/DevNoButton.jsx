import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function DevNoButton({ href, onClick, className = '' }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  function handleMouseMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0.5, y: 0.5 }); }}
      onMouseMove={handleMouseMove}
      className={`relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-5 py-2.5 font-mono text-xs tracking-widest2 uppercase transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan ${className}`}
      style={{
        background: hovered
          ? 'linear-gradient(135deg, var(--accent-cyan), var(--accent-cyan-deep))'
          : 'linear-gradient(135deg, rgba(0,217,255,0.12), rgba(0,153,204,0.08))',
        border: '1px solid',
        borderColor: hovered ? 'var(--accent-cyan)' : 'var(--accent-cyan)',
        boxShadow: hovered
          ? '0 0 30px -8px var(--accent-cyan), inset 0 0 20px -10px var(--accent-cyan)'
          : '0 0 12px -6px rgba(0,217,255,0.25)',
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Background glow orb that follows cursor */}
      <motion.span
        className="absolute pointer-events-none"
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,217,255,0.2) 0%, transparent 70%)',
          left: mousePos.x * 100 - 60,
          top: mousePos.y * 40 - 60,
          opacity: hovered ? 1 : 0,
        }}
        animate={{
          x: hovered ? mousePos.x * 20 - 10 : 0,
          y: hovered ? mousePos.y * 10 - 5 : 0,
        }}
        transition={{ duration: 0.15, ease: 'linear' }}
      />

      {/* Animated border glow ring */}
      <motion.span
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          border: '1px solid transparent',
          backgroundClip: 'padding-box',
        }}
        animate={
          hovered
            ? {
                boxShadow: [
                  'inset 0 0 0px rgba(0,217,255,0)',
                  'inset 0 0 12px rgba(0,217,255,0.15)',
                  'inset 0 0 0px rgba(0,217,255,0)',
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Scanning line effect on hover */}
      <motion.span
        className="absolute inset-x-0 h-[1px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--accent-cyan), transparent)',
          opacity: hovered ? 0.5 : 0,
        }}
        animate={hovered ? { top: ['0%', '100%', '0%'] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
      />

      {/* Vertical scanning line */}
      <motion.span
        className="absolute inset-y-0 w-[1px] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent, var(--accent-cyan), transparent)',
          opacity: hovered ? 0.3 : 0,
        }}
        animate={hovered ? { left: ['0%', '100%', '0%'] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      {/* Text label */}
      <span
        className="relative z-10"
        style={hovered ? {
          color: 'var(--bg-void)',
        } : {
          background: 'linear-gradient(180deg, #0077a3 0%, #00a8cc 18%, #b8e6f0 38%, #f0e6cc 55%, #dbb06b 75%, #c4933a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 0 8px rgba(0,217,255,0.4), 0 0 20px rgba(0,217,255,0.15)',
        }}
      >
        Nova Core
      </span>

      {/* Status dot */}
      <span
        className={`relative z-10 h-1.5 w-1.5 rounded-full transition-all duration-300`}
        style={{
          backgroundColor: hovered ? 'var(--bg-void)' : 'var(--accent-cyan)',
          boxShadow: hovered ? 'none' : '0 0 6px var(--accent-cyan)',
        }}
        aria-hidden="true"
      />
    </motion.a>
  );
}
