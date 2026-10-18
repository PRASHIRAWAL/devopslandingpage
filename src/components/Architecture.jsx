import Section from './Section.jsx';

// Node centres in a 1060 × 500 drawing: delivery lane on top, the Docker host below.
const W = 168;
const H = 64;
const nodes = [
  { id: 'dev', x: 100, y: 80, title: 'Developer', sub: 'feature/* branch' },
  { id: 'gh', x: 330, y: 80, title: 'GitHub', sub: 'PR → development', tone: 'git' },
  { id: 'jk', x: 560, y: 80, title: 'Jenkins :8040', sub: 'build · test · package', tone: 'ci' },
  { id: 'hub', x: 830, y: 80, title: 'Docker Hub', sub: 'app + nginx :13', tone: 'reg' },
  { id: 'br', x: 100, y: 390, title: 'Browser', sub: 'admin / viewer' },
  { id: 'nx', x: 360, y: 390, title: 'Nginx :80', sub: 'reverse proxy', tone: 'run' },
  { id: 'app', x: 590, y: 390, title: 'Spring Boot :8081', sub: 'non-root container', tone: 'run' },
  { id: 'db', x: 830, y: 390, title: 'MySQL :3306', sub: 'persistent volume', tone: 'db' },
];

// Edges are drawn between node borders; `flow` animates a moving dash along the line.
const edges = [
  { d: 'M184 80 H246', label: 'push', lx: 215, ly: 66 },
  { d: 'M414 80 H476', label: 'checkout', lx: 445, ly: 66 },
  { d: 'M644 80 H746', label: 'docker push', lx: 695, ly: 66 },
  { d: 'M830 112 V300', label: 'docker pull :13', lx: 842, ly: 210, anchor: 'start' },
  { d: 'M560 112 V300', label: 'deploy · verify UP', lx: 548, ly: 210, anchor: 'end', dashed: true },
  { d: 'M184 390 H276', label: 'HTTP', lx: 230, ly: 376 },
  { d: 'M444 390 H506', label: '', lx: 0, ly: 0 },
  { d: 'M674 390 H746', label: 'JDBC', lx: 710, ly: 376 },
];

function Node({ x, y, title, sub, tone = 'base' }) {
  return (
    <g className={`arch-node arch-node--${tone}`} transform={`translate(${x - W / 2} ${y - H / 2})`}>
      <rect width={W} height={H} rx="14" />
      <text x={W / 2} y="27" className="arch-node__title">{title}</text>
      <text x={W / 2} y="46" className="arch-node__sub">{sub}</text>
    </g>
  );
}

export default function Architecture() {
  return (
    <Section
      id="architecture"
      eyebrow="Architecture"
      title="How code moves and how users reach it"
      intro="The top lane is delivery: a commit travels through GitHub and Jenkins to Docker Hub. Jenkins then deploys the build-numbered images onto the Docker host, where Nginx is the only public door. Ansible prepares the host."
      tone="tint"
    >
      <figure className="arch" data-reveal>
        <svg className="arch__svg" viewBox="0 0 1060 500" role="img" aria-labelledby="arch-cap">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 10 5 0 10Z" className="arch-arrow" />
            </marker>
          </defs>
          <text x="16" y="28" className="arch-lane">DELIVERY</text>
          <rect x="232" y="300" width="700" height="170" rx="20" className="arch-host" />
          <text x="248" y="326" className="arch-lane">DOCKER HOST · eventtracker-net · restart unless-stopped</text>
          <text x="16" y="338" className="arch-lane">RUNTIME</text>
          {edges.map((e) => (
            <g key={e.d}>
              <path d={e.d} className={`arch-edge ${e.dashed ? 'arch-edge--dashed' : ''}`} markerEnd="url(#arrow)" />
              <path d={e.d} className="arch-flow" />
              {e.label && <text x={e.lx} y={e.ly} textAnchor={e.anchor || 'middle'} className="arch-label">{e.label}</text>}
            </g>
          ))}
          {nodes.map((n) => <Node key={n.id} {...n} />)}
          <g className="arch-node arch-node--cfg" transform="translate(956 330)">
            <rect width="92" height="120" rx="14" />
            <text x="46" y="40" className="arch-node__title">Ansible</text>
            <text x="46" y="62" className="arch-node__sub">2.16 · WSL2</text>
            <text x="46" y="80" className="arch-node__sub">configure</text>
            <text x="46" y="96" className="arch-node__sub">+ deploy</text>
          </g>
          <path d="M956 390 H936" className="arch-edge" markerEnd="url(#arrow)" />
        </svg>
        <ol className="arch__list" aria-hidden="true">
          {nodes.map((n) => <li key={n.id}><strong>{n.title}</strong><span>{n.sub}</span></li>)}
          <li><strong>Ansible</strong><span>configures and deploys the host</span></li>
        </ol>
        <figcaption id="arch-cap">
          Delivery: Developer → GitHub → Jenkins (Maven, JUnit, Selenium) → Docker Hub. Jenkins deploys image tag 13
          to the Docker host and verifies health. Runtime: Browser → Nginx :80 → Spring Boot :8081 → MySQL :3306.
        </figcaption>
      </figure>
    </Section>
  );
}
