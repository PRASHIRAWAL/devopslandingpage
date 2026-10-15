import Section from './Section.jsx';
import { results } from '../data.js';

export default function Results() {
  return (
    <Section
      id="results"
      eyebrow="Verified results"
      title="Implementation results"
      intro="Outcomes recorded from the successful Jenkins run and the deployed environment."
    >
      <ul className="grid grid--3">
        {results.map((r) => (
          <li key={r.title} className="card result">
            <span className="result__check" aria-hidden="true">✓</span>
            <p className="result__value">{r.value}</p>
            <h3>{r.title}</h3>
            <p>{r.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
