import Section from './Section.jsx';
import Icon from './Icon.jsx';
import { defectStory, e2eTests, unitTests } from '../data.js';
import { useCountUp, useInView } from '../hooks.js';

const unitTotal = unitTests.reduce((sum, g) => sum + g.items.reduce((s, [, n]) => s + n, 0), 0);
const e2eTotal = e2eTests.reduce((sum, t) => sum + t.count, 0);
const largest = Math.max(...unitTests.flatMap((g) => g.items.map(([, n]) => n)));

function Ring({ value, total, label, active }) {
  const n = useCountUp(value, active);
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="ring">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r={r} className="ring__track" />
        <circle cx="60" cy="60" r={r} className="ring__fill" strokeDasharray={c} strokeDashoffset={active ? 0 : c} />
      </svg>
      <div className="ring__text">
        <strong>{n}</strong>
        <span>{label}</span>
      </div>
      <p className="ring__sub">{value}/{total} passed</p>
    </div>
  );
}

export default function Testing() {
  const [ref, inView] = useInView({ threshold: 0.25 });
  return (
    <Section
      id="testing"
      eyebrow="Testing"
      title={`${unitTotal + e2eTotal} tests guard every deployment`}
      intro="Unit and integration tests run with MockMvc against in-memory H2, so the Jenkins agent needs no database. Selenium then starts the whole app on a random port and drives it in headless Chrome."
      tone="tint"
    >
      <div className={`tests ${inView ? 'is-in' : ''}`} ref={ref}>
        <div className="card tests__rings" data-reveal>
          <Ring value={unitTotal} total={unitTotal} label="unit & integration" active={inView} />
          <Ring value={e2eTotal} total={e2eTotal} label="Selenium E2E" active={inView} />
        </div>

        <div className="card tests__classes" data-reveal>
          <h3>Unit & integration tests by class</h3>
          {unitTests.map((g) => (
            <div key={g.group} className="tgroup">
              <p className="tgroup__name">{g.group}</p>
              <ul>
                {g.items.map(([name, n], i) => (
                  <li key={name} className="tbar" style={{ '--w': `${(n / largest) * 100}%`, '--i': i }}>
                    <span className="tbar__name">{name}</span>
                    <span className="tbar__track"><span className="tbar__fill" /></span>
                    <span className="tbar__n">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="card tests__e2e" data-reveal>
          <h3>Selenium flows in the browser</h3>
          <ul className="e2e">
            {e2eTests.map((t) => (
              <li key={t.name}>
                <span className="e2e__count">{t.count}</span>
                <div><code>{t.name}</code><p>{t.text}</p></div>
              </li>
            ))}
          </ul>
          <p className="tests__note">A shared base class signs in as admin, turns UI animations off and saves a screenshot to <code>target/e2e-screenshots/</code> whenever a test fails.</p>
        </div>

        <div className="card tests__story" data-reveal>
          <h3>Proving the pipeline catches failures</h3>
          <ol className="story">
            {defectStory.map((s) => (
              <li key={s.title} className={`story__step story__step--${s.tone}`}>
                <span className="story__icon"><Icon name={s.tone === 'ok' ? 'check' : 'x'} size={14} /></span>
                <div><p className="story__build">Build {s.build} · {s.title}</p><p>{s.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
