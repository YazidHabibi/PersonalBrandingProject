import { useEffect, useRef, useState } from 'react';
import { skillGroups } from '../data/portfolioData.js';

function SkillRow({ skill }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let width = '0%';
  if (skill.learning) width = '40%';
  else if (visible) width = `${skill.level}%`;

  return (
    <div ref={ref}>
      <div className="skill-head">
        <span className="skill-name">{skill.name}</span>
        {skill.learning ? (
          <span className="skill-value">Sedang Dipelajari</span>
        ) : (
          <span className="skill-value" data-count={skill.level} data-suffix="%">
            {`${skill.level}%`}
          </span>
        )}
      </div>
      <div className="skill-bar">
        <span className={`skill-fill${skill.learning ? ' is-learning' : ''}`} style={{ width }} />
      </div>
    </div>
  );
}

export default function SkillsMatrix() {
  return (
    <section id="keahlian" className="section section-linen">
      <div className="container">
        <div className="reveal">
          <p className="eyebrow">Bab VI — Peta Keahlian</p>
          <h2 className="section-title">Tingkat Kemampuan Saat Ini</h2>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div key={group.title} className="skill-category reveal">
              <h3 className="skill-category-title">{group.title}</h3>
              <div className="skill-list">
                {group.items.map((skill) => (
                  <SkillRow key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
