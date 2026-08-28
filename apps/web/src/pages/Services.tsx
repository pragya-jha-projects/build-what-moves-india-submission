type ServicesProps = {
  onBack: () => void
  onSelectService: (service: "epfo") => void
}

function Services({ onBack, onSelectService }: ServicesProps) {
  return (
    <main className="page">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <p className="eyebrow">Life event</p>
      <h1>Starting your first job</h1>

      <p>
        Here are some government services you may need to
        take care of when starting your first job.
      </p>

      <section className="service-grid">
        <article className="service-card">
          <span className="service-icon" aria-hidden="true">₹</span>
          <p className="service-label">Essential service</p>
          <h2>EPFO / Provident Fund</h2>

        <p>
          Understand your Provident Fund, UAN and the
          information you may need before getting started.
        </p>

        <button className="button button-primary" onClick={() => onSelectService("epfo")}>
          Get started →
        </button>
        </article>

        <article className="service-card service-card-disabled">
          <span className="service-icon" aria-hidden="true">%</span>
          <p className="service-label">More guidance soon</p>
          <h2>Income Tax</h2>

        <p>
          Understand PAN, tax records and your
          responsibilities as a new employee.
        </p>

          <button className="button button-secondary" disabled>
          Coming soon
        </button>
        </article>
      </section>
    </main>
  )
}

export default Services
