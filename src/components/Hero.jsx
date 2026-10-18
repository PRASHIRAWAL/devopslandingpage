import { useEffect, useState } from 'react';
import { heroStats, latestBuild, pipelineStages, REPO_URL } from '../data.js';
import { prefersReducedMotion, useCountUp, useInView } from '../hooks.js';
import Icon from './Icon.jsx';

function Stat({ value, label, active }) {
  const n = useCountUp(value, active);
  return (
    <li className="stat">
      <span className="stat__value">{n}</span>
      <span className="stat__label">{label}</span>
    </li>
  );
}

// Replays build #13 stage by stage, then holds on the final result before looping.
function LiveRun() {
  const total = pipelineStages.length;
  const [done, setDone] = useState(() => (prefersReducedMotion() ? total : 0));

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const delay = done < total ? 700 : 4200;
    const id = setTimeout(() => setDone((d) => (d < total ? d + 1 : 0)), delay);
    return () => clearTimeout(id);
  }, [done, total]);

  const finished = done === total;
  return (
    <div className="run" aria-label={`Jenkins build #${latestBuild.number}: all ${total} stages passed`}>
      <div className="run__head">
        <span className="run__dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="run__title">Event-Sponsorship-Tracker-CI · #{latestBuild.number}</span>
        <span className={`run__state ${finished ? 'run__state--ok' : ''}`}>
          {finished ? 'SUCCESS' : 'RUNNING'}
        </span>
      </div>
      <ol className="run__stages">
        {pipelineStages.map((s, i) => {
          const state = i < done ? 'ok' : i === done ? 'running' : 'waiting';
          return (
            <li key={s.name} className={`run__stage run__stage--${state}`}>
              <span className="run__icon" aria-hidden="true">
                {state === 'ok' ? <Icon name="check" size={14} /> : <span className="run__spinner" />}
              </span>
              <span className="run__name">{s.name}</span>
              <code className="run__cmd">{s.command}</code>
            </li>
          );
        })}
      </ol>
      <div className="run__foot">
        <span>{latestBuild.branch} @ <code>{latestBuild.commit}</code></span>
        <span className={finished ? 'run__deployed is-on' : 'run__deployed'}>Deployed build {latestBuild.number} ✓</span>
      </div>
      <div className="run__bar" aria-hidden="true"><span style={{ width: `${(done / total) * 100}%` }} /></div>
    </div>
  );
}

export default function Hero() {
  const [statsRef, statsInView] = useInView({ threshold: 0.3 });
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <span className="blob blob--a" /><span className="blob blob--b" /><span className="blob blob--c" />
        <span className="grid-lines" />
      </div>
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="badge">
            <span className="dot" aria-hidden="true" />
            Build #{latestBuild.number} · {latestBuild.tests} tests passing · v2 live on main
          </p>
          <h1 id="hero-title">
            Event Sponsorship Tracker
            <span className="hero__accent">from commit to container, fully automated</span>
          </h1>
          <p className="hero__lead">
            A Spring Boot app for events, sponsors, payments and funding targets, shipped by a Jenkins pipeline
            that compiles it, runs 142 unit and 14 browser tests, builds Docker images, publishes them to
            Docker Hub and deploys them behind Nginx. Ansible configures the server.
          </p>
          <div className="hero__actions">
            <a className="btn" href="#pipeline">Explore the pipeline <Icon name="arrow" size={16} /></a>
            <a className="btn btn--ghost" href="#app">See the app</a>
            <a className="btn btn--ghost" href={REPO_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="github" size={16} /> Source<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <LiveRun />
      </div>
      <div className="container">
        <ul className="hero__stats" aria-label="Key results" ref={statsRef}>
          {heroStats.map((s) => <Stat key={s.label} {...s} active={statsInView} />)}
        </ul>
      </div>
    </section>
  );
}
