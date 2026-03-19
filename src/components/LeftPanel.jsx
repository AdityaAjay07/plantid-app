import { useEffect, useRef } from 'react'

function TiltCard({ children, className }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    function onMove(e) {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rotateX = ((y - cy) / cy) * -12
      const rotateY = ((x - cx) / cx) * 12
      el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`
      el.style.boxShadow = `0 16px 40px rgba(29,158,117,0.3)`
    }
    function onLeave() {
      el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)'
      el.style.boxShadow = 'none'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])
  return <div ref={ref} className={className} style={{ transition: 'transform 0.15s ease, box-shadow 0.2s ease' }}>{children}</div>
}

const LOCAL_PLANTS = [
  { name: 'Hibiscus', emoji: '🌺' },
  { name: 'Coconut Palm', emoji: '🌴' },
  { name: 'Tulsi', emoji: '🌿' },
  { name: 'Banana', emoji: '🍌' },
  { name: 'Jackfruit', emoji: '🌳' },
  { name: 'Neem', emoji: '🍃' },
]

export default function LeftPanel({ history, streak, onShowHistory }) {
  const totalScans = history.length
  const thisWeek = history.filter(h => {
    const d = new Date(h.date)
    const now = new Date()
    const diff = (now - d) / (1000 * 60 * 60 * 24)
    return diff <= 7
  }).length

  return (
    <aside className="left-panel">
      <TiltCard className="panel-section glass">
        <div className="panel-title">Your Stats</div>
        <div className="stats-grid">
          <div className="stat-chip">
            <div className="stat-num">{totalScans}</div>
            <div className="stat-label">Total Scans</div>
          </div>
          <div className="stat-chip">
            <div className="stat-num">{thisWeek}</div>
            <div className="stat-label">This Week</div>
          </div>
          <div className="stat-chip">
            <div className="stat-num">🔥{streak}</div>
            <div className="stat-label">Streak</div>
          </div>
          <div className="stat-chip">
            <div className="stat-num">{new Set(history.map(h => h.family)).size || 0}</div>
            <div className="stat-label">Families</div>
          </div>
        </div>
      </TiltCard>

      <TiltCard className="panel-section glass">
        <div className="panel-title">Recent Scans</div>
        {history.length === 0
          ? <div className="panel-empty">No scans yet. Upload a plant! 🌱</div>
          : <div className="recent-list">
              {history.slice(0, 6).map((entry, i) => (
                <div key={i} className="recent-item">
                  {entry.image
                    ? <img src={entry.image} className="recent-thumb" alt={entry.commonName} />
                    : <div className="recent-thumb-placeholder">🌿</div>
                  }
                  <div className="recent-info">
                    <div className="recent-name">{entry.commonName}</div>
                    <div className="recent-date">{entry.date}</div>
                  </div>
                  <div className="recent-conf">{entry.confidence}%</div>
                </div>
              ))}
            </div>
        }
      </TiltCard>

      <TiltCard className="panel-section glass">
        <div className="panel-title">Common in Kerala 🌴</div>
        <div className="local-plants">
          {LOCAL_PLANTS.map((p, i) => (
            <div key={i} className="local-tag">
              <span>{p.emoji}</span> {p.name}
            </div>
          ))}
        </div>
      </TiltCard>
    </aside>
  )
}