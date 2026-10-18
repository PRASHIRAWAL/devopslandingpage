import Section from './Section.jsx';
import { timeline } from '../data.js';

export default function Timeline() {
  return (
    <Section
      id="timeline"
      eyebrow="Timeline"
      title="Eighteen days, one layer of automation at a time"
      intro="From an empty repository on 1 October 2026 to a tested v2 release on main on 18 October."
    >
      <ol className="timeline">
        {timeline.map((t, i) => (
          <li key={t.title} className="timeline__item" data-reveal style={{ '--delay': `${i * 60}ms` }}>
            <p className="timeline__date">{t.date} 2026</p>
            <h3>{t.title}</h3>
            <p>{t.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
