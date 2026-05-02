import React from 'react'

export default function ProgressBar({ current, total, score }) {
  const progress = (current / total) * 100

  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
      }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Soru {current} / {total}
        </span>
        <span style={{
          color: 'var(--gold)',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: '0.95rem',
        }}>
          ⚡ {score} puan
        </span>
      </div>

      {/* Progress track */}
      <div style={{
        height: '6px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '999px',
        overflow: 'hidden',
      }}>
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--purple), var(--teal))',
            borderRadius: '999px',
            transition: 'width 0.4s ease',
            boxShadow: '0 0 8px rgba(167,139,250,0.6)',
          }}
        />
      </div>

      {/* Step dots */}
      <div style={{
        display: 'flex',
        gap: '4px',
        marginTop: '8px',
        justifyContent: 'center',
      }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: i < current
              ? 'var(--teal)'
              : i === current - 1
                ? 'var(--purple)'
                : 'rgba(255,255,255,0.1)',
            transition: 'background 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  )
}
