import { useState } from "react"
import type { Question } from "../data/epfo"

type QuestionnaireProps = {
  questions: Question[]
  onComplete: (answers: Record<string, string>) => void
  onBack: () => void
}

function Questionnaire({
  questions,
  onComplete,
  onBack,
}: QuestionnaireProps) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const question = questions[questionIndex]

  const handleAnswer = (answer: string) => {
    const updatedAnswers = {
      ...answers,
      [question.id]: answer,
    }

    setAnswers(updatedAnswers)

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      onComplete(updatedAnswers)
    }
  }

  return (
    <main className="page question-page">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <p className="question-progress">
        Question {questionIndex + 1} of {questions.length}
      </p>

      <div className="progress-track" aria-hidden="true">
        <span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
      </div>

      <section className="question-card">
        <p className="eyebrow">A quick question</p>
        <h1>{question.question}</h1>

        <div className="answer-actions">
          <button className="answer-button" onClick={() => handleAnswer("yes")}>
            <span>Yes</span><span aria-hidden="true">→</span>
          </button>

          <button className="answer-button" onClick={() => handleAnswer("no")}>
            <span>No</span><span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </main>
  )
}

export default Questionnaire
