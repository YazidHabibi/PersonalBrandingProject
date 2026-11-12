import { useEffect, useRef, useState } from 'react';
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

// Deskripsi dipotong 3 baris. Tombol "Baca selengkapnya" hanya muncul kalau teksnya memang terpotong.
function ProjectDesc({ text }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [clipped, setClipped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const check = () => {
      if (!open) setClipped(el.scrollHeight > el.clientHeight + 1);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(check);
    return () => ro.disconnect();
  }, [text, open]);

  return (
    <>
      <p ref={ref} className={`pj-desc${open ? ' is-open' : ''}`}>
        {text}
      </p>
      {(clipped || open) && (
        <button
          type="button"
          className="pj-more"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Tutup' : 'Baca selengkapnya'}
        </button>
      )}
    </>
  );
}

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

        <ul className="pj" onMouseMove={movePreview} onMouseLeave={() => setActive(null)}>
          {projects.map((project, index) => {
            const Icon = icons[project.icon] || FolderKanban;
            return (
              <li
                key={project.title}
                className={`pcard reveal ${colors[index % colors.length]}`}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive((a) => (a === index ? null : a))}
              >
                <div className="pj-top">
                  <span className="ico">
                    <Icon size={24} strokeWidth={1.8} />
                  </span>
                  <span className="pj-metric">{project.metric}</span>
                </div>

                <div className="pj-body">
                  <h3 className="pj-title">{project.title}</h3>
                  <p className="pj-sub">{project.subtitle}</p>
                  <ProjectDesc text={project.desc} />

                  <ul className="pj-tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>

                  <div className="idx-links pj-links">
                    <a href={project.github} target="_blank" rel="noreferrer" className="idx-link">
                      <GithubIcon size={15} /> GitHub
                    </a>
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="idx-link idx-link-main"
                      >
                        <ExternalLink size={15} /> Lihat Project
                      </a>
                    ) : (
                      <span className="idx-link idx-link-off" aria-disabled="true">
                        <ExternalLink size={15} /> Segera Hadir
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
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