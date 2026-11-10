import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import FocusAreas from './components/FocusAreas.jsx';
import Roadmap from './components/Roadmap.jsx';
import Projects from './components/Projects.jsx';
import JournalExperience from './components/JournalExperience.jsx';
import SkillsMatrix from './components/SkillsMatrix.jsx';
import ContactFooter from './components/ContactFooter.jsx';

const INTERACTIVE_SELECTOR = 'a, button, .pill, .cursor-grow';
const CARD_SELECTOR = '.bento-card, .value-card, .project-card';
const BUILD_MS = 600;
const SAFETY_MS = 1500;
const FORCE_MS = 2500;
const GHOST_NAMES = ['Flutter', 'React', 'Dart', 'SQL', 'Python', 'Data'];
const GHOST_COLORS = ['#D4623F', '#3B6EA8', '#2F5D41', '#B07A10', '#7A4FA0', '#C2477A'];


export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let scrollVel = 0;
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    lenis.on('scroll', ({ velocity, progress }) => {
      scrollVel = velocity;
      bar.style.transform = `scaleY(${progress})`;
    });
    let scrollRaf;
    const scrollLoop = (time) => {
      lenis.raf(time);
      scrollRaf = requestAnimationFrame(scrollLoop);
    };
    scrollRaf = requestAnimationFrame(scrollLoop);

    const handleAnchor = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -40 });
    };
    document.addEventListener('click', handleAnchor);

    const ghosts = [];
    const buildQueue = [];
    const revealNow = (el, delay = 0) => {
      el.style.setProperty('--d', `${delay}ms`);
      el.classList.add('in');
      setTimeout(() => el.style.removeProperty('--d'), 1600);
    };
        const finishJob = (g) => {
      const el = g.job.el;
      revealNow(el);
      el.style.transition = '';
      el.style.opacity = '';
      el.style.transform = '';
      el.style.clipPath = '';
      g.sel.style.opacity = '0';
      g.job = null;
      g.phase = 'idle';
    };
    const revealObserver = new IntersectionObserver(
      (entries) => {
        let n = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          revealObserver.unobserve(el);
          if (ghosts.length > 0) {
            buildQueue.push({ el, since: performance.now() });
          } else {
            revealNow(el, Math.min(n, 6) * 90);
            n++;
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let dot = null;
    let cursorRaf;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const card = e.target.closest(CARD_SELECTOR);
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
    };
    const onOver = (e) => {
      if (dot && e.target.closest(INTERACTIVE_SELECTOR)) dot.classList.add('hovering');
    };
    const onOut = (e) => {
      if (dot && e.target.closest(INTERACTIVE_SELECTOR)) dot.classList.remove('hovering');
    };
    const TRAIL_COUNT = 5;
    const trails = [];
    const GHOST_COUNT = 6;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isFinePointer) {
      if (!reduceMotion) {
        for (let i = 0; i < GHOST_COUNT; i++) {
          const el = document.createElement('div');
          const color = GHOST_COLORS[i % GHOST_COLORS.length];
          el.className = 'cursor-ghost';
          el.style.setProperty('--gc', color);
          el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 2l7 19 3-8 8-3z"/></svg><span class="ghost-name">${GHOST_NAMES[i % GHOST_NAMES.length]}</span>`;
          document.body.appendChild(el);
          const sel = document.createElement('div');
          sel.className = 'ghost-select';
          sel.style.setProperty('--gc', color);
          document.body.appendChild(sel);
          document.body.appendChild(sel);
          const bx = Math.random() * window.innerWidth;
          const by = Math.random() * window.innerHeight;
          ghosts.push({
            el,
            sel,
            x: bx,
            y: by,
            job: null,
            phase: 'idle',
            t0: 0,
            bx,
            by,
            ax: 30 + Math.random() * 60,
            ay: 30 + Math.random() * 60,
            sp: 0.0004 + Math.random() * 0.0006,
            ph: Math.random() * Math.PI * 2,
            depth: 0.3 + Math.random() * 0.7,
          });
        }
        for (let i = 0; i < TRAIL_COUNT; i++) {
          const el = document.createElement('div');
          el.className = 'cursor-trail';
          el.style.opacity = String(0.55 - i * 0.09);
          document.body.appendChild(el);
          trails.push({ el, x: mouseX, y: mouseY, ease: 0.16 - i * 0.025 });
        }
      }
      dot = document.createElement('div');
      dot.className = 'cursor-dot';
      document.body.appendChild(dot);
      document.body.classList.add('custom-cursor-active');
      window.addEventListener('mousemove', onMove);
      document.addEventListener('mouseover', onOver);
      document.addEventListener('mouseout', onOut);

      const renderCursor = () => {
        dotX += (mouseX - dotX) * 0.22;
        dotY += (mouseY - dotY) * 0.22;
        dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
        scrollVel *= 0.92;
        const push = Math.max(-80, Math.min(80, scrollVel * 3));
        trails.forEach((t, i) => {
          const targetY = mouseY - (push * (i + 1)) / TRAIL_COUNT;
          t.x += (mouseX - t.x) * t.ease;
          t.y += (targetY - t.y) * t.ease;
          t.el.style.transform = `translate(${t.x}px, ${t.y}px)`;
        });
        const now = performance.now();
        let late = 0;
        for (let i = buildQueue.length - 1; i >= 0; i--) {
          if (now - buildQueue[i].since > SAFETY_MS) {
            revealNow(buildQueue[i].el, Math.min(late, 6) * 90);
            late++;
            buildQueue.splice(i, 1);
          }
        }
        while (buildQueue.length) {
          const free = ghosts.find((g) => !g.job);
          if (!free) break;
          free.job = buildQueue.shift();
          free.phase = 'fly';
        }
        ghosts.forEach((g) => {
          let tx = g.bx + Math.cos(now * g.sp + g.ph) * g.ax;
          let ty = g.by + Math.sin(now * g.sp * 1.3 + g.ph) * g.ay - push * g.depth;
          let k = 0.05;
          if (g.job) {
            const el = g.job.el;
            const r = el.getBoundingClientRect();
            k = 0.2;
            if (g.phase === 'fly') {
              tx = r.left + 6;
              ty = r.top + 6;
              if (Math.hypot(tx - g.x, ty - g.y) < 16) {
                g.phase = 'work';
                g.t0 = now;
                el.style.transition = 'none';
                el.style.opacity = '1';
                el.style.transform = 'none';
              }
            }
            if (g.phase === 'work') {
              const p = Math.min(1, (now - g.t0) / BUILD_MS);
              const e = 1 - Math.pow(1 - p, 3);
              const hide = `${(1 - e) * 100}%`;
              el.style.clipPath = `inset(0 ${hide} ${hide} 0)`;
              tx = r.left + e * r.width;
              ty = r.top + e * r.height;
              k = 0.4;
              g.sel.style.transform = `translate(${r.left - 8}px, ${r.top - 8}px)`;
              g.sel.style.width = `${r.width + 16}px`;
              g.sel.style.height = `${r.height + 16}px`;
              g.sel.style.opacity = '1';
              if (p >= 1) finishJob(g);
            }
            if (g.job && now - g.job.since > FORCE_MS) finishJob(g);
          }
          g.x += (tx - g.x) * k;
          g.y += (ty - g.y) * k;
          g.el.style.transform = `translate(${g.x}px, ${g.y}px)`;
        });
        cursorRaf = requestAnimationFrame(renderCursor);
      };
      cursorRaf = requestAnimationFrame(renderCursor);
    }

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          countObserver.unobserve(el);
          const end = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          if (reduceMotion) {
            el.textContent = end + suffix;
            return;
          }
          const duration = 1400;
          const startTime = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - startTime) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(end * eased) + suffix;
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));

    const roadmap = document.querySelector('.roadmap');
    const roadmapSteps = roadmap ? Array.from(roadmap.querySelectorAll('.roadmap-step')) : [];
    const updateRoadmap = () => {
      if (!roadmap) return;
      const r = roadmap.getBoundingClientRect();
      const raw = (window.innerHeight * 0.6 - r.top) / r.height;
      const p = reduceMotion ? 1 : Math.max(0, Math.min(1, raw));
      roadmap.style.setProperty('--rp', p);
      const lineY = p * r.height;
      roadmapSteps.forEach((step) => {
        step.classList.toggle('reached', reduceMotion || step.offsetTop + 12 <= lineY);
      });
    };
    lenis.on('scroll', updateRoadmap);
    window.addEventListener('resize', updateRoadmap);
    updateRoadmap();

    return () => {
      countObserver.disconnect();
      window.removeEventListener('resize', updateRoadmap);
      bar.remove();
      lenis.destroy();
      cancelAnimationFrame(scrollRaf);
      cancelAnimationFrame(cursorRaf);
      document.removeEventListener('click', handleAnchor);
      revealObserver.disconnect();
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      trails.forEach((t) => t.el.remove());
      ghosts.forEach((g) => {
        g.el.remove();
        g.sel.remove();
      });
      if (dot) {
        dot.remove();
        document.body.classList.remove('custom-cursor-active');
      }
    };
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <FocusAreas />
        <Roadmap />
        <Projects />
        <JournalExperience />
        <SkillsMatrix />
        <ContactFooter />
      </main>
    </div>
  );
}
