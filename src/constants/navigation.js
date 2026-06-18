// Main nav links correspond to anchor sections on the one-page landing
// experience at "/". Clicking these does a smooth scroll, not a route change.
export const SECTION_LINKS = [
  { id: 'platform', label: 'Platform' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
];

export const SECTION_IDS = SECTION_LINKS.map((link) => link.id);

// Footer-only routed pages — real React Router routes with their own URLs.
export const FOOTER_LINKS = {
  product: [
    { label: 'Platform', href: '/#platform' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Docs', href: '/docs', badge: 'Coming Soon' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Developer API / Docs', href: '/docs', badge: 'Coming Soon' },
  ],
};
