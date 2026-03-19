import { useState } from 'react'

const QUESTIONS = [
  { q: 'Which plant is known as the "King of Spices"?', options: ['Cardamom', 'Turmeric', 'Black Pepper', 'Cinnamon'], answer: 2, fact: 'Black pepper is native to Kerala\'s Western Ghats and was once used as currency!' },
  { q: 'What is Kerala\'s state fruit?', options: ['Mango', 'Jackfruit', 'Banana', 'Coconut'], answer: 1, fact: 'Jackfruit is Kerala\'s state fruit and the world\'s largest tree-borne fruit.' },
  { q: 'Which plant is called the "Queen of Spices"?', options: ['Black Pepper', 'Clove', 'Cardamom', 'Nutmeg'], answer: 2, fact: 'Cardamom grows in Kerala\'s Idukki district and is the third most expensive spice in the world.' },
  { q: 'What does "Kerala" literally mean?', options: ['Land of Spices', 'Land of Coconuts', 'Land of Rivers', 'Land of Hills'], answer: 1, fact: 'Kerala derives from "Kera" (coconut tree) and "alam" (land) — Land of Coconuts.' },
  { q: 'Tulsi is known as what in English?', options: ['Sweet Basil', 'Holy Basil', 'Thai Basil', 'Lemon Basil'], answer: 1, fact: 'Holy Basil (Ocimum tenuiflorum) is sacred in Hinduism and has powerful medicinal properties.' },
  { q: 'Which plant is a natural mosquito repellent?', options: ['Hibiscus', 'Neem', 'Tulsi', 'Both Neem and Tulsi'], answer: 3, fact: 'Both Neem and Tulsi have natural insect-repelling properties used for centuries in India.' },
  { q: 'How long does a Hibiscus flower bloom?', options: ['3 days', '1 week', '1 day', '2 days'], answer: 2, fact: 'Each Hibiscus flower blooms for just one day but the plant produces new flowers continuously.' },
  { q: 'Which Kerala plant drove European exploration?', options: ['Cardamom', 'Turmeric', 'Black Pepper', 'Ginger'], answer: 2, fact: 'The desire for Kerala\'s black pepper was a major reason Europeans explored sea routes to India.' },
]

export default function Quiz({ showToast }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showFact, setShowFact] = useState(false)
  const [done, setDone] = useState(false)
  const [answers, setAnswers] = useState([])

  function handleAnswer(idx) {
    if (selected !== null) return
    setSelected(idx)
    setShowFact(true)
    const correct = idx === QUESTIONS[current].answer
    if (correct) setScore(s => s + 1)
    setAnswers(a => [...a, { selected: idx, correct }])
  }

  function next() {
    if (current + 1 >= QUESTIONS.length) {
      setDone(true)
      showToast(`Quiz done! You scored ${score + (selected === QUESTIONS[current].answer ? 1 : 0)}/${QUESTIONS.length} 🌿`)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setShowFact(false)
    }
  }

  function restart() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowFact(false)
    setDone(false)
    setAnswers([])
  }

  if (done) {
    const final = score
    const pct = Math.round((final / QUESTIONS.length) * 100)
    return (
      <div className="quiz-page">
        <div className="quiz-done glass fade-in">
          <div className="quiz-done-emoji">{pct >= 80 ? '🏆' : pct >= 50 ? '🌿' : '🌱'}</div>
          <h2 className="quiz-done-title">{pct >= 80 ? 'Plant Expert!' : pct >= 50 ? 'Good job!' : 'Keep learning!'}</h2>
          <div className="quiz-done-score">{final} / {QUESTIONS.length}</div>
          <div className="quiz-done-pct">{pct}% correct</div>
          <div className="quiz-answers-review">
            {QUESTIONS.map((q, i) => (
              <div key={i} className={`review-item ${answers[i]?.correct ? 'correct' : 'wrong'}`}>
                <span className="review-icon">{answers[i]?.correct ? '✅' : '❌'}</span>
                <span className="review-q">{q.q}</span>
              </div>
            ))}
          </div>
          <button className="btn primary" onClick={restart}>Try Again</button>
        </div>
      </div>
    )
  }

  const q = QUESTIONS[current]
  const progress = ((current) / QUESTIONS.length) * 100

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h1>Plant Quiz 🌿</h1>
        <p>Test your knowledge of Kerala's incredible flora</p>
      </div>

      <div className="quiz-progress-wrap">
        <div className="quiz-progress-track">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="quiz-progress-label">{current + 1} / {QUESTIONS.length}</span>
      </div>

      <div className="quiz-card glass fade-in" key={current}>
        <div className="quiz-score-badge">Score: {score}</div>
        <div className="quiz-q-num">Question {current + 1}</div>
        <h2 className="quiz-question">{q.q}</h2>
        <div className="quiz-options">
          {q.options.map((opt, i) => {
            let cls = 'quiz-option'
            if (selected !== null) {
              if (i === q.answer) cls += ' correct'
              else if (i === selected && i !== q.answer) cls += ' wrong'
              else cls += ' dimmed'
            }
            return (
              <button key={i} className={cls} onClick={() => handleAnswer(i)}>
                <span className="option-letter">{['A','B','C','D'][i]}</span>
                {opt}
              </button>
            )
          })}
        </div>

        {showFact && (
          <div className="quiz-fact fade-in">
            <span className="fact-icon">💡</span>
            <span>{q.fact}</span>
          </div>
        )}

        {selected !== null && (
          <button className="btn primary quiz-next" onClick={next}>
            {current + 1 >= QUESTIONS.length ? 'See Results' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  )
}