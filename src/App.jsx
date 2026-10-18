import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Overview from './components/Overview.jsx';
import Architecture from './components/Architecture.jsx';
import Pipeline from './components/Pipeline.jsx';
import Builds from './components/Builds.jsx';
import Testing from './components/Testing.jsx';
import Delivery from './components/Delivery.jsx';
import AppShowcase from './components/AppShowcase.jsx';
import Features from './components/Features.jsx';
import Timeline from './components/Timeline.jsx';
import Lessons from './components/Lessons.jsx';
import Footer from './components/Footer.jsx';
import { useRevealAll } from './hooks.js';

export default function App() {
  useRevealAll();
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Header />
      <main id="main" tabIndex="-1">
        <Hero />
        <Marquee />
        <Overview />
        <Architecture />
        <Pipeline />
        <Builds />
        <Testing />
        <Delivery />
        <AppShowcase />
        <Features />
        <Timeline />
        <Lessons />
      </main>
      <Footer />
    </>
  );
}
