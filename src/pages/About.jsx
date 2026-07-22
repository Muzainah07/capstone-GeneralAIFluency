export default function About() {
  return (
    <section className="page-card about-page">
      <div className="section-heading">
        <p className="eyebrow">About Me</p>
        <h1>Professional Snapshot</h1>
      </div>

      <p className="about-bio">
        I’m Muzainah Faisal, an AI and frontend developer focused on creating
        modern, user-friendly digital experiences. My work blends technical
        curiosity with thoughtful design to build products that feel both powerful
        and approachable.
      </p>

      <div className="about-grid">
        <article className="info-card">
          <h2>Education</h2>
          <p>BS Computer Science</p>
          <p>University of Karachi</p>
        </article>

        <article className="info-card">
          <h2>Internship</h2>
          <p>FlyRank AI</p>
          <p>Front-End AI Engineering</p>
        </article>

        <article className="info-card full-width">
          <h2>Goals</h2>
          <p>
            I aim to grow into a well-rounded developer who can design, build, and
            improve AI-driven experiences that make technology more useful and
            human-centered.
          </p>
        </article>
      </div>
    </section>
  )
}
