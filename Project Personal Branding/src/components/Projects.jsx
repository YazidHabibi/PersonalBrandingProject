import { useRef } from 'react';
import { ExternalLink } from "lucide-react";
import { 
  ArrowLeft, 
  ArrowRight, 
  LayoutDashboard, 
  Wallet, 
  Activity, 
  FileText, 
  FolderKanban,
  AppWindow 
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
  AppWindow
};

export default function Projects() {
  const railRef = useRef(null);

  const scrollRail = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('.project-card');
    const distance = card ? card.offsetWidth + 24 : 400;
    rail.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  return (
    <section id="proyek" className="section">
      <div className="container">
        <div className="project-header reveal">
          <div>
            <p className="eyebrow">Bab IV — Proyek & Eksplorasi</p>
            <h2 className="section-title">Studi Kasus Latihan</h2>
          </div>
          <div className="project-controls">
            <button type="button" className="round-btn" onClick={() => scrollRail(-1)} aria-label="Proyek sebelumnya">
              <ArrowLeft size={18} />
            </button>
            <button type="button" className="round-btn" onClick={() => scrollRail(1)} aria-label="Proyek berikutnya">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div ref={railRef} className="project-rail">
  {projects.map((project) => {
    const Icon = icons[project.icon];
    return (
      <article key={project.title} className="project-card reveal">
        <div className="project-visual">
          <span className="project-metric">{project.metric}</span>
          <Icon size={64} className="project-visual-icon" />
        </div>

        <div className="project-body">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-subtitle">{project.subtitle}</p>
          <p className="project-desc">{project.desc}</p>

          <div className="tag-list">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <div className="project-actions">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="project-btn project-btn--ghost"
            >
              <GithubIcon size={16} /> GitHub
            </a>

            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="project-btn project-btn--primary"
              >
                <ExternalLink size={16} /> Lihat Project
              </a>
            ) : (
              <span className="project-btn project-btn--disabled" aria-disabled="true">
                <ExternalLink size={16} /> Segera Hadir
              </span>
            )}
          </div>
        </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
