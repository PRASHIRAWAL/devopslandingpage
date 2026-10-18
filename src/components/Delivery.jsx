import { useEffect, useState } from 'react';
import Section from './Section.jsx';
import Icon from './Icon.jsx';
import { ansibleLog, imageTags, images, playbooks, runtime } from '../data.js';
import { prefersReducedMotion, useInView } from '../hooks.js';

function AnsibleTerminal() {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (prefersReducedMotion()) {
      setShown(ansibleLog.length);
      return undefined;
    }
    if (shown >= ansibleLog.length) return undefined;
    const id = setTimeout(() => setShown((s) => s + 1), ansibleLog[shown].t === 'cmd' ? 700 : 320);
    return () => clearTimeout(id);
  }, [inView, shown]);

  return (
    <div className="terminal terminal--tall" ref={ref} role="log" aria-label="Ansible deploy playbook output">
      <div className="terminal__head">
        <span className="run__dots" aria-hidden="true"><i /><i /><i /></span>
        <span>ubuntu-24.04 (WSL2) · ansible-core 2.16.3</span>
      </div>
      <pre className="terminal__body">
        {ansibleLog.slice(0, shown).map((l, i) => (
          <span key={i} className={`t-${l.t}`}>{l.text}</span>
        ))}
        <span className="t-caret" aria-hidden="true" />
      </pre>
    </div>
  );
}

export default function Delivery() {
  return (
    <Section
      id="delivery"
      eyebrow="Containers · registry · configuration"
      title="Immutable images, deployed the same way every time"
      intro="Jenkins packages the tested JAR into a Docker image, pushes it with the build number and latest, and runs it behind Nginx. Ansible prepares the server and can redeploy the same image idempotently."
      tone="dark"
    >
      <div className="grid grid--2 images">
        {images.map((img, i) => (
          <article key={img.repo} className="card image-card" data-reveal style={{ '--delay': `${i * 90}ms` }}>
            <div className="image-card__top">
              <span className="icon-tile"><Icon name="box" /></span>
              <div>
                <p className="image-card__role">{img.role}</p>
                <a href={img.url} target="_blank" rel="noopener noreferrer" className="image-card__repo">
                  {img.repo}<span className="sr-only"> on Docker Hub (opens in a new tab)</span>
                </a>
              </div>
              <span className="image-card__size">{img.size}</span>
            </div>
            <ul className="tags" aria-label="Tags">
              {imageTags.map((t) => <li key={t} className={t === '13' ? 'is-new' : undefined}>:{t}</li>)}
            </ul>
            <ul className="ticks">
              {img.details.map((d) => <li key={d}><Icon name="check" size={15} />{d}</li>)}
            </ul>
            <p className="image-card__digest">build #13 digest <code>{img.digest}…</code> · base {img.base}</p>
          </article>
        ))}
      </div>

      <div className="runtime" data-reveal>
        <h3>Running deployment</h3>
        <ul>
          {runtime.map((r) => (
            <li key={r.name}>
              <span className="pulse-dot" aria-hidden="true" />
              <code>{r.name}</code>
              <span className="runtime__port">:{r.port}</span>
              <span className="runtime__role">{r.role}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="ansible">
        <div className="ansible__books">
          {playbooks.map((p, i) => (
            <article key={p.file} className="card playbook" data-reveal style={{ '--delay': `${i * 90}ms` }}>
              <p className="playbook__file"><code>{p.file}</code></p>
              <h3>{p.title}</h3>
              <ul className="ticks">
                {p.items.map((it) => <li key={it}><Icon name="check" size={15} />{it}</li>)}
              </ul>
              <div className="recaps">
                {p.runs.map((r) => (
                  <div key={r.label} className={`recap ${/changed=0/.test(r.recap) ? 'recap--idle' : ''}`}>
                    <span>{r.label}</span><code>{r.recap}</code>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div data-reveal>
          <AnsibleTerminal />
          <p className="ansible__note">Second run, same image: <strong>changed=0</strong>. That is idempotency: the playbook describes the end state, not the steps.</p>
        </div>
      </div>
    </Section>
  );
}
