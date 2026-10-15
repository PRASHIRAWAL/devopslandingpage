import { useEffect, useState } from 'react';
import { navLinks, REPO_URL } from '../data.js';

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href="#top" aria-label="Event Sponsorship Tracker DevOps, back to top">
          <span className="brand__mark" aria-hidden="true">ES</span>
          <span className="brand__text">Sponsorship Tracker <span>DevOps</span></span>
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="nav-toggle__bar" aria-hidden="true" />
        </button>
        <nav id="primary-nav" className={`nav ${open ? 'nav--open' : ''}`} aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
              </li>
            ))}
            <li>
              <a className="btn btn--small" href={REPO_URL} target="_blank" rel="noopener noreferrer">
                GitHub<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
