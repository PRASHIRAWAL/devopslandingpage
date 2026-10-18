import { useRef, useState } from 'react';
import Section from './Section.jsx';
import Icon from './Icon.jsx';
import { screens } from '../data.js';

export default function AppShowcase() {
  const [current, setCurrent] = useState(0);
  const [dark, setDark] = useState(false);
  const tabRefs = useRef([]);
  const screen = screens[current];
  const src = dark && screen.dark ? screen.dark : screen.src;

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (current + step + screens.length) % screens.length;
    setCurrent(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section
      id="app"
      eyebrow="The application"
      title="What the pipeline delivers"
      intro="Real screenshots of the v2 build (Spring Boot 3.3, Thymeleaf, Spring Security), captured from the dev profile with its built-in demo data."
    >
      <div className="showcase" data-reveal>
        <div className="showcase__tabs" role="tablist" aria-label="Application screens" onKeyDown={onKeyDown}>
          {screens.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={`screen-tab-${s.id}`}
              aria-selected={i === current}
              aria-controls="screen-panel"
              tabIndex={i === current ? 0 : -1}
              className={i === current ? 'is-current' : undefined}
              onClick={() => setCurrent(i)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="browser" role="tabpanel" id="screen-panel" aria-labelledby={`screen-tab-${screen.id}`}>
          <div className="browser__bar">
            <span className="run__dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="browser__url"><Icon name="lock" size={12} /> localhost{screen.path}</span>
            {screen.dark && (
              <button type="button" className="browser__theme" onClick={() => setDark((d) => !d)} aria-pressed={dark}>
                <Icon name={dark ? 'sun' : 'moon'} size={14} /> {dark ? 'Light' : 'Dark'} mode
              </button>
            )}
          </div>
          <div className="browser__view">
            <img key={src} src={src} alt={`${screen.label} screen of the Event Sponsorship Tracker`} width="1422" height="948" />
          </div>
        </div>
        <p className="showcase__caption" aria-live="polite"><strong>{screen.label}.</strong> {screen.text}</p>
      </div>
    </Section>
  );
}
