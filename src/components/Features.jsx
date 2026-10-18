import Section from './Section.jsx';
import Icon from './Icon.jsx';
import { codeStats, features } from '../data.js';
import { useCountUp, useInView } from '../hooks.js';

function CodeStat({ value, label, sub, active }) {
  const n = useCountUp(value, active, 1600);
  return (
    <li className="codestat">
      <strong>{n.toLocaleString('en-IN')}</strong>
      <span>{label}</span>
      <small>{sub}</small>
    </li>
  );
}

export default function Features() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <Section
      id="features"
      eyebrow="v2 release"
      title="All 15 MVP functions, then a full v2"
      intro="The MVP covered events, sponsors, statuses, search, a dashboard, drill-down, alerts, validation and a health check. Version 2 turned it into a product people can actually run sponsorships on."
      tone="tint"
    >
      <div className="grid grid--4 features">
        {features.map((f, i) => (
          <article key={f.title} className="card feature" data-reveal style={{ '--delay': `${(i % 4) * 70}ms` }}>
            <span className="icon-tile"><Icon name={f.icon} /></span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </article>
        ))}
      </div>
      <ul className="codestats" ref={ref} aria-label="Codebase in numbers" data-reveal>
        {codeStats.map((c) => <CodeStat key={c.label} {...c} active={inView} />)}
      </ul>
    </Section>
  );
}
