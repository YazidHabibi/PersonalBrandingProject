import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { profile, contact } from '../data/portfolioData.js';
import GithubIcon from './GithubIcon.jsx';

const marqueeGroup = (
  <div className="marquee-group">
    <span>{contact.headline}</span>
    <span className="separator">•</span>
  </div>
);

export default function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer id="kontak" className="section contact-section">
      <div className="container">
        <p className="eyebrow reveal">Bab VII — Kontak & Footer</p>
      </div>

      <div className="marquee contact-marquee" aria-label={contact.headline}>
        <div className="marquee-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="marquee-group">
              <span>{contact.headline}</span>
              <span className="separator">•</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="contact-actions reveal">
          <p className="section-lead">{contact.subtext}</p>
          <button type="button" className="copy-pill" onClick={copyEmail}>
            {profile.email}
            <span className="copy-pill-state">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Tersalin' : 'Klik untuk salin'}
            </span>
          </button>
          <a href={profile.github} target="_blank" rel="noreferrer" className="github-link">
            <GithubIcon size={18} />
            {profile.githubLabel}
          </a>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {profile.name}. Hak cipta dilindungi.</span>
          <span>Dibuat dengan rasa ingin tahu dan proses belajar.</span>
        </div>
      </div>
    </footer>
  );
}
