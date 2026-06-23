import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';
import { useScrollFrameSequence, buildFrameUrls } from '../../hooks/useScrollFrameSequence.js';

const FRAME_URLS = buildFrameUrls();

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
 * layer's opacity/translate. Text is fully visible for the first ~5%
 * of scroll, fades out by ~40%, fully hidden after — so the background
 * visual is the sole focus through the middle and end of the stage.
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

  const heroTextBlock = (
    <motion.div
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex flex-col items-start justify-center h-full container-base"
      style={
        reducedMotion
          ? undefined
          : {
              opacity: textStyle.opacity,
              transform: `translateY(${textStyle.translateY}px)`,
            }
      }
    >
      <motion.h1
        variants={heroItemVariants}
        className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight max-w-4xl text-primary"
      >
        The Edge Intelligence Platform for Industrial IoT
      </motion.h1>

      <motion.p
        variants={heroItemVariants}
        className="mt-8 text-lg md:text-xl text-muted leading-relaxed max-w-2xl"
      >
        Real-time device monitoring, local edge processing, and autonomous industrial
        decision-making running directly on your sensors, PLCs, and gateways, with
        near-zero latency and no dependency on a cloud round trip.
      </motion.p>

      <motion.div variants={heroItemVariants} className="flex flex-wrap items-center gap-4 mt-10">
        <Button variant="primary" size="lg" as="a" href="/about">
          Learn More
          <ArrowRight size={18} aria-hidden="true" />
        </Button>
        <Button variant="secondary" size="lg" as="a" href="/contact">
          Get in Touch
          <ChevronRight size={18} aria-hidden="true" />
        </Button>
      </motion.div>
    </motion.div>
  );

  if (reducedMotion) {
    // Static fallback: no pinning, no scrub. Final frame rendered as a
    // plain background image, text fades in normally on mount.
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
          style={{ background: 'linear-gradient(to bottom, rgba(6,10,16,0.55), var(--bg-void))' }}
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
    <div ref={stageRef} className="hero-scroll-stage relative" style={{ height: '250vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Frame sequence canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />

        {/* Loading skeleton shown until all frames are preloaded */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-void">
            <div className="flex items-center gap-3 font-mono text-xs text-muted tracking-widest2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
              Loading visual sequence...
            </div>
          </div>
        )}

        {/* Top gradient scrim — ensures consistent dark backdrop behind the fixed
            navbar regardless of what's visible in the canvas behind it, independent
            of the nav's own blur activation state. */}
        <div
          className="absolute inset-x-0 top-0 h-36 z-40 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, var(--bg-void), transparent)' }}
          aria-hidden="true"
        />

        {/* Bottom gradient overlay for seamless transition into next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-void))' }}
          aria-hidden="true"
        />

        {/* Text content layer */}
        {heroTextBlock}

        {/* NVIDIA SDK badge, fades in during final portion of scroll */}
        <div
          className="absolute bottom-8 right-8 z-20 transition-opacity duration-500"
          style={{ opacity: showNvidiaBadge ? 1 : 0 }}
        >
          <span className="mono-label text-[0.65rem] text-cyan border border-cyan/30 bg-void/60 backdrop-blur-md rounded-md px-3 py-1.5">
            Powered by NVIDIA SDK
          </span>
        </div>

        {/* Vertical scroll-progress indicator */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-32 w-[2px] bg-border hidden sm:block">
          <div
            className="w-full bg-cyan"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
