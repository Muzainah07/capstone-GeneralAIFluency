const projects = [
  {
    title: 'Ranna Recipe App',
    description:
      'A modern recipe discovery experience focused on clean browsing and easy meal planning.',
    technologies: ['React', 'CSS', 'UI Design'],
    features: ['Recipe exploration flow', 'Clean visual hierarchy', 'Responsive layout'],
    githubUrl: 'YOUR_GITHUB_REPO_URL',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Live Location Tracker',
    description:
      'A location-based app concept that highlights real-time positioning and responsive map interactions.',
    technologies: ['JavaScript', 'APIs', 'Frontend'],
    features: ['Live map experience', 'Interactive UI states', 'Mobile-first layout'],
    githubUrl: 'YOUR_GITHUB_REPO_URL',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'FlyRank AI Assignments',
    description:
      'A collection of AI-assisted frontend tasks demonstrating practical implementation and experimentation.',
    technologies: ['React', 'AI', 'Vite'],
    features: ['AI-focused UI tasks', 'Rapid prototyping', 'Reusable component patterns'],
    githubUrl: 'YOUR_GITHUB_REPO_URL',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80',
  },
]

export default function Projects() {
  return (
    <section className="page-card projects-page">
      <div className="section-heading">
        <p className="eyebrow">Selected Work</p>
        <h1>Featured Projects</h1>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <img className="project-image" src={project.image} alt={project.title} />

            <div className="project-content">
              <h2>{project.title}</h2>
              <p>{project.description}</p>

              <div className="tech-tags">
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <ul className="feature-list">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="project-actions">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary project-btn"
                >
                  GitHub Repository
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
