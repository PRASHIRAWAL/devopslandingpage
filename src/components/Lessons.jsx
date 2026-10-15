import Section from './Section.jsx';
import { lessons } from '../data.js';

export default function Lessons() {
  return (
    <Section id="lessons" eyebrow="Reflection" title="Lessons learned" tone="tint">
      <div className="grid grid--3">
        {lessons.map((l) => (
          <article key={l.title} className="card lesson">
            <h3>{l.title}</h3>
            <p>{l.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
