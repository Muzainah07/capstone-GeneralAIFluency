const skillGroups = [
  {
    title: 'Frontend',
    items: ['React', 'Vite', 'HTML5', 'CSS3', 'JavaScript'],
  },
  {
    title: 'Mobile',
    items: ['Responsive Design', 'Mobile UI', 'Cross-Platform Thinking'],
  },
  {
    title: 'Tools',
    items: ['Git', 'VS Code', 'Figma', 'REST APIs'],
  },
  {
    title: 'AI',
    items: ['Prompt Engineering', 'AI Interfaces', 'LLM Integration'],
  },
]

export default function Skills() {
  return (
    <section className="page-card skills-page">
      <div className="section-heading">
        <p className="eyebrow">Technical Strengths</p>
        <h1>Skills & Expertise</h1>
      </div>

      <div className="skills-grid">
        {skillGroups.map((group) => (
          <article className="skill-card" key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
