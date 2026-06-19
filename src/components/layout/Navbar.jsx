import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo.jsx';
import DevNoButton from '../ui/DevNoButton.jsx';
import ThemeToggle from '../ui/ThemeToggle.jsx';
import { SECTION_LINKS, SECTION_IDS } from '../../constants/navigation.js';
import { useScrollSpy } from '../../hooks/useScrollSpy.js';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const activeId = useScrollSpy(isHome ? SECTION_IDS : []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  function handleSectionClick(e, id) {
    e.preventDefault();
    setMobileOpen(false);

    if (isHome) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${id}`);
      }
    } else {
      // Navigate home first, then scroll once the page has mounted.
      navigate(`/#${id}`);
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-void/80 backdrop-blur-xl border-b border-border' : 'bg-transparent'
      }`}
      style={scrolled ? undefined : { filter: 'drop-shadow(0 1px 8px rgba(0,0,0,0.6))' }}
    >
      <nav
        aria-label="Main navigation"
        className="container-base flex items-center justify-between h-20"
      >
        <button
          onClick={() => {
            if (isHome) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }
          }}
          className="flex items-center min-h-[44px] focus-visible:ring-2 focus-visible:ring-cyan rounded-md"
          aria-label="Device-Nova home"
        >
          <Logo />
        </button>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8 font-mono text-xs tracking-widest2 uppercase">
          {SECTION_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`/#${link.id}`}
                onClick={(e) => handleSectionClick(e, link.id)}
                className={`relative pb-1 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan rounded-sm ${
                  activeId === link.id ? 'text-cyan' : 'text-muted hover:text-primary'
                }`}
              >
                {link.label}
                {activeId === link.id && (
                  <motion.span
                    layoutId="navbar-active-underline"
                    className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-cyan"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <DevNoButton
            href="/#final-cta"
            onClick={(e) => handleSectionClick(e, 'final-cta')}
          />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-border text-primary focus-visible:ring-2 focus-visible:ring-cyan"
          >
            {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-border bg-void"
          >
            <ul className="container-base flex flex-col gap-1 py-6 font-mono text-sm tracking-widest2 uppercase">
              {SECTION_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`/#${link.id}`}
                    onClick={(e) => handleSectionClick(e, link.id)}
                    className={`block py-3.5 transition-colors duration-300 ${
                      activeId === link.id ? 'text-cyan' : 'text-muted'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <DevNoButton
                  href="/#final-cta"
                  onClick={(e) => handleSectionClick(e, 'final-cta')}
                  className="w-full justify-center"
                />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
