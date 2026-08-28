import { epfoService } from "../data/epfo"

type EPFOProps = {
    onBack: () => void
    onStart: () => void
}

function EPFO({ onBack, onStart }: EPFOProps) {
    return (
        <main className="page">
            <button className="back-button" onClick={onBack}>
                ← Back
            </button>

            <section className="service-intro">
              <span className="service-intro-icon" aria-hidden="true">₹</span>
              <p className="eyebrow">Employment essentials</p>
              <h1>{epfoService.name}</h1>
              <p>{epfoService.description}</p>
              <div className="intro-points">
                <span>✓ Tailored to your answers</span>
                <span>✓ Takes about 2 minutes</span>
              </div>
            </section>

            <button className="button button-primary" onClick={onStart}>
                Start →
            </button>
        </main>
    )
}

export default EPFO
