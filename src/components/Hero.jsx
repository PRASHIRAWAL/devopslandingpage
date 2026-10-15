import { heroStats, REPO_URL } from '../data.js';

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="badge"><span className="dot" aria-hidden="true" /> Build #12 · All checks passing</p>
          <h1 id="hero-title">
            Containerized Event Sponsorship Tracker
            <span className="hero__accent"> — an end-to-end DevOps pipeline</span>
          </h1>
          <p className="hero__lead">
            A Spring Boot web application for managing events, sponsors and sponsorship payments,
            delivered through a fully automated pipeline: Git, Jenkins, Maven, Selenium, Docker,
            Docker Hub, Nginx and Ansible.
          </p>
          <div className="hero__actions">
            <a className="btn" href="#pipeline">Explore the pipeline</a>
            <a className="btn btn--ghost" href={REPO_URL} target="_blank" rel="noopener noreferrer">
              View source code<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <ul className="hero__stats" aria-label="Key results">
          {heroStats.map((s) => (
            <li key={s.label} className="stat">
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
