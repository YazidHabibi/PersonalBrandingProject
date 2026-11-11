import { journal } from '../data/portfolioData.js';

export default function JournalExperience() {
  return (
    <section id="pengalaman" className="sx sx-white">
      <div className="wrap">
        <div className="reveal">
          <p className="stag c-sun">
            <i />
            <b>Bab V</b>
            <span>Catatan Pengalaman OSIS</span>
          </p>
          <h2 className="h2">Belajar Memimpin di Lingkungan Sekolah</h2>
        </div>

        <article className="jn">
          <div className="jn-text reveal">
            {journal.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>

          <div className="jn-aside reveal">
            <div className="jn-meta">
              <span className="chip c-sun">{journal.kicker}</span>
              <span className="chip">Organisasi Siswa</span>
            </div>
            <h3 className="jn-title">{journal.title}</h3>
            <p className="jn-role">{journal.role}</p>
          </div>
        </article>

        <dl className="jn-dl">
          {journal.takeaways.map((item) => (
            <div key={item.title} className="jn-row reveal">
              <dt>{item.title}</dt>
              <dd>{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}