import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown, Mail, RotateCcw, Terminal } from 'lucide-react';
import { profile, heroBadges, terminalScript } from '../data/portfolioData.js';
import GithubIcon from './GithubIcon.jsx';

function CodeLine({ line }) {
  if (line.type === 'cmd') {
    return (
      <p className="nb-line is-cmd">
        <span className="nb-prompt">$</span>
        {line.text}
      </p>
    );
  }
  return <p className={`nb-line tone-${line.tone}`}>{line.text}</p>;
}

function CodeCanvas({ onReplay }) {
  const [doneLines, setDoneLines] = useState([]);
  const [typing, setTyping] = useState(null);

  const rootRef = useRef(null);
  const onscreen = useRef(true);
  const bodyRef = useRef(null);
  const [box, setBox] = useState({ top: 0, height: 0, show: false });

  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const lines = body.querySelectorAll('.nb-line');
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
    const el = rootRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      onscreen.current = entry.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
      if (!onscreen.current) {
        timer = setTimeout(step, 400);
        return;
      }
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
    <div className="nb" ref={rootRef}>
      <div className="nb-bar">
        <span className="nb-dot" />
        <span className="nb-dot" />
        <span className="nb-dot" />
        <span className="nb-title">
          <Terminal size={14} /> python belajar_data.py
        </span>
        <button type="button" className="nb-replay" onClick={onReplay}>
          <RotateCcw size={12} /> Ulangi
        </button>
      </div>

      <div className="nb-body" ref={bodyRef}>
        <div
          className="nb-focus"
          style={{ transform: `translateY(${box.top}px)`, height: box.height, opacity: box.show ? 1 : 0 }}
        />
        {doneLines.map((line, i) => (
          <CodeLine key={i} line={line} />
        ))}
        {typing !== null && (
          <p className="nb-line is-cmd">
            <span className="nb-prompt">$</span>
            {typing}
            <span className="nb-caret" />
          </p>
        )}
      </div>

      <div className="nb-badges">
        {heroBadges.map((badge) => (
          <span key={badge.label} className={`nb-badge${badge.tone === 'learning' ? ' is-learning' : ''}`}>
            {badge.label}
          </span>
        ))}
      </div>
    </div>
  );
}

const tickerWords = profile.marqueeText
  .split('•')
  .map((word) => word.trim())
  .filter(Boolean);

const tickerGroup = (
  <div className="ticker-group">
    {tickerWords.map((word, i) => (
      <Fragment key={word}>
        <span>{word}</span>
        <i className={`k${i % 4}`} />
      </Fragment>
    ))}
  </div>
);

export default function Hero() {
  const [runId, setRunId] = useState(0);
  const nameParts = profile.name.split(' ');

  return (
    <section id="beranda" className="hero2">
      <div className="wrap hero2-inner">
        <header className="hero2-top">
          <p className="hero2-tagline">{profile.tagline}</p>
          <a href={`mailto:${profile.email}`} className="pill pill-line">
            <Mail size={16} />
            {profile.email}
          </a>
        </header>

        <h1 className="hero2-name" aria-label={profile.name}>
          {nameParts.map((word, i) => (
            <span key={word} className={`ln${i === 0 ? ' cursor-grow' : ''}`} aria-hidden="true">
              <span>{word}</span>
            </span>
          ))}
        </h1>

        <svg className="hero2-curve" viewBox="0 0 1200 150" aria-hidden="true" focusable="false">
          <path
            pathLength="1"
            d="M0 132 C 110 130, 150 112, 230 116 S 350 84, 430 90 S 560 54, 640 62 S 780 42, 860 46 S 1040 24, 1200 16"
          />
          <circle className="d1" cx="230" cy="116" r="11" />
          <circle className="d2" cx="430" cy="90" r="11" />
          <circle className="d3" cx="640" cy="62" r="11" />
          <circle className="d4" cx="860" cy="46" r="11" />
          <circle className="d5" cx="1200" cy="16" r="11" />
        </svg>

        <div className="hero2-grid">
          <div className="reveal">
            <p className="hero2-sub">{profile.subtitle}</p>
            <div className="hero2-actions">
              <a href="#tentang" className="pill pill-ink">
                Kenali Saya <ArrowDown size={16} />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="pill pill-line">
                <GithubIcon size={16} /> GitHub
              </a>
            </div>
          </div>

          <div className="reveal">
            <CodeCanvas key={runId} onReplay={() => setRunId((id) => id + 1)} />
          </div>
        </div>
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {tickerGroup}
          {tickerGroup}
        </div>
      </div>
    </section>
  );
}