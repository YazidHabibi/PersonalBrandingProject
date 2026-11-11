import { BarChart3, Database, Network, Smartphone } from 'lucide-react';
import { focusAreas } from '../data/portfolioData.js';

const icons = { BarChart3, Database, Network, Smartphone };
// biru sebagai warna utama; putih, kuning, dan navy sebagai pengimbang
const colors = ['c-blue', 'c-paper', 'c-sun', 'c-ink'];

export default function FocusAreas() {
  return (
    <section id="fokus" className="sx">
      <div className="wrap">
        <div className="reveal">
          <p className="stag c-sun">
            <i />
            <b>Bab II</b>
            <span>Fokus & Minat</span>
          </p>
          <h2 className="h2">Area yang Sedang Saya Jelajahi</h2>
        </div>

        <div className="bento">
          {focusAreas.map((area, index) => {
            const Icon = icons[area.icon];
            return (
              <article
                key={area.title}
                className={`bcard reveal ${colors[index % colors.length]}${area.wide ? ' bento-wide' : ''}`}
              >
                <span className="ico">
                  <Icon size={26} />
                </span>
                <div className="bcard-body">
                  <h3>{area.title}</h3>
                  <p>{area.desc}</p>
                  <div className="tags">
                    {area.tags.map((tag) => (
                      <span key={tag} className="tg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}