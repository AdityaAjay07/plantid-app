import { useEffect, useRef, useState } from 'react'

function useTypewriter(text, speed = 50) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    setDisplayed('')
    if (!text) return
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [text])
  return displayed
}

function useTilt(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    function onMove(e) {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rotateX = ((y - cy) / cy) * -8
      const rotateY = ((x - cx) / cx) * 8
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`
    }
    function onLeave() {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])
}

export default function ResultCard({ plant }) {
  const cardRef = useRef(null)
  const typedName = useTypewriter(plant.commonName, 60)
  useTilt(cardRef)

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.opacity = 0
      cardRef.current.style.transform = 'translateY(30px)'
      setTimeout(() => {
        cardRef.current.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
        cardRef.current.style.opacity = 1
        cardRef.current.style.transform = 'translateY(0)'
      }, 50)
    }
  }, [])

  const healthColor = plant.health === 'Healthy' ? '#1D9E75' : plant.health === 'Possibly Unhealthy' ? '#EF9F27' : '#E24B4A'

  return (
    <div className="result-card glass" ref={cardRef} style={{ transition: 'transform 0.15s ease, opacity 0.5s ease' }}>
      <div className="result-header">
        <div>
          <h2>{typedName}<span className="cursor-blink">|</span></h2>
          <div className="sci">{plant.scientificName}</div>
        </div>
        <div className="confidence-badge-wrap">
  <div className="confidence-badge">
    <svg viewBox="0 0 36 36" width="56" height="56">
      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ffffff22" strokeWidth="3"/>
      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#fff" strokeWidth="3"
        strokeDasharray={`${plant.confidence} ${100 - plant.confidence}`}
        strokeDashoffset="25" strokeLinecap="round"/>
    </svg>
    <span className="conf-num">{plant.confidence}%</span>
  </div>
  <span className="conf-label">Match</span>
</div>
      </div>

      <div className="result-body">
        <div className="health-bar">
          <span className="health-dot" style={{ background: healthColor }} />
          <span className="health-label" style={{ color: healthColor }}>{plant.health}</span>
          <span className="health-note">{plant.healthNote}</span>
        </div>

        <div className="info-grid">
          <InfoChip label="Family" value={plant.family} />
          <InfoChip label="Origin" value={plant.origin} />
          <InfoChip label="Climate" value={plant.climate} />
          <InfoChip label="Toxic" value={plant.care?.toxic ? '⚠️ Yes' : '✅ No'} />
        </div>

        <div className="section-title">About</div>
        <p className="desc">{plant.description}</p>

        <div className="section-title">Care Guide</div>
        <div className="care-grid">
          <CareCard icon="💧" label="Water" value={plant.care?.water} />
          <CareCard icon="☀️" label="Sunlight" value={plant.care?.sunlight} />
          <CareCard icon="🪴" label="Soil" value={plant.care?.soil} />
        </div>

        <div className="section-title">Fun Facts</div>
        <ul className="facts-list">
          {plant.facts?.map((f, i) => <li key={i}>{f}</li>)}
        </ul>

        {plant.similarPlants?.length > 0 && (
          <>
            <div className="section-title">Similar Plants</div>
            <div className="similar-plants">
              {plant.similarPlants.map((p, i) => <span key={i} className="similar-tag">{p}</span>)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function InfoChip({ label, value }) {
  return (
    <div className="info-chip glass">
      <div className="chip-label">{label}</div>
      <div className="chip-value">{value}</div>
    </div>
  )
}

function CareCard({ icon, label, value }) {
  return (
    <div className="care-card glass">
      <div className="care-icon">{icon}</div>
      <div className="care-label">{label}</div>
      <div className="care-value">{value}</div>
    </div>
  )
}