import { roadmap } from '../data/portfolioData.js';

const colors = ['c-blue', 'c-sun', 'c-mint', 'c-rose'];

export default function Roadmap() {
  return (
    <section id="target" className="sx sx-tint rm">
      <div className="wrap">
        <div className="rm-grid">
          <div className="reveal stick">
            <p className="stag c-mint">
              <i />
              <b>Bab III</b>
              <span>Target & Alur Belajar</span>
            </p>
            <h2 className="h2">Dari Latihan Kecil Menuju Tujuan Besar</h2>
          </div>

          <div className="roadmap">
            {roadmap.map((step, index) => (
              <div
                key={step.title}
                className={`roadmap-step reveal ${colors[index % colors.length]}${index === 0 ? ' is-current' : ''}`}
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
      </div>
    </section>
  );
}