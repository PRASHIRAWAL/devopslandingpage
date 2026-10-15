import { REPO_URL } from '../data.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <p className="site-footer__title">Containerized Event Sponsorship Tracker</p>
          <p>DevOps project by Prashi Rawal · Roll No. 23102C0067 · Academic Year 2026–27</p>
        </div>
        <div className="site-footer__links">
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
            Project repository on GitHub<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
