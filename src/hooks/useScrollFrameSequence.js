import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// TODO-ASSET: replace this placeholder frame array with a real exported
// frame sequence (e.g. ffmpeg -i source.mp4 -vf fps=24 frame_%03d.jpg),
// hosted at a stable CDN path. When swapping, just update FRAME_COUNT
// to match the real sequence length — everything else (preload, scrub
// math, canvas draw) works unchanged.
export const FRAME_COUNT = 24;

export function buildFrameUrls(count = FRAME_COUNT) {
  return Array.from({ length: count }, (_, i) => `https://picsum.photos/1920/1080?random=${i + 1}`);
}

/**
 * Drives a <canvas> frame-by-frame from scroll position within a pinned
 * GSAP ScrollTrigger stage. Returns refs to attach to the wrapper/sticky/
 * canvas elements, plus loading + progress state for UI feedback.
 *
 * stageRef   -> the tall (250vh) wrapper, used as the ScrollTrigger trigger
 * canvasRef  -> the <canvas> element frames are drawn onto
 */
export function useScrollFrameSequence({ frameUrls, disabled = false }) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Preload every frame image before the scrub activates.
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;

    const images = frameUrls.map((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === frameUrls.length && !cancelled) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        // Even on a failed placeholder load, don't block the sequence forever.
        loadedCount += 1;
        if (loadedCount === frameUrls.length && !cancelled) {
          setImagesLoaded(true);
        }
      };
      return img;
    });

    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, [frameUrls]);

  function drawFrame(index) {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // Cover-fit the image into the canvas, cropping as needed.
    const canvasRatio = width / height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    } else {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  // Set up GSAP ScrollTrigger scrub once images are ready.
  useEffect(() => {
    if (disabled || !imagesLoaded) return;

    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress; // 0 -> 1, reversible both directions
          setScrollProgress(progress);
          const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(progress * (FRAME_COUNT - 1))
          );
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        },
      });

      // Draw the very first frame immediately so there's no blank canvas
      // before the user starts scrolling.
      drawFrame(0);
    }, stage);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      ctx.revert(); // kills ScrollTriggers created in this context
    };
  }, [imagesLoaded, disabled]);

  return { stageRef, canvasRef, imagesLoaded, scrollProgress };
}
