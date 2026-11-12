import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
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

// Jarak geser satu kartu (lebar kartu + gap)
const getStep = (el) => {
  const c = el.children;
  if (c.length > 1) return c[1].offsetLeft - c[0].offsetLeft;
  return (c[0] && c[0].offsetWidth) || 1;
};

export default function Projects() {
  const previewRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const drag = useRef({ down: false, moved: false, startX: 0, startLeft: 0 });
  const [active, setActive] = useState(null);
  const [nav, setNav] = useState({ atStart: true, atEnd: false, idx: 0 });

  // Sinkronkan tombol, penghitung, dan progress bar dengan posisi geser
  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft;
    const fits = max <= 2;
    const atEnd = fits || left >= max - 2;
    const next = {
      atStart: left <= 2,
      atEnd,
      idx: fits ? 0 : atEnd ? el.children.length - 1 : Math.round(left / getStep(el)),
    };
    setNav((prev) =>
      prev.atStart === next.atStart && prev.atEnd === next.atEnd && prev.idx === next.idx ? prev : next
    );
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${fits ? 1 : (left + el.clientWidth) / el.scrollWidth})`;
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        sync();
      });
    };
    // Swipe horizontal di trackpad dibiarkan native (tidak dibajak smooth scroll halaman)
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.stopPropagation();
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('wheel', onWheel, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    sync();
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('wheel', onWheel);
      ro.disconnect();
    };
  }, [sync]);

  const slide = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * getStep(el), behavior: reduce ? 'auto' : 'smooth' });
  };

  const onKeyDown = (e) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      slide(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      slide(-1);
    }
  };

  // Geser pakai mouse (drag). Sentuhan layar sudah native.
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const el = trackRef.current;
    drag.current = { down: true, moved: false, startX: e.clientX, startLeft: el.scrollLeft };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.down) return;
    const el = trackRef.current;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      el.classList.add('is-dragging');
      el.setPointerCapture(e.pointerId);
    }
    if (d.moved) el.scrollLeft = d.startLeft - dx;
  };
  const endDrag = () => {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    trackRef.current.classList.remove('is-dragging'); // snap kembali ke kartu terdekat
  };
  // Habis menggeser, jangan anggap itu klik pada link/tombol
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

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
        <div className="pj-head">
          <div className="reveal">
            <p className="stag c-rose">
              <i />
              <b>Bab IV</b>
              <span>Proyek & Eksplorasi</span>
            </p>
            <h2 className="h2">Studi Kasus Latihan</h2>
          </div>

          <div className="pj-nav reveal">
            <span className="pj-count" aria-live="polite">
              {nav.idx + 1} / {projects.length}
            </span>
            <button
              type="button"
              className="pj-arrow"
              aria-label="Proyek sebelumnya"
              disabled={nav.atStart}
              onClick={() => slide(-1)}
            >
              <ArrowLeft size={20} />
            </button>
            <button
              type="button"
              className="pj-arrow"
              aria-label="Proyek berikutnya"
              disabled={nav.atEnd}
              onClick={() => slide(1)}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="pj-wrap reveal">
        <ul
          ref={trackRef}
          className="pj"
          tabIndex={0}
          aria-label="Daftar proyek, geser ke samping untuk melihat lainnya"
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          onDragStart={(e) => e.preventDefault()}
          onMouseMove={movePreview}
          onMouseLeave={() => setActive(null)}
        >
          {projects.map((project, index) => {
            const Icon = icons[project.icon] || FolderKanban;
            return (
              <li
                key={project.title}
                className={`pcard ${colors[index % colors.length]}`}
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
        <div className="pj-bar" aria-hidden="true">
          <i ref={barRef} />
        </div>
        </div>
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