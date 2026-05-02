import { useState } from 'react'
import { useTriviaCategories } from '../hooks/useTriviaAPI'

export default function CategorySelector({ onStart, loading }) {
  const { categories } = useTriviaCategories()
  const [categoryId, setCategoryId] = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  const [amount, setAmount] = useState(10)

  return (
    <div className="setup-card glass-card">
      <h1>EduFlash</h1>
      <p>Transform learning into an immersive challenge</p>

      <label>Category</label>
      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <label>Difficulty</label>
      <div className="difficulty-row">
        {['easy', 'medium', 'hard'].map((level) => (
          <button
            key={level}
            className={difficulty === level ? 'active' : ''}
            onClick={() => setDifficulty(level)}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      <label>Number of Questions</label>
      <div className="amount-row">
        {[5, 10, 15, 20].map((num) => (
          <button
            key={num}
            className={amount === num ? 'active' : ''}
            onClick={() => setAmount(num)}
          >
            {num}
          </button>
        ))}
      </div>

      <button className="start-btn" onClick={() => onStart({ categoryId, difficulty, amount })}>
        {loading ? 'Loading...' : 'Start Quiz →'}
      </button>
    </div>
  )
}