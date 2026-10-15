// Shared wrapper giving every section a heading, an eyebrow label and a consistent layout.
export default function Section({ id, eyebrow, title, intro, tone = 'light', children }) {
  const headingId = `${id}-title`;
  return (
    <section id={id} className={`section section--${tone}`} aria-labelledby={headingId}>
      <div className="container">
        <header className="section__header">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 id={headingId}>{title}</h2>
          {intro && <p className="section__intro">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
