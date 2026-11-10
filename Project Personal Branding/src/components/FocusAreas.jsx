import { BarChart3, Database, Network, Smartphone } from 'lucide-react';
import { focusAreas } from '../data/portfolioData.js';

const icons = { BarChart3, Database, Network, Smartphone };

export default function FocusAreas() {
  return (
    <section id="fokus" className="section">
      <div className="container">
        <div className="reveal">
          <p className="eyebrow">Bab II — Fokus & Minat</p>
          <h2 className="section-title">Area yang Sedang Saya Jelajahi</h2>
        </div>

        <div className="bento-grid">
          {focusAreas.map((area) => {
            const Icon = icons[area.icon];
            return (
              <article
                key={area.title}
                className={`bento-card reveal${area.wide ? ' bento-wide' : ''}`}
              >
                <span className="bento-icon">
                  <Icon size={26} />
                </span>
                <h3 className="bento-title">{area.title}</h3>
                <p className="bento-desc">{area.desc}</p>
                <div className="bento-tags">
                  {area.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
