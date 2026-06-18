import PageHeader from '../components/ui/PageHeader.jsx';
import Badge from '../components/ui/Badge.jsx';

// TODO-ASSET: replace with real CMS-backed blog posts once content is ready.
const POSTS = [
  {
    title: 'Why inference latency matters more than model accuracy on the factory floor',
    category: 'Engineering',
    date: 'May 2026',
    excerpt:
      'A millisecond-level breakdown of where round-trip cloud inference loses to local processing in predictive maintenance scenarios.',
  },
  {
    title: 'Mapping legacy Modbus and OPC-UA fleets for edge AI readiness',
    category: 'Integration',
    date: 'April 2026',
    excerpt:
      'A practical checklist for automation teams evaluating which devices in an existing fleet are ready for edge inference today.',
  },
  {
    title: 'Digital twins without the cloud round trip',
    category: 'Architecture',
    date: 'March 2026',
    excerpt:
      'How distributed AI at the device layer changes the economics and latency profile of digital twin simulations.',
  },
];

export default function Blog() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes from the edge"
        description="Engineering write-ups and field notes from deploying AI inference on industrial hardware."
      />
      <section className="container-base pb-32 max-w-3xl space-y-6">
        {POSTS.map((post) => (
          <article
            key={post.title}
            className="bg-surface border border-border rounded-2xl p-8 transition-all duration-300 hover:border-hover hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <Badge tone="cyan">{post.category}</Badge>
              <span className="font-mono text-xs text-muted">{post.date}</span>
            </div>
            <h2 className="font-display text-xl font-semibold mb-3">{post.title}</h2>
            <p className="text-muted leading-relaxed">{post.excerpt}</p>
          </article>
        ))}
      </section>
    </>
  );
}
