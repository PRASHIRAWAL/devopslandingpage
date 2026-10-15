import Section from './Section.jsx';
import { objectives } from '../data.js';

export default function Overview() {
  return (
    <Section
      id="overview"
      eyebrow="Project overview"
      title="From sponsorship spreadsheets to a delivered product"
      intro="Colleges and organisers often track sponsors across spreadsheets and email threads. The Event Sponsorship Tracker centralises events, sponsors, sponsorship status and payments in one web application — and the DevOps work makes every change to it built, tested, containerised and verified automatically."
    >
      <div className="grid grid--3">
        {objectives.map((o, i) => (
          <article key={o.title} className="card">
            <span className="card__index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <h3>{o.title}</h3>
            <p>{o.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
