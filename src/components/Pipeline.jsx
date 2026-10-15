import Section from './Section.jsx';
import { pipelineStages } from '../data.js';

export default function Pipeline() {
  return (
    <Section
      id="pipeline"
      eyebrow="CI/CD workflow"
      title="Nine stages from commit to verified deployment"
      intro="A failure at any stage stops the pipeline, so only code that compiles, passes every test and comes up healthy is ever deployed."
      tone="dark"
    >
      <ol className="pipeline">
        {pipelineStages.map((s, i) => (
          <li key={s.name} className="stage">
            <span className="stage__num" aria-hidden="true">{i + 1}</span>
            <div>
              <h3><span className="sr-only">Stage {i + 1}: </span>{s.name}</h3>
              <p className="stage__tool">{s.tool}</p>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
