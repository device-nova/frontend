import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative flex h-11 w-16 items-center rounded-full border border-border bg-surface-raised px-1 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan"
    >
      <span
        className={`absolute top-1.5 left-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-primary shadow-glow-cyan transition-transform duration-300 ${
          isDark ? 'translate-x-0' : 'translate-x-7'
        }`}
      >
        {isDark ? (
          <Moon size={14} className="text-void" aria-hidden="true" />
        ) : (
          <Sun size={14} className="text-void" aria-hidden="true" />
        )}
      </span>
      <span className="sr-only">Toggle color theme</span>
    </button>
  );
}
