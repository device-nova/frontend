import Hero from '../components/hero/Hero.jsx';
import PainPoints from '../components/sections/PainPoints.jsx';
import HowItWorks from '../components/sections/HowItWorks.jsx';
import PlatformFeatures from '../components/sections/PlatformFeatures.jsx';
import DashboardPreview from '../components/sections/DashboardPreview.jsx';
import IndustriesServed from '../components/sections/IndustriesServed.jsx';
import Architecture from '../components/sections/Architecture.jsx';
import Testimonials from '../components/sections/Testimonials.jsx';
import Pricing from '../components/sections/Pricing.jsx';
import FAQ from '../components/sections/FAQ.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';

export default function Home() {
  return (
    <div>
      <Hero />
      <PainPoints />
      <HowItWorks />
      <PlatformFeatures />
      <DashboardPreview />
      <IndustriesServed />
      <Architecture />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
