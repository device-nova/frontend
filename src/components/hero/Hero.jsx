import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';
import { useScrollFrameSequence, FRAME_URLS, FRAME_COUNT } from '../../hooks/useScrollFrameSequence.js';

const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

/**
 * Maps scroll progress (0-1 across the full 250vh stage) to the text
 * layer's opacity/translate.
 */
function getTextStyle(progress) {
  const fadeStart = 0.05;
  const fadeEnd = 0.4;
  if (progress <= fadeStart) return { opacity: 1, translateY: 0 };
  if (progress >= fadeEnd) return { opacity: 0, translateY: -40 };
  const t = (progress - fadeStart) / (fadeEnd - fadeStart);
  return { opacity: 1 - t, translateY: -40 * t };
}

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const { stageRef, canvasRef, imagesLoaded, scrollProgress } = useScrollFrameSequence({
    frameUrls: FRAME_URLS,
    disabled: reducedMotion,
  });

  const textStyle = getTextStyle(scrollProgress);
  const showNvidiaBadge = scrollProgress > 0.85;

  // Premium Animation Sync: Modulates a subtle cyber glow that ensures edge crispness over the background
  const syncPhase = (scrollProgress ?? 0) * Math.PI * 8;
  const glowMod = 0.5 + 0.5 * Math.sin(syncPhase);
  
  // A dark crisp outline combined with a dual cyan-orange ambient aura for extreme text legibility
  const ultraLegibleGlow = `
    0 2px 4px rgba(0, 0, 0, 0.9), 
    0 0 12px rgba(34, 211, 238, ${0.25 + 0.1 * glowMod}), 
    0 0 25px rgba(249, 115, 22, ${0.15 + 0.05 * glowMod})
  `;

  // UX Fix: Dominant Ice-Blue fading down to a warm, high-contrast, premium Amber-Orange edge
  const premiumBlendedGradient = 'linear-gradient(135deg, #e0f7fa 0%, #22d3ee 55%, #f97316 100%)';

  const heroTextBlock = (
    <motion.div
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex flex-col items-start justify-center h-full container-base pt-20 md:pt-24"
      style={
        reducedMotion
          ? undefined
          : {
              opacity: textStyle.opacity,
              transform: `translateY(${textStyle.translateY}px)`,
            }
      }
    >
      {/* High-End UX Scrim: Smooth radial mask isolates text from canvas grid clutter */}
      <div
        className="absolute inset-y-0 -left-10 w-[120%] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(6, 10, 16, 0.75) 0%, rgba(6, 10, 16, 0.3) 70%, transparent 100%)',
        }}
      />

      {/* Decorative Branding Orbs */}
      <div
        className="absolute -top-20 -left-10 w-[40rem] h-40 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 100% at 20% 50%, rgba(6, 182, 212, 0.08) 0%, rgba(249, 115, 22, 0.03) 60%, transparent 70%)',
        }}
      />

      <motion.h1
        variants={heroItemVariants}
        className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.12] tracking-tight max-w-5xl text-white/95 relative z-10"
      >
        <span>The </span>
        <span
          className="bg-clip-text text-transparent font-bold tracking-tight inline-block"
          style={{ 
            backgroundImage: premiumBlendedGradient, 
            textShadow: ultraLegibleGlow, 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Edge Intelligence
        </span>
        <span> Platform for </span>
        <span
          className="bg-clip-text text-transparent font-bold tracking-tight inline-block"
          style={{ 
            backgroundImage: premiumBlendedGradient, 
            textShadow: ultraLegibleGlow, 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Industrial IoT
        </span>
      </motion.h1>

      <motion.p
        variants={heroItemVariants}
        className="mt-6 text-lg md:text-xl text-neutral-300/90 leading-relaxed max-w-3xl relative z-10"
        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
      >
        <span>Real-time device monitoring, local edge processing, and autonomous industrial 
        decision-making running directly on your sensors, PLCs, and gateways, with 
        near-zero latency and </span>
        <span
          className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-orange-400 font-semibold inline-block"
          style={{ 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          no dependency on a cloud round trip
        </span>
        <span>.</span>
      </motion.p>

      <motion.div variants={heroItemVariants} className="flex flex-wrap items-center gap-4 mt-10 relative z-10">
        <Button
          variant="primary"
          size="lg"
          as="a"
          href="/about"
          className="border border-cyan-400/20 shadow-[0_0_30px_-5px_rgba(6,182,212,0.35)] transition-all duration-300 hover:shadow-[0_0_35px_-2px_rgba(6,182,212,0.5)]"
          style={{
            background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
          }}
        >
          Learn More
          <ArrowRight size={18} aria-hidden="true" />
        </Button>
        <Button
          variant="secondary"
          size="lg"
          as="a"
          href="/contact"
          className="hover:border-cyan-400 hover:text-cyan-400 border-white/10 backdrop-blur-md transition-colors duration-300"
        >
          Get in Touch
          <ChevronRight size={18} aria-hidden="true" />
        </Button>
      </motion.div>

      {/* Modern, clean bottom layout divider element */}
      <motion.div
        variants={heroItemVariants}
        className="flex items-center gap-2 mt-16 relative z-10"
        aria-hidden="true"
      >
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-500/50 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
        <span className="h-px w-8 bg-gradient-to-r from-cyan-500/30 to-transparent" />
      </motion.div>
    </motion.div>
  );

  if (reducedMotion) {
    return (
      <section className="relative h-screen w-full overflow-hidden flex items-center">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${FRAME_URLS[FRAME_URLS.length - 1]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(6,10,16,0.65), var(--bg-void))' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-0 h-36 z-40 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, var(--bg-void), transparent)' }}
          aria-hidden="true"
        />
        {heroTextBlock}
      </section>
    );
  }

  return (
    <div ref={stageRef} className="hero-scroll-stage relative" style={{ height: `${100 + FRAME_COUNT * 3}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-void">
            <div className="flex items-center gap-3 font-mono text-xs text-muted tracking-widest2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
              Loading visual sequence...
            </div>
          </div>
        )}

        <div
          className="absolute inset-x-0 top-0 h-36 z-40 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, var(--bg-void), transparent)' }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-void))' }}
          aria-hidden="true"
        />

        {heroTextBlock}

        <div
          className="absolute bottom-8 right-8 z-20 transition-opacity duration-500"
          style={{ opacity: showNvidiaBadge ? 1 : 0 }}
        >
          <span className="mono-label text-[0.65rem] text-cyan-400 border border-cyan-500/30 bg-void/60 backdrop-blur-md rounded-md px-3 py-1.5">
            Powered by NVIDIA SDK
          </span>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-32 w-[2px] bg-border hidden sm:block">
          <div className="w-full bg-cyan-500" style={{ height: `${scrollProgress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}