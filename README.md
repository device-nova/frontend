# Device-Nova — Edge AI Device Intelligence Platform

Marketing + product website for Device-Nova, an Edge AI Device Intelligence Platform
for Industrial IoT. Built with React 18 + Vite, Tailwind CSS, Framer Motion, and
GSAP + ScrollTrigger.

## Setup

```bash
npm install
npm run dev      # local dev server
npm run build     # production build -> /dist
```

## Status: in progress

This is a work-in-progress build, delivered in stages per the agreed build order.
**Completed so far:**

1. **Project scaffold** — Vite + React, Tailwind CSS 3 with a fully custom theme
   (no default Tailwind palette in use), all design tokens as CSS custom
   properties in `src/styles/tokens.css`, consumed via `tailwind.config.js`.
2. **ThemeContext** (`src/context/ThemeContext.jsx`) — dark/light toggle,
   persisted to `localStorage`, defaults to OS preference on first visit,
   no flash-of-wrong-theme (inline script in `index.html` sets the
   `data-theme` attribute before first paint).
3. **Routing shell** — `Layout`, `Navbar` (with scroll-spy + smooth-scroll
   anchor links for the one-page sections), `Footer` (routed links to the
   pages below), all routed pages as working stubs (`About`, `Careers`,
   `Contact`, `Docs` — Coming Soon, `Privacy`, `Terms`, `Blog`), a themed
   404 page ("lost signal"), and `public/.htaccess` for SPA rewrites on
   Apache hosting.
4. **Loading screen** — first-load-only (gated by `sessionStorage`), radar
   sweep animation, progress bar with cycling status text, reduced-motion
   static fallback.
5. **Hero section** — fully functional GSAP ScrollTrigger scroll-scrubbed
   canvas frame sequence (`src/hooks/useScrollFrameSequence.js`), pinned
   250vh stage, bidirectional scrubbing verified via direct logic trace,
   text fade/translate tied to scroll progress, vertical scroll-progress
   indicator, "Powered by NVIDIA SDK" badge reveal, bottom gradient overlay,
   and a static (non-scrubbing) fallback when `prefers-reduced-motion` is set.

**Not yet built** (remaining landing sections, per spec):
Industrial Pain Points, How Edge AI Works (diagram), Platform Features grid,
Dashboard Preview, Industries Served, Architecture/Pipeline, Testimonials,
Pricing, FAQ, Final CTA — plus the final responsive/accessibility pass
across the whole site.

## Known environment constraint

This build was developed in a sandboxed container without access to a real
browser runtime (headless browser binaries could not be downloaded due to
network egress restrictions). All logic was verified via production build
success and direct tracing of the scroll-scrub math in Node — but a manual
check in an actual browser (`npm run dev`, scroll the hero up and down,
toggle the theme, resize to mobile) is recommended before shipping.

## Asset placeholders

Every spot expecting a real client asset (frame sequence images, logo,
testimonial photos, etc.) is marked with a `// TODO-ASSET:` comment so they
can be found and swapped in one pass. Search the codebase for `TODO-ASSET`
to find them all.
