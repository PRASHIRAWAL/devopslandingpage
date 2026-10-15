import Section from './Section.jsx';
import { technologies } from '../data.js';

export default function TechStack() {
  return (
    <Section
      id="stack"
      eyebrow="Technology stack"
      title="Ten tools, one pipeline"
      intro="Each tool owns one clear responsibility in the path from source code to a running, monitored service."
    >
      <ul className="grid grid--tech">
        {technologies.map((t) => (
          <li key={t.name} className="card tech">
            <span className="tech__icon" aria-hidden="true">{t.abbr}</span>
            <div>
              <h3>{t.name}</h3>
              <p className="tech__role">{t.role}</p>
              <p>{t.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
