import { about } from '../data/portfolioData.js';

const colors = ['c-blue', 'c-sun', 'c-mint'];

export default function About() {
  return (
    <section id="tentang" className="sx sx-white">
      <div className="wrap">
        <div className="reveal">
          <p className="stag c-blue">
            <i />
            <b>Bab I</b>
            <span>Perjalanan & Filosofi</span>
          </p>
          <h2 className="h2 ab-h2">{about.heading}</h2>
        </div>

        <div className="ab-body">
          <aside className="ab-notes">
            {about.values.map((value, index) => (
              <div key={value.title} className={`ab-note reveal ${colors[index % colors.length]}`}>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </aside>

          <div className="ab-copy reveal">
            {about.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}