import Section from './Section.jsx';
import { timeline } from '../data.js';

export default function Timeline() {
  return (
    <Section
      id="timeline"
      eyebrow="Timeline"
      title="How the project was built"
      intro="The work progressed in phases, each adding one layer of automation on top of the last."
    >
      <ol className="timeline">
        {timeline.map((t) => (
          <li key={t.title} className="timeline__item">
            <p className="timeline__phase">{t.phase}</p>
            <h3>{t.title}</h3>
            <p>{t.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
