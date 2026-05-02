import { useState, useEffect } from 'react'
      try {
        const res = await fetch(CATEGORIES_URL)
        if (!res.ok) throw new Error('Categories could not be loaded')
        const data = await res.json()
        setCategories(data.trivia_categories)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return { categories, loading, error }
}

export async function fetchQuestions({ categoryId, difficulty, amount }) {
  const decode = (str) => {
    const txt = document.createElement('textarea')
    txt.innerHTML = str
    return txt.value
  }

  const params = new URLSearchParams({
    amount,
    difficulty,
    type: 'multiple',
    ...(categoryId && { category: categoryId }),
  })

  const res = await fetch(`https://opentdb.com/api.php?${params}`)
  if (!res.ok) throw new Error('Questions could not be loaded')

  const data = await res.json()

  if (data.response_code === 5) {
    throw new Error('Too many requests. Please wait a few seconds.')
  }

  if (data.response_code !== 0) {
    throw new Error('Not enough questions found. Try another category.')
  }

  return data.results.map((q) => {
    const options = [...q.incorrect_answers, q.correct_answer]
      .map(decode)
      .sort(() => Math.random() - 0.5)

    return {
      question: decode(q.question),
      correctAnswer: decode(q.correct_answer),
      options,
      category: decode(q.category),
      difficulty: q.difficulty,
    }
  })
}