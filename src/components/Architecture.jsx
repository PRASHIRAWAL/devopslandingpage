import Section from './Section.jsx';

// Two lanes: the delivery path (how code becomes images) and the runtime path (how users reach the app).
const delivery = [
  { name: 'Developer', note: 'Feature branch' },
  { name: 'GitHub', note: 'Pull request & merge' },
  { name: 'Jenkins', note: 'Maven · JUnit · Selenium' },
  { name: 'Docker Hub', note: 'App + Nginx images' },
];

const runtime = [
  { name: 'Browser', note: 'User' },
  { name: 'Nginx', note: 'Reverse proxy · :80' },
  { name: 'Spring Boot', note: 'App container · :8080' },
  { name: 'MySQL', note: 'Database · :3306' },
];

function Lane({ label, nodes }) {
  return (
    <div className="lane">
      <p className="lane__label">{label}</p>
      <ol className="lane__nodes">
        {nodes.map((n) => (
          <li key={n.name} className="node">
            <strong>{n.name}</strong>
            <span>{n.note}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Architecture() {
  return (
    <Section
      id="architecture"
      eyebrow="Architecture"
      title="DevOps architecture"
      intro="Code moves left to right through the delivery lane. Jenkins then pulls the published images and runs them on a shared Docker network, where Nginx is the only public entry point."
      tone="tint"
    >
      <figure className="arch">
        <Lane label="Delivery path" nodes={delivery} />
        <div className="arch__bridge" aria-hidden="true">
          <span>docker pull &amp; run</span>
        </div>
        <Lane label="Runtime path" nodes={runtime} />
        <div className="arch__side">
          <div className="side-box">
            <strong>Ansible</strong>
            <span>Configures hosts and runs reliability checks</span>
          </div>
          <div className="side-box">
            <strong>Actuator health</strong>
            <span>Verified directly and through Nginx after each deploy</span>
          </div>
        </div>
        <figcaption>
          Delivery: Developer → GitHub → Jenkins (Maven build, JUnit and Selenium tests) → Docker Hub.
          Runtime: Browser → Nginx → Spring Boot → MySQL. Ansible manages configuration and reliability validation.
        </figcaption>
      </figure>
    </Section>
  );
}
