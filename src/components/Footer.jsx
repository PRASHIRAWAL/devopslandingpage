import { DOCKER_HUB_URL, REPO_URL, latestBuild, student } from '../data.js';
import Icon from './Icon.jsx';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <p className="site-footer__title">Containerized Event Sponsorship Tracker</p>
          <p>DevOps project by {student.name} · Roll No. {student.roll} · {student.subject}</p>
          <p className="site-footer__build">
            <span className="pulse-dot" aria-hidden="true" /> Latest: build #{latestBuild.number} · {latestBuild.date} · SUCCESS
          </p>
        </div>
        <div className="site-footer__links">
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="github" size={16} /> GitHub repository<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href={DOCKER_HUB_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="box" size={16} /> Docker Hub images<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
