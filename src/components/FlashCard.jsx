import { useState } from 'react'
import ProgressBar from './ProgressBar'
import confetti from 'canvas-confetti'

export default function FlashCard({ question, onAnswer, current, total, score }) {
  const [selected, setSelected] = useState(null)

  const handleSelect = (option) => {
    if (selected) return
    setSelected(option)

    const correct = option === question.correctAnswer

    if (correct) {
      confetti({ particleCount: 180, spread: 90, origin: { y: 0.6 } })
    }

    onAnswer(correct, question.question, option)
  }

  return (
    <div className="quiz-card glass-card">
      <ProgressBar current={current} total={total} />

      <div className="quiz-meta">
        <span>{question.category}</span>
        <span>Score: {score}</span>
      </div>

      <h2>{question.question}</h2>

      <div className="options-grid">
        {question.options.map((option, index) => {
          let className = 'option-btn'
          if (selected) {
            if (option === question.correctAnswer) className += ' correct'
            else if (option === selected) className += ' wrong'
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}