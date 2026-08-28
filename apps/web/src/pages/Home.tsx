type HomeProps = {
    onSelectEvent: (event: "first-job" | "moving") => void
    onProfile: () => void
}


function Home({ onSelectEvent, onProfile }: HomeProps) {
  return (
    <main className="page home-page">
      <section className="hero-panel">
        <p className="eyebrow">A simpler way to begin</p>
        <h1>Government services, made personal.</h1>
        <p className="hero-copy">
          Clear, practical guidance for the life moments that bring paperwork
          with them.
        </p>
        <button
          className="button button-primary"
          onClick={() => onSelectEvent("first-job")}
        >
          I started my first job <span aria-hidden="true">→</span>
        </button>
      </section>

      <section className="journey-section" aria-labelledby="journey-heading">
        <div className="section-heading">
          <p className="eyebrow">Choose your moment</p>
          <h2 id="journey-heading">How can we help today?</h2>
        </div>
        <div className="journey-grid">
          <button
            className="journey-card"
            onClick={() => onSelectEvent("first-job")}
          >
            <span className="journey-icon" aria-hidden="true">↗</span>
            <span className="journey-title">Starting my first job</span>
            <span className="journey-copy">EPFO, UAN and the essentials.</span>
            <span className="journey-action">Explore <span aria-hidden="true">→</span></span>
          </button>
          <button className="journey-card journey-card-disabled" disabled>
            <span className="journey-icon" aria-hidden="true">⌂</span>
            <span className="journey-title">Moving to a new address</span>
            <span className="journey-copy">Update services without missing a step.</span>
            <span className="coming-soon">Coming soon</span>
          </button>
        </div>
      </section>

      <section className="information-callout">
        <div>
          <p className="eyebrow">Keep it handy</p>
          <h2>Your information, ready when you are.</h2>
          <p>Save the details you regularly need for forms in one secure place.</p>
        </div>
        <button className="button button-secondary" onClick={onProfile}>
          Manage my information
        </button>
      </section>
    </main>
  )
}

export default Home
