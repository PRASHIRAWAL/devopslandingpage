import { useState } from 'react';
import Section from './Section.jsx';
import { builds, jenkinsShots } from '../data.js';
import { useInView } from '../hooks.js';

// Chart scale: 7 min 30 s, so the gridlines fall on round 2:30 steps.
const max = 450;
const fmt = (s) => (s === 0 ? 'did not start' : `${Math.floor(s / 60)} min ${s % 60} s`);
const passed = builds.filter((b) => b.result === 'SUCCESS').length;
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
const axis = [1, 2 / 3, 1 / 3, 0].map((f) => (f === 0 ? '0' : mmss(max * f)));

export default function Builds() {
  const [selected, setSelected] = useState(builds.length - 1);
  const [ref, inView] = useInView({ threshold: 0.3 });
  const b = builds[selected];

  return (
    <Section
      id="builds"
      eyebrow="Build history"
      title="Every red build was caught, explained and fixed"
      intro={`The last ${builds.length} builds Jenkins keeps: ${passed} green and ${builds.length - passed} red. Bar height is the run time; choose a bar to see what happened.`}
    >
      <div className="builds" data-reveal>
        <div className={`chart ${inView ? 'is-in' : ''}`} ref={ref}>
          <div className="chart__axis" aria-hidden="true">
            {axis.map((a) => <span key={a}>{a}</span>)}
          </div>
          <div className="chart__bars" role="group" aria-label="Jenkins builds">
            {builds.map((build, i) => (
              <button
                key={build.n}
                type="button"
                className={`bar bar--${build.result.toLowerCase()} ${i === selected ? 'is-selected' : ''}`}
                style={{ '--h': `${Math.max(3, (build.seconds / max) * 100)}%`, '--i': i }}
                onMouseEnter={() => setSelected(i)}
                onFocus={() => setSelected(i)}
                onClick={() => setSelected(i)}
                aria-pressed={i === selected}
                aria-label={`Build #${build.n}, ${build.result.toLowerCase()}, ${fmt(build.seconds)}`}
              >
                <span className="bar__fill" />
                <span className="bar__n">#{build.n}</span>
              </button>
            ))}
          </div>
        </div>
        <aside className={`build-card build-card--${b.result.toLowerCase()}`} aria-live="polite">
          <p className="build-card__result">{b.result}</p>
          <h3>Build #{b.n}</h3>
          <dl>
            <div><dt>Started</dt><dd>{b.date}</dd></div>
            <div><dt>Duration</dt><dd>{fmt(b.seconds)}</dd></div>
          </dl>
          <p>{b.note}</p>
        </aside>
      </div>

      <div className="grid grid--3 shots">
        {jenkinsShots.map((s, i) => (
          <figure key={s.title} className="shot" data-reveal style={{ '--delay': `${i * 90}ms` }}>
            <a href={s.src} target="_blank" rel="noopener noreferrer" className="shot__frame">
              <img src={s.src} alt={`Jenkins ${s.title.toLowerCase()} screenshot`} loading="lazy" width="1422" height="848" />
            </a>
            <figcaption><strong>{s.title}</strong> {s.text}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
