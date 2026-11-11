import { skillGroups } from '../data/portfolioData.js';

const colors = ['c-blue', 'c-mint', 'c-rose', 'c-sun'];

function SkillRow({ skill }) {
  if (skill.learning) {
    return (
      <div className="st-row">
        <span className="st-name">{skill.name}</span>
        <span className="st-gap" />
        <span className="st-val is-learning">
          <i />
          Sedang dipelajari
        </span>
      </div>
    );
  }

  const filled = Math.round(skill.level / 10);

  return (
    <div className="st-row">
      <span className="st-name">{skill.name}</span>
      <span className="st-gap" />
      <span className="st-ticks" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <i key={i} className={i < filled ? 'on' : ''} />
        ))}
      </span>
      <span className="st-val" data-count={skill.level} data-suffix="%">
        {`${skill.level}%`}
      </span>
    </div>
  );
}

export default function SkillsMatrix() {
  return (
    <section id="keahlian" className="sx sx-tint">
      <div className="wrap">
        <div className="reveal">
          <p className="stag c-blue">
            <i />
            <b>Bab VI</b>
            <span>Peta Keahlian</span>
          </p>
          <h2 className="h2">Tingkat Kemampuan Saat Ini</h2>
        </div>

        <div className="st">
          {skillGroups.map((group, index) => (
            <div key={group.title} className={`st-group reveal ${colors[index % colors.length]}`}>
              <h3>
                <i />
                {group.title}
              </h3>
              {group.items.map((skill) => (
                <SkillRow key={skill.name} skill={skill} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}