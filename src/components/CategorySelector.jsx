import React, { useState } from 'react'
import { useTriviaCategories } from '../hooks/useTriviaAPI'

const DIFFICULTIES = [
  { value: 'easy',   label: '🌱 Kolay',   color: 'var(--success)' },
  { value: 'medium', label: '🔥 Orta',    color: 'var(--gold)' },
  { value: 'hard',   label: '💀 Zor',     color: 'var(--coral)' },
]

const AMOUNTS = [5, 10, 15, 20]

export default function CategorySelector({ onStart, loading }) {
  const { categories, loading: catLoading } = useTriviaCategories()
  const [categoryId, setCategoryId] = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  const [amount, setAmount] = useState(10)

  const handleStart = () => {
    onStart({ categoryId, difficulty, amount })
  }

  return (
    <div className="fade-in-up" style={{ width: '100%', maxWidth: '480px' }}>
      {/* Logo / Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(45,212,191,0.2))',
          border: '1px solid rgba(167,139,250,0.3)',
          fontSize: '2rem',
          marginBottom: '16px',
        }}>
          🧠
        </div>
        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: '2.4rem',
          background: 'linear-gradient(135deg, var(--purple), var(--teal))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.1,
          marginBottom: '8px',
        }}>
          EduFlash
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Öğrenmeyi oyuna dönüştür
        </p>
      </div>

      {/* Settings Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Category */}
        <div>
          <label style={{
            display: 'block',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 600,
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '8px',
          }}>
            Kategori
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={catLoading}
          >
            <option value="">🌐 Tüm Kategoriler</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label style={{
            display: 'block',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 600,
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '10px',
          }}>
            Zorluk
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {DIFFICULTIES.map((d) => (
              <button
                key={d.value}
                onClick={() => setDifficulty(d.value)}
                style={{
                  flex: 1,
                  padding: '10px 8px',
                  borderRadius: '10px',
                  border: difficulty === d.value
                    ? `1px solid ${d.color}`
                    : '1px solid var(--border)',
                  background: difficulty === d.value
                    ? `${d.color}18`
                    : 'transparent',
                  color: difficulty === d.value ? d.color : 'var(--text-secondary)',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div>
          <label style={{
            display: 'block',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 600,
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '10px',
          }}>
            Soru Sayısı
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {AMOUNTS.map((n) => (
              <button
                key={n}
                onClick={() => setAmount(n)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '10px',
                  border: amount === n
                    ? '1px solid var(--purple)'
                    : '1px solid var(--border)',
                  background: amount === n ? 'rgba(167,139,250,0.12)' : 'transparent',
                  color: amount === n ? 'var(--purple)' : 'var(--text-secondary)',
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          className="btn-primary"
          onClick={handleStart}
          disabled={loading || catLoading}
          style={{ marginTop: '8px' }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span style={{
                width: '16px', height: '16px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: 'white',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                display: 'inline-block',
              }} />
              Sorular yükleniyor...
            </span>
          ) : 'Quize Başla →'}
        </button>

        {/* Badges */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="badge badge-teal">✓ Ücretsiz API</span>
          <span className="badge badge-purple">✓ Gerçek Zamanlı</span>
          <span className="badge badge-gold">✓ 23+ Kategori</span>
        </div>
      </div>
    </div>
  )
}
