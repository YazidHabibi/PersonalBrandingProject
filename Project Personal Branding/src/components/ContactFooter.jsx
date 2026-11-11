import { Fragment, useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { profile, contact } from '../data/portfolioData.js';
import GithubIcon from './GithubIcon.jsx';

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
    <footer id="kontak" className="ft">
      <div className="wrap">
        <p className="stag c-sun reveal">
          <i />
          <b>Bab VII</b>
          <span>Kontak</span>
        </p>
      </div>

      <div className="ft-marq" aria-label={contact.headline}>
        <div className="ft-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <Fragment key={i}>
              <div className="ft-group" aria-hidden={i > 0}>
                <span>{contact.headline}</span>
                <i />
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="ft-act reveal">
          <p className="lead">{contact.subtext}</p>
          <button type="button" className="copy" onClick={copyEmail}>
            {profile.email}
            <span className="copy-state">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Tersalin' : 'Klik untuk salin'}
            </span>
          </button>
          <a href={profile.github} target="_blank" rel="noreferrer" className="pill pill-line">
            <GithubIcon size={18} />
            {profile.githubLabel}
          </a>
        </div>

        <div className="ft-bottom">
          <span>© {new Date().getFullYear()} {profile.name}. Hak cipta dilindungi.</span>
          <span>Dibuat dengan rasa ingin tahu dan proses belajar.</span>
        </div>
      </div>
    </footer>
  );
}