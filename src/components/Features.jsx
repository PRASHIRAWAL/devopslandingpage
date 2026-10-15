import Section from './Section.jsx';
import { features } from '../data.js';

// Stylised mock window standing in for an application screenshot.
function Placeholder({ screen }) {
  return (
    <div className={`mock mock--${screen}`} role="img" aria-label={`Illustrative placeholder for the ${screen} screen`}>
      <div className="mock__bar"><span /><span /><span /></div>
      <div className="mock__body">
        <div className="mock__tiles"><i /><i /><i /></div>
        <div className="mock__rows"><i /><i /><i /><i /></div>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <Section
      id="features"
      eyebrow="Application"
      title="What the application does"
      intro="The product delivered by the pipeline: a Spring Boot and Thymeleaf app for running event sponsorships. Images below are illustrative placeholders."
      tone="tint"
    >
      <div className="grid grid--2">
        {features.map((f) => (
          <article key={f.title} className="card feature">
            <Placeholder screen={f.screen} />
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
