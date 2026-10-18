import { tools } from '../data.js';

// Endless strip of the toolchain; the list is rendered twice so the loop is seamless.
export default function Marquee() {
  return (
    <div className="marquee" aria-label="Toolchain">
      <ul className="marquee__track">
        {[...tools, ...tools].map((t, i) => (
          <li key={`${t}-${i}`} aria-hidden={i >= tools.length ? 'true' : undefined}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
