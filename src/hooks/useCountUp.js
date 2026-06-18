import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js';

/**
 * Animates a number from 0 to `target` when `active` becomes true.
 * Respects prefers-reduced-motion: returns the target immediately without animation.
 *
 * @param {number} target  - Final number value to count up to
 * @param {number} duration - Animation duration in ms (default 1600)
 * @param {boolean} active  - Set true when the element scrolls into view
 */
export function useCountUp(target, duration = 1600, active = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!active) return;

    if (reducedMotion) {
      setCount(target);
      return;
    }

    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, duration, reducedMotion]);

  return count;
}
