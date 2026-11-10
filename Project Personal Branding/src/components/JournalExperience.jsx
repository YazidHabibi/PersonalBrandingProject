import { FolderKanban, Puzzle, Users } from 'lucide-react';
import { journal } from '../data/portfolioData.js';

const icons = { Users, FolderKanban, Puzzle };

export default function JournalExperience() {
  return (
    <section id="pengalaman" className="section">
      <div className="container">
        <div className="reveal">
          <p className="eyebrow">Bab V — Catatan Pengalaman OSIS</p>
          <h2 className="section-title">Belajar Memimpin di Lingkungan Sekolah</h2>
        </div>

        <article className="journal-paper reveal">
          <div className="journal-meta">
            <span>{journal.kicker}</span>
            <span>·</span>
            <span>Organisasi Siswa</span>
          </div>
          <h3 className="journal-title">{journal.title}</h3>
          <p className="journal-role">{journal.role}</p>

          <div className="journal-body">
            {journal.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>

          <div className="journal-takeaways">
            {journal.takeaways.map((item) => {
              const Icon = icons[item.icon];
              return (
                <div key={item.title} className="takeaway">
                  <span className="takeaway-icon">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="takeaway-title">{item.title}</p>
                    <p className="takeaway-text">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}
