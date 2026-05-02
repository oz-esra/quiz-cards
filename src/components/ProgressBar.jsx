export default function ProgressBar({ current, total }) {
  const percent = (current / total) * 100

  return (
    <div className="progress-wrapper">
      <div className="progress-label">Question {current} / {total}</div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  )
}