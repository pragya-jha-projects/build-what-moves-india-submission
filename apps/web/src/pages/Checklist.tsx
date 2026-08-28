import { getEPFOGuidance } from "../data/epfo"

import type { ChecklistItem } from "../data/epfo"

type ChecklistProps = {
    answers: Record<string, string>
    items: ChecklistItem[]
}

function Checklist({ answers, items }: ChecklistProps) {
    const guidance = getEPFOGuidance(answers)
    return (
        <main className="page checklist-page">
            <section className="completion-banner">
              <span aria-hidden="true">✓</span>
              <div>
                <p className="eyebrow">Your next steps</p>
                <h1>You’re ready to get started.</h1>
              </div>
            </section>

            <p>
                Based on your answers, here's what you should have
                ready before continuing.
            </p>

            <h2>Your personalized guidance</h2>

            <section className="guidance-list">
              {guidance.map((item) => (
                <article className="guidance-card" key={item.id}>
                    <span aria-hidden="true">✓</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </article>
              ))}
            </section>

            <h2>Things to have ready</h2>

            <ul className="checklist">
                {items.map((item) => (
                    <li key={item.id}><span aria-hidden="true">□</span>{item.label}</li>
                ))}
            </ul>

            <p className="small-note">Keep this list handy when you begin your EPFO application.</p>
        </main>
    )
}

export default Checklist
