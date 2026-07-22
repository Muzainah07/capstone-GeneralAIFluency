export default function About() {
  return (
    <section className="page-card about-page">
      <div className="section-heading">
        <p className="eyebrow">About Me</p>
        <h1>Academic & Creative Snapshot</h1>
      </div>

      <p className="about-bio">
        I’m Muzainah Faisal, a BS Computer Science undergraduate student with a growing interest in
        building modern, user-friendly digital experiences. My work blends technical curiosity,
        design thinking, and exploration in AI and frontend development.
      </p>

      <div className="about-grid">
        <article className="info-card">
          <h2>Education</h2>
          <p>BS Computer Science Undergraduate</p>
          <p>University of Karachi (UBIT)</p>
        </article>

        <article className="info-card">
          <h2>Internship</h2>
          <p>FlyRank AI</p>
          <p>Front-End AI Engineering Intern</p>
        </article>

        <article className="info-card full-width">
          <h2>Goals</h2>
          <p>
            I aim to keep growing as an aspiring AI & frontend developer by designing,
            building, and improving digital experiences that are both useful and
            human-centered.
          </p>
        </article>
      </div>
    </section>
  )
}
