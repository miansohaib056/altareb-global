import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoMarquee from './components/LogoMarquee';
import AIAgents from './components/AIAgents';
import Showcase from './components/Showcase';
import HowItWorks from './components/HowItWorks';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="relative">
        <Hero />
        <LogoMarquee />
        <AIAgents />
        <Showcase />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
