import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoMarquee from './components/LogoMarquee';
import Footer from './components/Footer';

// Below-the-fold sections are split into their own chunks and loaded on demand —
// shrinks the initial JS payload meaningfully (framer-motion pulls a lot in).
const AIAgents = lazy(() => import('./components/AIAgents'));
const Showcase = lazy(() => import('./components/Showcase'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const Stats = lazy(() => import('./components/Stats'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const CTA = lazy(() => import('./components/CTA'));

// Reserved-height placeholder prevents layout shift while a chunk loads.
const Placeholder = ({ h = 'min-h-[60vh]' }) => (
  <div className={`${h} grid place-items-center`}>
    <div className="w-6 h-6 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
  </div>
);

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="relative">
        <Hero />
        <LogoMarquee />
        <Suspense fallback={<Placeholder />}>
          <AIAgents />
          <Showcase />
          <HowItWorks />
          <Stats />
          <Testimonials />
          <CTA />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
