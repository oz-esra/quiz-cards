export default function ScoreBoard({ score, total, answers, onRestart }) {
  return (
    <div className="results-card glass-card">
      <h1>Your Score</h1>
      <h2>{score} / {total}</h2>

      <div className="results-list">
        {answers.map((item, index) => (
          <div key={index} className={`result-item ${item.isCorrect ? 'correct' : 'wrong'}`}>
            <p>{item.question}</p>
            <span>{item.selectedAnswer}</span>
          </div>
        ))}
      </div>

      <button className="start-btn" onClick={onRestart}>
        Play Again
      </button>
    </div>
  )
}