import React from 'react'

function getGrade(score, total) {
  const pct = (score / total) * 100
  if (pct === 100) return { emoji: '🏆', label: 'Mükemmel!',    color: 'var(--gold)' }
  if (pct >= 80)  return { emoji: '🌟', label: 'Harika!',       color: 'var(--success)' }
  if (pct >= 60)  return { emoji: '👍', label: 'İyi İş!',       color: 'var(--teal)' }
  if (pct >= 40)  return { emoji: '📚', label: 'Pratik Yap!',   color: 'var(--purple)' }
  return           { emoji: '💪', label: 'Dene Tekrar!',         color: 'var(--coral)' }
}

export default function ScoreBoard({ score, total, answers, onRestart }) {
  const grade = getGrade(score, total)
  const pct = Math.round((score / total) * 100)

  return (
    <div className="fade-in-up" style={{ width: '100%', maxWidth: '560px' }}>
      {/* Hero score */}
      <div className="card" style={{ textAlign: 'center', marginBottom: '16px', padding: '40px 32px' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '12px', lineHeight: 1 }}>
          {grade.emoji}
        </div>
        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: '3rem',
          color: grade.color,
          lineHeight: 1,
          marginBottom: '6px',
        }}>
          {score}/{total}
        </h1>
        <p style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: grade.color,
          marginBottom: '20px',
        }}>
          {grade.label} — %{pct} başarı
        </p>

        {/* Score bar */}
        <div style={{
          height: '8px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '999px',
          overflow: 'hidden',
          marginBottom: '28px',
        }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: `linear-gradient(90deg, var(--purple), ${grade.color})`,
            borderRadius: '999px',
            transition: 'width 1s ease',
          }} />
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={onRestart}>
            🔄 Yeni Quiz
          </button>
        </div>
      </div>

      {/* Answer review */}
      <div style={{
        fontFamily: 'Syne, sans-serif',
        fontWeight: 700,
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '10px',
        paddingLeft: '4px',
      }}>
        Cevap Özeti
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '320px', overflowY: 'auto' }}>
        {answers.map((a, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'var(--bg-card)',
            border: `1px solid ${a.isCorrect ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.15)'}`,
          }}>
            <span style={{
              fontSize: '1rem',
              flexShrink: 0,
              marginTop: '1px',
            }}>
              {a.isCorrect ? '✅' : '❌'}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.4,
                marginBottom: a.isCorrect ? 0 : '4px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}>
                {a.question.question}
              </p>
              {!a.isCorrect && (
                <p style={{ fontSize: '0.8rem', color: 'var(--success)' }}>
                  ✓ {a.question.correctAnswer}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
