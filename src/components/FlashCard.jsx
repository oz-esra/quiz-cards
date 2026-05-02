import React, { useState, useEffect } from 'react'
import ProgressBar from './ProgressBar'

const DIFFICULTY_COLORS = {
  easy:   { bg: 'rgba(74,222,128,0.1)',  text: 'var(--success)',  label: 'Kolay' },
  medium: { bg: 'rgba(251,191,36,0.1)',  text: 'var(--gold)',     label: 'Orta'  },
  hard:   { bg: 'rgba(248,113,113,0.1)', text: 'var(--coral)',    label: 'Zor'   },
}

export default function FlashCard({ question, onAnswer, current, total, score }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  // Soru değiştiğinde state'i sıfırla
  useEffect(() => {
    setSelected(null)
    setRevealed(false)
  }, [question])

  const handleSelect = (option) => {
    if (revealed) return
    setSelected(option)
    setRevealed(true)
    const isCorrect = option === question.correctAnswer
    onAnswer(isCorrect, question, option)
  }

  const diffStyle = DIFFICULTY_COLORS[question.difficulty] || DIFFICULTY_COLORS.medium

  const getOptionStyle = (option) => {
    const base = {
      width: '100%',
      padding: '14px 18px',
      borderRadius: '12px',
      border: '1px solid var(--border)',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '0.95rem',
      textAlign: 'left',
      cursor: revealed ? 'default' : 'pointer',
      transition: 'all 0.25s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      lineHeight: 1.4,
    }

    if (!revealed) {
      return {
        ...base,
        ':hover': { borderColor: 'var(--purple)' },
      }
    }

    if (option === question.correctAnswer) {
      return {
        ...base,
        background: 'rgba(74,222,128,0.1)',
        borderColor: 'var(--success)',
        color: 'var(--success)',
      }
    }

    if (option === selected) {
      return {
        ...base,
        background: 'rgba(248,113,113,0.1)',
        borderColor: 'var(--coral)',
        color: 'var(--coral)',
      }
    }

    return { ...base, opacity: 0.4 }
  }

  const getOptionIcon = (option) => {
    if (!revealed) return null
    if (option === question.correctAnswer) return '✓'
    if (option === selected) return '✗'
    return null
  }

  return (
    <div className="fade-in-up" style={{ width: '100%', maxWidth: '600px' }}>
      <ProgressBar current={current} total={total} score={score} />

      {/* Question Card */}
      <div className="card" style={{ marginBottom: '16px' }}>
        {/* Meta */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <span className="badge" style={{
            background: diffStyle.bg,
            color: diffStyle.text,
            border: `1px solid ${diffStyle.text}44`,
          }}>
            {diffStyle.label}
          </span>
          <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
            {question.category}
          </span>
        </div>

        {/* Question text */}
        <h2 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: '1.2rem',
          lineHeight: 1.5,
          color: 'var(--text-primary)',
        }}>
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(option)}
            style={getOptionStyle(option)}
            onMouseEnter={(e) => {
              if (!revealed) {
                e.currentTarget.style.borderColor = 'var(--purple)'
                e.currentTarget.style.background = 'rgba(167,139,250,0.05)'
              }
            }}
            onMouseLeave={(e) => {
              if (!revealed) {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.background = 'var(--bg-primary)'
              }
            }}
          >
            {/* Letter indicator */}
            <span style={{
              minWidth: '28px',
              height: '28px',
              borderRadius: '8px',
              background: revealed && option === question.correctAnswer
                ? 'rgba(74,222,128,0.2)'
                : revealed && option === selected
                  ? 'rgba(248,113,113,0.2)'
                  : 'rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '0.8rem',
              flexShrink: 0,
            }}>
              {getOptionIcon(option) || String.fromCharCode(65 + i)}
            </span>
            {option}
          </button>
        ))}
      </div>

      {/* Feedback message */}
      {revealed && (
        <div
          className="fade-in-up"
          style={{
            marginTop: '16px',
            padding: '12px 16px',
            borderRadius: '12px',
            background: selected === question.correctAnswer
              ? 'rgba(74,222,128,0.1)'
              : 'rgba(248,113,113,0.1)',
            border: `1px solid ${selected === question.correctAnswer ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`,
            color: selected === question.correctAnswer ? 'var(--success)' : 'var(--coral)',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 600,
            fontSize: '0.9rem',
            textAlign: 'center',
          }}
        >
          {selected === question.correctAnswer
            ? '🎉 Doğru! Harika gidiyorsun.'
            : `❌ Yanlış. Doğru cevap: "${question.correctAnswer}"`}
        </div>
      )}
    </div>
  )
}
