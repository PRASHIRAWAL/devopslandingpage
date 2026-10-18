import Section from './Section.jsx';
import Icon from './Icon.jsx';
import { objectives, problem } from '../data.js';

export default function Overview() {
  return (
    <Section
      id="overview"
      eyebrow="Overview"
      title="One app, one pipeline, every change verified"
      intro="The product is a sponsorship tracker for college events. The project is everything around it: version control, CI, testing, containers, a registry, deployment and configuration management."
    >
      <div className="overview">
        <div className="overview__problem card card--glow" data-reveal>
          <h3>{problem.title}</h3>
          <p>{problem.text}</p>
          <ul className="ticks">
            {problem.points.map((p) => (
              <li key={p}><Icon name="check" size={16} />{p}</li>
            ))}
          </ul>
        </div>
        <div className="grid grid--3 overview__goals">
          {objectives.map((o, i) => (
            <article key={o.title} className="card objective" data-reveal style={{ '--delay': `${i * 70}ms` }}>
              <span className="icon-tile"><Icon name={o.icon} /></span>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
