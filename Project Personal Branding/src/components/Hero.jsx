import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown, Mail, RotateCcw, Terminal } from 'lucide-react';
import { profile, heroBadges, terminalScript } from '../data/portfolioData.js';
import GithubIcon from './GithubIcon.jsx';

function CodeLine({ line }) {
  if (line.type === 'cmd') {
    return (
      <p className="code-line is-cmd">
        <span className="code-prompt">$</span>
        {line.text}
      </p>
    );
  }
  return <p className={`code-line tone-${line.tone}`}>{line.text}</p>;
}

function CodeCanvas({ onReplay }) {
  const [doneLines, setDoneLines] = useState([]);
  const [typing, setTyping] = useState(null);

  const bodyRef = useRef(null);
  const [box, setBox] = useState({ top: 0, height: 0, show: false });

  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const lines = body.querySelectorAll('.code-line');
    const last = lines[lines.length - 1];
    if (!last) {
      setBox((b) => (b.show ? { ...b, show: false } : b));
      return;
    }
    const top = last.offsetTop;
    const height = last.offsetHeight;
    setBox((b) => (b.top === top && b.height === height && b.show ? b : { top, height, show: true }));
  }, [doneLines, typing]);

  useEffect(() => {
    let timer;
    let lineIndex = 0;
    let charIndex = 0;
    let printed = [];

    const restart = () => {
      lineIndex = 0;
      charIndex = 0;
      printed = [];
      setDoneLines([]);
      setTyping(null);
      timer = setTimeout(step, 500);
    };

    const step = () => {
      if (lineIndex >= terminalScript.length) {
        timer = setTimeout(restart, 3500);
        return;
      }
      const line = terminalScript[lineIndex];
      if (line.type === 'cmd' && charIndex < line.text.length) {
        charIndex += 1;
        setTyping(line.text.slice(0, charIndex));
        timer = setTimeout(step, 48);
        return;
      }
      printed = [...printed, line];
      setDoneLines(printed);
      setTyping(null);
      lineIndex += 1;
      charIndex = 0;
      timer = setTimeout(step, line.type === 'cmd' ? 320 : 260);
    };

    timer = setTimeout(step, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="code-canvas">
      <div className="code-canvas-bar">
        <span className="code-canvas-dot" />
        <span className="code-canvas-dot" />
        <span className="code-canvas-dot is-live" />
        <span className="code-canvas-title">
          <Terminal size={14} /> python belajar_data.py
        </span>
        <button type="button" className="code-canvas-replay" onClick={onReplay}>
          <RotateCcw size={12} /> Ulangi
        </button>
      </div>

      <div className="code-canvas-body" ref={bodyRef}>
        <div
          className="code-focus"
          style={{ transform: `translateY(${box.top}px)`, height: box.height, opacity: box.show ? 1 : 0 }}
        />
        {doneLines.map((line, i) => (
          <CodeLine key={i} line={line} />
        ))}
        {typing !== null && (
          <p className="code-line is-cmd">
            <span className="code-prompt">$</span>
            {typing}
            <span className="code-caret" />
          </p>
        )}
      </div>

      <div className="code-canvas-badges">
        {heroBadges.map((badge) => (
          <span key={badge.label} className={`badge${badge.tone === 'learning' ? ' is-learning' : ''}`}>
            {badge.label}
          </span>
        ))}
      </div>
    </div>
  );
}

const marqueeGroup = (
  <div className="marquee-group">
    {Array.from({ length: 3 }).map((_, i) => (
      <span key={i}>{profile.marqueeText}</span>
    ))}
  </div>
);

export default function Hero() {
  const [runId, setRunId] = useState(0);

  return (
    <section id="beranda" className="hero grid-bg">
      <div className="hero-glow hero-glow-ice" />
      <div className="hero-glow hero-glow-slate" />

      <div className="marquee hero-marquee" aria-hidden="true">
        <div className="marquee-track">
          {marqueeGroup}
          {marqueeGroup}
        </div>
      </div>

      <div className="container hero-inner">
        <header className="hero-topbar">
          <p className="hero-tagline">{profile.tagline}</p>
          <a href={`mailto:${profile.email}`} className="email-pill">
            <Mail size={16} />
            {profile.email}
          </a>
        </header>

        <h1 className="hero-title">
          <span className="cursor-grow">Yazid</span>
          <span>Habibi</span>
          <span>Tambunan</span>
        </h1>

        <div className="hero-grid">
          <div className="reveal">
            <p className="hero-subtitle">{profile.subtitle}</p>
            <div className="hero-actions">
              <a href="#tentang" className="btn-primary">
                Kenali Saya <ArrowDown size={16} />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
                <GithubIcon size={16} /> GitHub
              </a>
            </div>
          </div>

          <div className="reveal">
            <CodeCanvas key={runId} onReplay={() => setRunId((id) => id + 1)} />
          </div>
        </div>
      </div>
    </section>
  );
}
