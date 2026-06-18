import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * When navigating to "/#sectionId" from a routed page (e.g. clicking a
 * nav link while on /about), React Router mounts Home but does not
 * automatically scroll to the hash target. This effect handles that
 * on every location change.
 */
export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Wait a tick for the target section to be present in the DOM.
      const id = location.hash.replace('#', '');
      const attemptScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      };
      const timeout = setTimeout(attemptScroll, 80);
      return () => clearTimeout(timeout);
    } else if (location.pathname !== '/') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location]);

  return null;
}
