import { motion } from 'motion/react';
import LegalScene from './components/LegalScene';

const fields = [
  { id: '01', title: 'Legal Practice', text: 'Complex legal work, contracts and strategic advisory.' },
  { id: '02', title: 'Arbitration & ADR', text: 'International arbitration, dispute strategy and training.' },
  { id: '03', title: 'AI & LegalTech', text: 'Responsible AI, legal data and technology-enabled workflows.' },
  { id: '04', title: 'Research', text: 'Comparative legal research, publications and emerging doctrine.' },
];

const work = [
  ['ARBITRATION', 'Cross-Border Dispute Resolution', 'Bridging legal tradition with modern commercial realities.'],
  ['LEGAL AI', 'Responsible AI in Legal Practice', 'Frameworks for trust, transparency and real-world adoption.'],
  ['RESEARCH', 'Law, Data & Emerging Technology', 'Research at the intersection of legal systems and digital change.'],
];

export default function App() {
  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a className="brand" href="#home" aria-label="Dr. Ahmed Abdelsalam home">
          <span className="monogram">AA</span>
          <span className="brand-copy"><strong>Dr. Ahmed Abdelsalam</strong><small>LAW × AI × DATA</small></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a><a href="#work">Work</a><a href="#labs">Labs</a><a href="#contact">Contact</a>
        </nav>
        <a className="nav-cta" href="#contact">Start a conversation <span>↗</span></a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-gridline" />
          <div className="hero-copy">
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
              LAW · ARBITRATION · INTELLIGENCE
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, delay: .08 }}>
              Dr. Ahmed<br /><span>Abdelsalam</span>
            </motion.h1>
            <motion.p className="role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .9, delay: .22 }}>
              Legal AI & Data Consultant <i>/</i> LegalTech Educator & Researcher
            </motion.p>
            <p className="credential">PhD in Arbitration Law · Attorney & International Arbitrator</p>
            <p className="intro">Connecting legal expertise with emerging technology to build clearer decisions, stronger systems and better dispute strategies.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#work">Explore selected work <span>↗</span></a>
              <a className="button button-ghost" href="#about">Enter profile <span>→</span></a>
            </div>
          </div>

          <div className="scene-wrap" aria-label="Interactive 3D legal intelligence sculpture">
            <LegalScene />
            <div className="scene-label scene-label-a"><span>LAW</span><small>judgment</small></div>
            <div className="scene-label scene-label-b"><span>DATA</span><small>evidence</small></div>
            <div className="scene-label scene-label-c"><span>AI</span><small>augmentation</small></div>
          </div>

          <div className="hero-aside">
            <span>01 — 04</span>
            <p>A professional digital space at the intersection of law, disputes, data and intelligent systems.</p>
          </div>
        </section>

        <section className="manifesto" id="about">
          <p className="section-kicker">THE IDEA</p>
          <h2>Not a digital résumé.<br /><span>A living professional system.</span></h2>
          <p>The website is designed as a spatial knowledge map. Each discipline becomes a portal, while the 3D core represents the connections between legal judgment, evidence, technology and human decision-making.</p>
        </section>

        <section className="field-grid" aria-label="Professional fields">
          {fields.map((field, index) => (
            <motion.article
              key={field.id}
              className="field-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .25 }}
              transition={{ duration: .6, delay: index * .06 }}
            >
              <div className="field-number">{field.id}</div>
              <div className="field-orb" />
              <h3>{field.title}</h3>
              <p>{field.text}</p>
              <a href="#work" aria-label={`Explore ${field.title}`}>Explore <span>↗</span></a>
            </motion.article>
          ))}
        </section>

        <section className="work-section" id="work">
          <div className="section-head">
            <div><p className="section-kicker">SELECTED WORK</p><h2>Ideas translated<br />into practice.</h2></div>
            <p>Research, advisory work, training and technology projects presented as case studies rather than a conventional list of credentials.</p>
          </div>
          <div className="work-list">
            {work.map(([tag, title, desc], index) => (
              <article className="work-card" key={title}>
                <div className={`work-visual visual-${index + 1}`}><span>{String(index + 1).padStart(2, '0')}</span><i /></div>
                <div className="work-meta"><small>{tag}</small><h3>{title}</h3><p>{desc}</p></div>
                <a href="#contact" aria-label={`Open ${title}`}>↗</a>
              </article>
            ))}
          </div>
        </section>

        <section className="labs" id="labs">
          <div className="labs-code">LAB / 001</div>
          <div><p className="section-kicker">LABS</p><h2>Build. Test.<br />Teach. Improve.</h2></div>
          <p>Interactive negotiation, arbitration and Legal AI experiments will live here as functional products—not decorative portfolio items.</p>
          <a className="button button-gold" href="#contact">Explore the lab roadmap <span>↗</span></a>
        </section>

        <section className="contact" id="contact">
          <p className="section-kicker">COLLABORATION</p>
          <h2>Research. Arbitration.<br />Legal AI. Speaking.</h2>
          <p>Select the reason for contact instead of sending a generic message.</p>
          <div className="contact-links"><a href="mailto:hello@example.com">Start a conversation ↗</a><a href="https://www.linkedin.com/in/ahmed-abdelsalam-phd/">LinkedIn ↗</a></div>
        </section>
      </main>

      <footer><span>© 2026 Dr. Ahmed Abdelsalam</span><span>Law × Arbitration × AI × Data</span></footer>
    </div>
  );
}