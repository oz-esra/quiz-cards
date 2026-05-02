import { useState } from 'react'
import CategorySelector from './components/CategorySelector'
import FlashCard from './components/FlashCard'
import ScoreBoard from './components/ScoreBoard'
import { fetchQuestions } from './hooks/useTriviaAPI'

// Phase: 'setup' | 'quiz' | 'results'
export default function App() {
  const [phase, setPhase] = useState('setup')
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const startQuiz = async (settings) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchQuestions(settings)
      setQuestions(data)
      setCurrentIndex(0)
      setScore(0)
      setAnswers([])
      setPhase('quiz')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (isCorrect, question, selectedAnswer) => {
    if (isCorrect) setScore((s) => s + 1)

    setAnswers((prev) => [
      ...prev,
      { question, selectedAnswer, isCorrect },
    ])

    // 1.2 saniye bekle, sonra sonraki soruya geç
    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        setPhase('results')
      } else {
        setCurrentIndex((i) => i + 1)
      }
    }, 1200)
  }

  const restart = () => {
    setPhase('setup')
    setQuestions([])
    setError(null)
  }

  return (
    <div className="app">
      {error && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(248,113,113,0.1)',
          border: '1px solid var(--coral)',
          color: 'var(--coral)',
          padding: '12px 20px',
          borderRadius: '12px',
          zIndex: 100,
          fontSize: '0.9rem',
          maxWidth: '400px',
          textAlign: 'center',
        }}>
          ⚠️ {error}
          <button
            onClick={() => setError(null)}
            style={{ marginLeft: '12px', background: 'none', border: 'none', color: 'var(--coral)', cursor: 'pointer', fontWeight: 700 }}
          >
            ✕
          </button>
        </div>
      )}

      {phase === 'setup' && (
        <CategorySelector onStart={startQuiz} loading={loading} />
      )}

      {phase === 'quiz' && questions[currentIndex] && (
        <FlashCard
          key={currentIndex}
          question={questions[currentIndex]}
          onAnswer={handleAnswer}
          current={currentIndex + 1}
          total={questions.length}
          score={score}
        />
      )}

      {phase === 'results' && (
        <ScoreBoard
          score={score}
          total={questions.length}
          answers={answers}
          onRestart={restart}
        />
      )}
    </div>
  )
}
