import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">AI & Frontend Developer</p>
        <h1>Muzainah Faisal</h1>
        <p className="hero-intro">
          I build thoughtful digital experiences at the intersection of design,
          frontend development, and AI-powered interfaces.
        </p>
        <div className="hero-actions">
          <Link to="/projects" className="btn btn-primary">
            View Projects
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            Contact Me
          </Link>
        </div>
      </div>

      <div className="hero-panel" aria-label="Professional summary">
        <div className="panel-chip">BS Computer Science</div>
        <div className="panel-chip">FlyRank AI Internship</div>
        <div className="panel-chip">React • Vite • AI Interfaces</div>
      </div>
    </section>
  )
}
