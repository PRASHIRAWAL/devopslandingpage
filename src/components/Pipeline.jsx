import { useEffect, useRef, useState } from 'react';
import Section from './Section.jsx';
import Icon from './Icon.jsx';
import { latestBuild, pipelineStages } from '../data.js';
import { prefersReducedMotion, useInView } from '../hooks.js';

const designPoints = [
  ['Parameterised', 'APP_PORT (8081), NGINX_PORT (80) and DEPLOY make the same pipeline usable for CI-only runs; 8040 and 3306 are refused.'],
  ['Secrets by name', 'withCredentials binds four Jenkins credentials; Docker receives -e NAME without values, so nothing leaks into logs.'],
  ['Fail fast', 'Stages run in order and stop at the first failure, so untested code can never reach Package, Docker or Deploy.'],
  ['Cross-platform', 'Runs on Windows or Linux agents: bat or sh is chosen automatically; the workspace is always cleaned.'],
];

// Reveals the terminal lines of the selected stage one after another.
function Terminal({ stage }) {
  const [shown, setShown] = useState(stage.log.length);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(stage.log.length);
      return undefined;
    }
    setShown(0);
    const ids = stage.log.map((_, i) => setTimeout(() => setShown(i + 1), 260 * (i + 1)));
    return () => ids.forEach(clearTimeout);
  }, [stage]);

  return (
    <div className="terminal" role="log" aria-label={`Console output for ${stage.name}`}>
      <div className="terminal__head">
        <span className="run__dots" aria-hidden="true"><i /><i /><i /></span>
        <span>console · build #{latestBuild.number}</span>
      </div>
      <pre className="terminal__body">
        <span className="t-cmd">$ {stage.command}</span>
        {stage.log.slice(0, shown).map((line) => (
          <span key={line} className={/SUCCESS|UP|Failures: 0|Deployed/.test(line) ? 't-ok' : 't-line'}>{line}</span>
        ))}
        <span className="t-caret" aria-hidden="true" />
      </pre>
    </div>
  );
}

export default function Pipeline() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [ref, inView] = useInView({ threshold: 0.35 });
  const tabRefs = useRef([]);
  const stage = pipelineStages[current];
  const total = pipelineStages.length;

  useEffect(() => {
    if (!playing || !inView || prefersReducedMotion()) return undefined;
    const id = setTimeout(() => setCurrent((c) => (c + 1) % total), 3800);
    return () => clearTimeout(id);
  }, [current, playing, inView, total]);

  const select = (i) => {
    setPlaying(false);
    setCurrent(i);
  };

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (current + step + total) % total;
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section
      id="pipeline"
      eyebrow="CI/CD pipeline"
      title="Eight stages from commit to verified deployment"
      intro={`The declarative Jenkinsfile below ran end to end in build #${latestBuild.number} (${latestBuild.duration}). Pick a stage to see what it runs and the real console output it produced.`}
      tone="dark"
    >
      <div className="pipe" ref={ref} data-reveal>
        <div className="pipe__track">
          <div className="pipe__rail">
          <div className="pipe__line" aria-hidden="true">
            <span style={{ width: `${(current / (total - 1)) * 100}%` }} />
          </div>
          <div className="pipe__steps" role="tablist" aria-label="Pipeline stages" onKeyDown={onKeyDown}>
            {pipelineStages.map((s, i) => (
              <button
                key={s.name}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`stage-tab-${i}`}
                aria-selected={i === current}
                aria-controls="stage-panel"
                tabIndex={i === current ? 0 : -1}
                className={`pipe__step ${i < current ? 'is-done' : ''} ${i === current ? 'is-current' : ''}`}
                onClick={() => select(i)}
              >
                <span className="pipe__dot">{i < current ? <Icon name="check" size={14} /> : i + 1}</span>
                <span className="pipe__label">{s.name}</span>
              </button>
            ))}
          </div>
          </div>
          <button type="button" className="pipe__play" onClick={() => setPlaying((p) => !p)} aria-pressed={playing}>
            <Icon name={playing ? 'pause' : 'play'} size={14} /> {playing ? 'Pause' : 'Auto-play'}
          </button>
        </div>

        <div className="pipe__panel" role="tabpanel" id="stage-panel" aria-labelledby={`stage-tab-${current}`}>
          <div className="pipe__info" key={stage.name}>
            <p className="pipe__count">Stage {current + 1} of {total}</p>
            <h3>{stage.name}</h3>
            <p className="pipe__tool">{stage.tool}</p>
            <p>{stage.text}</p>
            <code className="pipe__command">{stage.command}</code>
          </div>
          <Terminal stage={stage} />
        </div>

        <ul className="grid grid--4 pipe__points">
          {designPoints.map(([title, text]) => (
            <li key={title} className="mini"><strong>{title}</strong><span>{text}</span></li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
