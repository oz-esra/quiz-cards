import { useState } from 'react'
import CategorySelector from './components/CategorySelector'
import FlashCard from './components/FlashCard'
import ScoreBoard from './components/ScoreBoard'
import { fetchQuestions } from './hooks/useTriviaAPI'

export default function App() {
  const [phase, setPhase] = useState('setup')
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [theme, setTheme] = useState('dark')

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

    setAnswers((prev) => [...prev, { question, selectedAnswer, isCorrect }])

    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        setPhase('results')
      } else {
        setCurrentIndex((i) => i + 1)
      }
    }, 1500)
  }

  const restart = () => {
    setPhase('setup')
    setQuestions([])
    setError(null)
  }

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.body.className = next
  }

  return (
    <div className={`app ${theme}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {error && <div className="error-banner">⚠️ {error}</div>}

      {phase === 'setup' && (
        <CategorySelector onStart={startQuiz} loading={loading} />
      )}

      {phase === 'quiz' && questions[currentIndex] && (
        <FlashCard
          key={currentIndex}
          question={questions[currentIndex]}
          onAnswer={handleAnswer}
          current={currentIndex + 1}
}