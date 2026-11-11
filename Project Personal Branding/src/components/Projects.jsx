import { useRef, useState } from 'react';
import {
  ExternalLink,
  LayoutDashboard,
  Wallet,
  Activity,
  FileText,
  FolderKanban,
  AppWindow,
} from 'lucide-react';
import { projects } from '../data/portfolioData.js';
import GithubIcon from './GithubIcon.jsx';

// Daftarkan semua ikon proyek kamu di sini
const icons = {
  Wallet,
  Activity,
  FileText,
  FolderKanban,
  LayoutDashboard,
  AppWindow,
};

const colors = ['c-blue', 'c-sun', 'c-mint', 'c-rose'];

export default function Projects() {
  const previewRef = useRef(null);
  const [active, setActive] = useState(null);

  const movePreview = (e) => {
    const el = previewRef.current;
    if (!el) return;
    const x = Math.min(e.clientX + 28, window.innerWidth - 264);
    const y = Math.min(e.clientY + 28, window.innerHeight - 184);
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const current = active !== null ? projects[active] : null;
  const ActiveIcon = current ? icons[current.icon] : null;

  return (
    <section id="proyek" className="sx">
      <div className="wrap">
        <div className="reveal">
          <p className="stag c-rose">
            <i />
            <b>Bab IV</b>
            <span>Proyek & Eksplorasi</span>
          </p>
          <h2 className="h2">Studi Kasus Latihan</h2>
        </div>

        <ul className="idx" onMouseMove={movePreview} onMouseLeave={() => setActive(null)}>
          {projects.map((project, index) => (
            <li
              key={project.title}
              className={`idx-row reveal ${colors[index % colors.length]}`}
              onMouseEnter={() => setActive(index)}
            >
              <div className="idx-side">
                <span className="idx-metric">{project.metric}</span>
                <span className="idx-tags">{project.tags.join(', ')}</span>
              </div>

              <div className="idx-main">
                <h3 className="idx-title">{project.title}</h3>
                <p className="idx-sub">{project.subtitle}</p>
                <p className="idx-desc">{project.desc}</p>
              </div>

              <div className="idx-links">
                <a href={project.github} target="_blank" rel="noreferrer" className="idx-link">
                  <GithubIcon size={15} /> GitHub
                </a>
                {project.demo ? (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="idx-link idx-link-main">
                    <ExternalLink size={15} /> Lihat Project
                  </a>
                ) : (
                  <span className="idx-link idx-link-off" aria-disabled="true">
                    <ExternalLink size={15} /> Segera Hadir
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={previewRef}
        className={`idx-preview${current ? ` on ${colors[active % colors.length]}` : ''}`}
        aria-hidden="true"
      >
        {ActiveIcon && <ActiveIcon size={64} strokeWidth={1.6} />}
        {current && <span>{current.metric}</span>}
      </div>
    </section>
  );
}