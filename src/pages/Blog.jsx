import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader.jsx';
import Badge from '../components/ui/Badge.jsx';

// TODO-ASSET: replace with real CMS-backed blog posts once content is ready.
// TODO-CONTENT: individual linked articles do not yet exist — posts link
// to a generic placeholder route (/blog/:slug).

const POSTS = [
  {
    slug: 'latency-budgets-industrial-ai',
    title: 'Why inference latency matters more than model accuracy on the factory floor',
    category: 'Engineering',
    date: 'May 19, 2026',
    readTime: '8 min read',
    author: 'Maya Chen',
    excerpt:
      'A millisecond-level breakdown of where round-trip cloud inference loses to local processing in predictive maintenance scenarios. When a conveyor bearing is 2.3°C over baseline, you have roughly 400 ms to decide whether to trigger a stall — or let it run until catastrophic failure.',
  },
  {
    slug: 'legacy-modbus-opcua-edge-ai',
    title: 'Mapping legacy Modbus and OPC-UA fleets for edge AI readiness',
    category: 'Integration',
    date: 'April 28, 2026',
    readTime: '12 min read',
    author: 'David Okonkwo',
    excerpt:
      'A practical checklist for automation teams evaluating which devices in an existing fleet are ready for edge inference today. Most plants have a mix of protocols spanning three decades of hardware — here is how to prioritize without a forklift upgrade.',
  },
  {
    slug: 'digital-twins-without-cloud-round-trip',
    title: 'Digital twins without the cloud round trip',
    category: 'Architecture',
    date: 'March 14, 2026',
    readTime: '10 min read',
    author: 'Priya Nair',
    excerpt:
      'How distributed AI at the device layer changes the economics and latency profile of digital twin simulations. When the twin runs on the same hardware as the physical asset, the synchronization problem transforms from a network challenge to a local state-management problem.',
  },
  {
    slug: 'predictive-maintenance-models',
    title: 'Inside Device-Nova\'s predictive maintenance model pipeline',
    category: 'Engineering',
    date: 'February 8, 2026',
    readTime: '15 min read',
    author: 'Alex Voss',
    excerpt:
      'An end-to-end walkthrough of how sensor telemetry becomes a maintenance prediction: data ingestion, feature engineering at the edge, model quantization for ARM targets, and confidence calibration for production alerting. Includes benchmark comparisons against cloud-only baselines.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Blog() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes from the edge"
        description="Engineering write-ups and field notes from deploying AI inference on industrial hardware."
      />

      <section className="container-base pb-32">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {POSTS.map((post) => (
            <motion.div key={post.slug} variants={itemVariants} className="h-full">
              <Link
                to={`/blog/${post.slug}`}
                className="group block h-full bg-surface border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-hover hover:shadow-glow-cyan focus-visible:ring-2 focus-visible:ring-cyan rounded-2xl"
              >
                {/* TODO-ASSET: replace with real article cover images */}
                <div className="h-44 bg-gradient-to-br from-void via-surface-raised to-void flex items-center justify-center border-b border-border/40">
                  <div className="h-12 w-12 rounded-xl bg-cyan/5 border border-cyan/20 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      <line x1="8" y1="7" x2="16" y2="7" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge tone="cyan">{post.category}</Badge>
                    <span className="flex items-center gap-1 font-mono text-[0.6rem] text-muted/60">
                      <Clock size={11} aria-hidden="true" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-lg font-semibold text-primary mb-3 transition-colors duration-300 group-hover:text-cyan">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <div className="flex items-center gap-2 text-xs text-muted/70">
                      <Calendar size={12} aria-hidden="true" />
                      <span>{post.date}</span>
                      <span className="text-border/60">·</span>
                      <span>{post.author}</span>
                    </div>
                    <span className="text-cyan text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      Read <ArrowRight size={12} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
