import { Link } from 'react-router-dom';
import { Globe, MessageSquare, Rss } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import Badge from '../ui/Badge.jsx';
import { FOOTER_LINKS } from '../../constants/navigation.js';

const COLUMN_TITLES = {
  product: 'Product',
  company: 'Company',
  legal: 'Legal',
  resources: 'Resources',
};

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="font-mono text-xs tracking-widest2 uppercase text-muted mb-5">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.href}
              className="text-sm text-muted hover:text-cyan transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan rounded-sm inline-flex items-center gap-2"
            >
              {link.label}
              {link.badge && <Badge tone="neutral" className="text-[0.6rem] py-0.5 px-2">{link.badge}</Badge>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container-base py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted leading-relaxed max-w-xs">
              Edge AI device intelligence for industrial operations. Real-time inference, on the device, at the source.
            </p>
            {/* TODO-ASSET: swap these generic icons for official brand marks
                (LinkedIn, X/Twitter, GitHub) once social profiles are live —
                lucide-react no longer ships trademarked logo icons. */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://linkedin.com"
                aria-label="Device-Nova on LinkedIn"
                className="text-muted hover:text-cyan transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan rounded-sm"
              >
                <Globe size={18} aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Device-Nova on X (Twitter)"
                className="text-muted hover:text-cyan transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan rounded-sm"
              >
                <MessageSquare size={18} aria-hidden="true" />
              </a>
              <a
                href="https://github.com"
                aria-label="Device-Nova on GitHub"
                className="text-muted hover:text-cyan transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan rounded-sm"
              >
                <Rss size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([key, links]) => (
            <FooterColumn key={key} title={COLUMN_TITLES[key]} links={links} />
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted tracking-wide">
            &copy; {new Date().getFullYear()} Device-Nova, Inc. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted tracking-wide">
            Edge AI Device Intelligence Platform
          </p>
        </div>
      </div>
    </footer>
  );
}
