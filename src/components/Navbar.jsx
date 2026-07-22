import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
  { to: '/assistant', label: 'Assistant' },
]

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <div>
        <p className="brand">Muzainah Faisal</p>
        <span className="tagline">AI & Frontend Developer</span>
      </div>

      <div className="nav-actions">
        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button type="button" className="theme-toggle" onClick={onToggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  )
}
