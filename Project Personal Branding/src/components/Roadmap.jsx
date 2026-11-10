import { roadmap } from '../data/portfolioData.js';

export default function Roadmap() {
  return (
    <section id="target" className="section section-linen">
      <div className="container">
        <div className="reveal">
          <p className="eyebrow">Bab III — Target & Alur Belajar</p>
          <h2 className="section-title">Dari Latihan Kecil Menuju Tujuan Besar</h2>
        </div>

        <div className="roadmap">
          {roadmap.map((step, index) => (
            <div
              key={step.title}
              className={`roadmap-step reveal${index === 0 ? ' is-current' : ''}`}
            >
              <span className="roadmap-node" />
              <p className="roadmap-phase">{step.phase}</p>
              <h3 className="roadmap-title">{step.title}</h3>
              <span className="roadmap-status">{step.status}</span>
              <p className="roadmap-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
