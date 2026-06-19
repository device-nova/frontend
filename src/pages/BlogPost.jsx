import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import Button from '../components/ui/Button.jsx';

// TODO-CONTENT: placeholder individual blog post page — replace with
// full article rendering once the CMS or content pipeline is in place.

const POST_TITLES = {
  'latency-budgets-industrial-ai': 'Why inference latency matters more than model accuracy on the factory floor',
  'legacy-modbus-opcua-edge-ai': 'Mapping legacy Modbus and OPC-UA fleets for edge AI readiness',
  'digital-twins-without-cloud-round-trip': 'Digital twins without the cloud round trip',
  'predictive-maintenance-models': 'Inside Device-Nova\'s predictive maintenance model pipeline',
};

export default function BlogPost() {
  const { slug } = useParams();
  const title = POST_TITLES[slug] || 'Post not found';

  return (
    <div className="container-base pt-40 pb-32 min-h-[60vh]">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-cyan transition-colors duration-300 mb-10 focus-visible:ring-2 focus-visible:ring-cyan rounded-sm"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to blog
      </Link>

      <div className="max-w-2xl mx-auto text-center">
        <div className="h-16 w-16 rounded-2xl bg-cyan/10 border border-cyan/25 flex items-center justify-center mx-auto mb-8">
          <FileText size={28} className="text-cyan" aria-hidden="true" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">{title}</h1>
        <p className="text-muted text-lg mb-8 max-w-lg mx-auto">
          {/* TODO-CONTENT: full article content goes here */}
          This article is in draft. The full post will be published once our editorial pipeline
          is operational. In the meantime, explore our other content or get in touch with our
          engineering team.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button as={Link} to="/blog" variant="secondary" size="md">
            Back to blog
          </Button>
          <Button as={Link} to="/contact" variant="primary" size="md">
            Contact our team
          </Button>
        </div>
      </div>
    </div>
  );
}
