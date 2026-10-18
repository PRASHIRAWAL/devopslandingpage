import Section from './Section.jsx';
import { lessons } from '../data.js';

export default function Lessons() {
  return (
    <Section id="lessons" eyebrow="Reflection" title="Lessons learned" tone="dark">
      <div className="grid grid--3">
        {lessons.map((l, i) => (
          <article key={l.title} className="card lesson" data-reveal style={{ '--delay': `${(i % 3) * 80}ms` }}>
            <span className="lesson__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <h3>{l.title}</h3>
            <p>{l.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
