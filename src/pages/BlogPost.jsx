import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Calendar, Clock, Share2, X,
  Link2, FileQuestion, Quote as QuoteIcon, AlertTriangle, Sparkles,
} from 'lucide-react';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import { getPost, getAdjacentPosts, getRelatedPosts } from '../data/blogPosts.js';

/* ─────────────────────────────────────────────────────────
   CONTENT BLOCK RENDERER
   Each article body is an ordered array of typed blocks.
   Rendering each type distinctly (rather than one undifferentiated
   text blob) is what gives long-form content actual visual rhythm
   and scanability.
───────────────────────────────────────────────────────── */
function ContentBlock({ block, index }) {
  const reveal = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, delay: Math.min(index * 0.02, 0.2), ease: 'easeOut' },
  };

  switch (block.type) {
    case 'h2':
      return (
        <motion.h2 {...reveal} className="font-display text-2xl md:text-3xl font-semibold text-primary mt-14 mb-5 scroll-mt-28">
          {block.text}
        </motion.h2>
      );
    case 'h3':
      return (
        <motion.h3 {...reveal} className="font-display text-xl font-semibold text-primary mt-10 mb-4">
          {block.text}
        </motion.h3>
      );
    case 'p':
      return (
        <motion.p {...reveal} className="text-base md:text-[1.05rem] text-muted leading-[1.8] mb-6">
          {block.text}
        </motion.p>
      );
    case 'list':
      return (
        <motion.ul {...reveal} className="flex flex-col gap-3 mb-7 ml-1">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-base text-muted leading-relaxed">
              <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-cyan flex-shrink-0" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </motion.ul>
      );
    case 'callout': {
      const isAmber = block.tone === 'amber';
      return (
        <motion.div
          {...reveal}
          className={`my-8 rounded-2xl border p-5 md:p-6 backdrop-blur-sm flex gap-4 ${
            isAmber ? 'border-amber/25 bg-amber/5' : 'border-cyan/20 bg-cyan/5'
          }`}
        >
          <div className={`h-9 w-9 rounded-lg flex items-center justify-center border flex-shrink-0 ${
            isAmber ? 'bg-amber/10 border-amber/25' : 'bg-cyan/10 border-cyan/25'
          }`}>
            {isAmber
              ? <AlertTriangle size={16} className="text-amber" aria-hidden="true" />
              : <Sparkles size={16} className="text-cyan" aria-hidden="true" />}
          </div>
          <div>
            <p className={`font-mono text-[0.65rem] tracking-widest2 uppercase mb-2 ${isAmber ? 'text-amber' : 'text-cyan'}`}>
              {block.title}
            </p>
            <p className="text-sm text-muted leading-relaxed">{block.text}</p>
          </div>
        </motion.div>
      );
    }
    case 'quote':
      return (
        <motion.figure {...reveal} className="my-9 pl-6 border-l-2 border-cyan/40 relative">
          <QuoteIcon size={20} className="text-cyan/30 absolute -left-1 -top-1" aria-hidden="true" />
          <blockquote className="font-display text-lg md:text-xl text-primary leading-snug italic">
            “{block.text}”
          </blockquote>
          {block.attribution && (
            <figcaption className="mt-3 font-mono text-xs text-muted tracking-wide">
              — {block.attribution}
            </figcaption>
          )}
        </motion.figure>
      );
    case 'stat-row':
      return (
        <motion.div {...reveal} className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-9">
          {block.items.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-surface-raised p-5 text-center">
              <p className="font-display text-2xl md:text-3xl font-bold text-cyan tabular-nums mb-1">{stat.value}</p>
              <p className="font-mono text-[0.65rem] text-muted uppercase tracking-widest2 leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      );
    default:
      return null;
  }
}

/* ─────────────────────────────────────────────────────────
   SHARE ROW
───────────────────────────────────────────────────────── */
function ShareRow({ title }) {
  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
    }
  };
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[0.65rem] text-muted uppercase tracking-widest2">Share</span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
        target="_blank" rel="noreferrer noopener"
        aria-label="Share on LinkedIn"
        className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted hover:text-cyan hover:border-hover transition-colors duration-300"
      >
        <Share2 size={14} aria-hidden="true" />
      </a>
      <a
        href={`https://x.com/intent/tweet?text=${encodeURIComponent(title)}`}
        target="_blank" rel="noreferrer noopener"
        aria-label="Share on X"
        className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted hover:text-cyan hover:border-hover transition-colors duration-300"
      >
        <X size={14} aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted hover:text-cyan hover:border-hover transition-colors duration-300"
      >
        <Link2 size={14} aria-hidden="true" />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   TABLE OF CONTENTS (derived from h2 blocks)
───────────────────────────────────────────────────────── */
function TableOfContents({ body }) {
  const headings = body
    .map((b, i) => ({ ...b, i }))
    .filter((b) => b.type === 'h2');
  if (headings.length === 0) return null;

  const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <nav aria-label="Table of contents" className="hidden lg:block">
      <p className="font-mono text-[0.65rem] text-muted uppercase tracking-widest2 mb-4">On this page</p>
      <ul className="flex flex-col gap-2.5 border-l border-border pl-4">
        {headings.map((h) => (
          <li key={h.i}>
            <a
              href={`#${slugify(h.text)}`}
              className="text-sm text-muted hover:text-cyan transition-colors duration-300 leading-snug block"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────── */
export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [slug]);

  if (!post) {
    return (
      <div className="container-base pt-40 pb-32 min-h-[60vh] text-center">
        <div className="h-16 w-16 rounded-2xl bg-cyan/10 border border-cyan/25 flex items-center justify-center mx-auto mb-8">
          <FileQuestion size={28} className="text-cyan" aria-hidden="true" />
        </div>
        <h1 className="font-display text-3xl font-semibold mb-4">Post not found</h1>
        <p className="text-muted mb-8">This article may have moved or been retired.</p>
        <Button as={Link} to="/blog" variant="secondary" size="md">Back to blog</Button>
      </div>
    );
  }

  const { prev, next } = getAdjacentPosts(slug);
  const related = getRelatedPosts(slug, post.category, 2);

  // Add anchor ids to h2 blocks matching the TOC slugify logic
  const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <article className="pb-32">
      {/* ── Hero / banner ── */}
      <header className="relative bg-surface border-b border-border overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--accent-cyan) 1px, transparent 1px), linear-gradient(to bottom, var(--accent-cyan) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />
        <div className="container-base relative max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-cyan transition-colors duration-300 mb-8 focus-visible:ring-2 focus-visible:ring-cyan rounded-sm"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <Badge tone="cyan">{post.category}</Badge>
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="font-mono text-[0.65rem] text-muted/70 tracking-wide">#{tag}</span>
              ))}
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-primary leading-[1.15] mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-muted leading-relaxed mb-8 max-w-2xl">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-cyan/10 border border-cyan/25 flex items-center justify-center font-display text-sm font-semibold text-cyan flex-shrink-0">
                  {post.author.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-primary leading-tight">{post.author.name}</p>
                  <p className="text-xs text-muted leading-tight">{post.author.role}</p>
                </div>
              </div>
              <span className="hidden sm:inline text-border">·</span>
              <span className="flex items-center gap-1.5 text-xs text-muted font-mono">
                <Calendar size={12} aria-hidden="true" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted font-mono">
                <Clock size={12} aria-hidden="true" /> {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── Body + sidebar ── */}
      <div className="container-base pt-12 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12 max-w-5xl mx-auto">
          <div className="max-w-2xl">
            {post.body.map((block, i) => {
              if (block.type === 'h2') {
                return (
                  <div key={i} id={slugify(block.text)}>
                    <ContentBlock block={block} index={i} />
                  </div>
                );
              }
              return <ContentBlock key={i} block={block} index={i} />;
            })}

            <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[0.65rem] text-muted bg-surface-raised border border-border rounded-md px-2.5 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <ShareRow title={post.title} />
            </div>
          </div>

          <aside className="order-first lg:order-last">
            <div className="sticky top-28">
              <TableOfContents body={post.body} />
            </div>
          </aside>
        </div>
      </div>

      {/* ── Prev / next navigation ── */}
      {(prev || next) && (
        <div className="container-base mt-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-10">
            {prev ? (
              <Link
                to={`/blog/${prev.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface-raised p-5 transition-all duration-300 hover:-translate-y-1 hover:border-hover hover:shadow-glow-cyan"
              >
                <span className="flex items-center gap-1.5 font-mono text-[0.65rem] text-muted uppercase tracking-widest2">
                  <ArrowLeft size={12} aria-hidden="true" /> Previous
                </span>
                <span className="font-display text-sm font-medium text-primary group-hover:text-cyan transition-colors duration-300 line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            ) : <div />}
            {next ? (
              <Link
                to={`/blog/${next.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface-raised p-5 text-right transition-all duration-300 hover:-translate-y-1 hover:border-hover hover:shadow-glow-cyan sm:items-end"
              >
                <span className="flex items-center gap-1.5 font-mono text-[0.65rem] text-muted uppercase tracking-widest2">
                  Next <ArrowRight size={12} aria-hidden="true" />
                </span>
                <span className="font-display text-sm font-medium text-primary group-hover:text-cyan transition-colors duration-300 line-clamp-2">
                  {next.title}
                </span>
              </Link>
            ) : <div />}
          </div>
        </div>
      )}

      {/* ── Related articles ── */}
      {related.length > 0 && (
        <div className="container-base mt-16 max-w-5xl mx-auto">
          <p className="font-mono text-[0.65rem] text-cyan uppercase tracking-widest2 mb-5">Related reading</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/blog/${r.slug}`}
                className="group block rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-hover hover:shadow-glow-cyan"
              >
                <Badge tone="cyan" className="mb-3">{r.category}</Badge>
                <p className="font-display text-base font-semibold text-primary group-hover:text-cyan transition-colors duration-300 leading-snug mb-2">
                  {r.title}
                </p>
                <p className="text-xs text-muted line-clamp-2 leading-relaxed">{r.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Closing CTA ── */}
      <div className="container-base mt-16 max-w-3xl mx-auto text-center">
        <div className="rounded-2xl border border-cyan/20 bg-cyan/5 p-8 md:p-10">
          <h2 className="font-display text-xl md:text-2xl font-semibold text-primary mb-3">
            See how this applies to your fleet
          </h2>
          <p className="text-muted mb-6 max-w-md mx-auto">
            Talk to our engineering team about a pilot deployment scoped to your existing hardware.
          </p>
          <Button as={Link} to="/contact" variant="primary" size="md">
            Request a demo
          </Button>
        </div>
      </div>
    </article>
  );
}
