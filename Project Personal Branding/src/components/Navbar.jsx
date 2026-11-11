import { useEffect, useState } from 'react';
import { navItems } from '../data/portfolioData.js';

export default function Navbar() {
  const [activeId, setActiveId] = useState(navItems[0].id);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="dock" aria-label="Navigasi utama">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-label={item.label}
          className={`dock-item${activeId === item.id ? ' is-active' : ''}`}
        >
          <span className="dock-dot" />
          <span className="dock-label">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}