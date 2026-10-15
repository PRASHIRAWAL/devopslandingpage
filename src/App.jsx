import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Overview from './components/Overview.jsx';
import Architecture from './components/Architecture.jsx';
import TechStack from './components/TechStack.jsx';
import Pipeline from './components/Pipeline.jsx';
import Results from './components/Results.jsx';
import Features from './components/Features.jsx';
import Timeline from './components/Timeline.jsx';
import Lessons from './components/Lessons.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Header />
      <main id="main" tabIndex="-1">
        <Hero />
        <Overview />
        <Architecture />
        <TechStack />
        <Pipeline />
        <Results />
        <Features />
        <Timeline />
        <Lessons />
      </main>
      <Footer />
    </>
  );
}
