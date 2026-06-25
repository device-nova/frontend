/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: 'var(--bg-void)',
        surface: 'var(--bg-surface)',
        'surface-raised': 'var(--bg-surface-raised)',
        primary: 'var(--fg-primary)',
        muted: 'var(--fg-muted)',
        border: {
          DEFAULT: 'var(--border-default)',
          hover: 'var(--border-hover)',
        },
        cyan: {
          DEFAULT: 'var(--accent-cyan)',
          deep: 'var(--accent-cyan-deep)',
        },
        amber: {
          DEFAULT: 'var(--accent-amber)',
          deep: 'var(--accent-amber-deep)',
        },
        teal: '#007799',
        success: 'var(--success)',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-hero-highlight': 'var(--gradient-hero-highlight)',
        'gradient-hero-glass': 'var(--gradient-hero-glass)',
        'gradient-hero-overlay': 'var(--gradient-hero-overlay)',
      },
      boxShadow: {
        'glow-cyan': 'var(--shadow-glow-cyan)',
        'glow-amber': 'var(--shadow-glow-amber)',
        elevation: 'var(--shadow-elevation)',
      },
      borderRadius: {
        card: '1rem',
      },
      maxWidth: {
        '7xl': '80rem',
      },
      fontSize: {
        '5xl': ['3rem', { lineHeight: '0.95' }],
        '6xl': ['3.75rem', { lineHeight: '0.95' }],
        '7xl': ['4.5rem', { lineHeight: '0.95' }],
        '8xl': ['6rem', { lineHeight: '0.95' }],
      },
      letterSpacing: {
        widest2: '0.15em',
        widest3: '0.2em',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.06)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        dashFlow: {
          to: { strokeDashoffset: -24 },
        },
      },
      animation: {
        'radar-sweep': 'radarSweep 2.4s linear infinite',
        'pulse-glow': 'pulseGlow 2.6s ease-in-out infinite',
        'float-y': 'floatY 4s ease-in-out infinite',
        'dash-flow': 'dashFlow 1.2s linear infinite',
      },
    },
  },
  plugins: [],
};
