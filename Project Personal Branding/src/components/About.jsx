import { Compass, Handshake, Repeat } from 'lucide-react';
import { about } from '../data/portfolioData.js';

const icons = { Compass, Repeat, Handshake };

export default function About() {
  return (
    <section id="tentang" className="section section-linen">
      <div className="container">
        <div className="about-grid">
          <div className="reveal">
            <p className="eyebrow">Bab I — Perjalanan & Filosofi</p>
            <h2 className="section-title">{about.heading}</h2>
          </div>
          <div className="about-copy reveal">
            {about.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>

        <div className="values-grid">
          {about.values.map((value) => {
            const Icon = icons[value.icon];
            return (
              <article key={value.title} className="value-card reveal">
                <span className="value-icon">
                  <Icon size={24} />
                </span>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-desc">{value.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
