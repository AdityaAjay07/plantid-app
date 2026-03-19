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

export default function RightPanel({ result }) {
  if (!result) return (
    <aside className="right-panel">
      <TiltCard className="panel-section glass right-empty">
        <div className="empty-icon">🔍</div>
        <div className="empty-title">No plant scanned yet</div>
        <div className="empty-sub">Upload a photo and hit Identify Plant to see detailed info here</div>
      </TiltCard>
      <TiltCard className="panel-section glass">
        <div className="panel-title">Tips for best results</div>
        <ul className="tips-list">
          <li>📸 Take photos in natural daylight</li>
          <li>🌿 Focus on leaves or flowers</li>
          <li>🔍 Avoid blurry or dark images</li>
          <li>🪴 Include the full plant if possible</li>
        </ul>
      </TiltCard>
    </aside>
  )

  const healthColor = result.health === 'Healthy' ? '#1D9E75' : result.health === 'Possibly Unhealthy' ? '#EF9F27' : '#E24B4A'

  return (
    <aside className="right-panel">
      <TiltCard className="panel-section glass">
        <div className="panel-title">Plant Details</div>
        <table className="details-table">
          <tbody>
            <DetailRow label="Family" value={result.family} />
            <DetailRow label="Origin" value={result.origin} />
            <DetailRow label="Climate" value={result.climate} />
            <DetailRow label="Watering" value={result.care?.water} />
            <DetailRow label="Sunlight" value={result.care?.sunlight} />
            <DetailRow label="Soil" value={result.care?.soil} />
            <DetailRow label="Toxic" value={result.care?.toxic ? '⚠️ Yes' : '✅ No'} />
          </tbody>
        </table>
      </TiltCard>

      <TiltCard className="panel-section glass">
        <div className="panel-title">Health Status</div>
        <div className="health-status-pill" style={{ borderColor: healthColor, color: healthColor }}>
          <span className="health-dot-sm" style={{ background: healthColor }} />
          {result.health}
        </div>
        <p className="health-note-text">{result.healthNote}</p>
      </TiltCard>

      <TiltCard className="panel-section glass">
        <div className="panel-title">Confidence</div>
        <div className="conf-bar-wrap">
          <div className="conf-bar-track">
            <div className="conf-bar-fill" style={{ width: `${result.confidence}%` }} />
          </div>
          <span className="conf-bar-label">{result.confidence}%</span>
        </div>
      </TiltCard>

      {result.similarPlants?.length > 0 && (
        <TiltCard className="panel-section glass">
          <div className="panel-title">Similar Plants</div>
          <div className="similar-panel-tags">
            {result.similarPlants.map((p, i) => (
              <span key={i} className="similar-tag">{p}</span>
            ))}
          </div>
        </TiltCard>
      )}

      {result.facts?.length > 0 && (
        <TiltCard className="panel-section glass">
          <div className="panel-title">Did You Know</div>
          <ul className="panel-facts">
            {result.facts.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </TiltCard>
      )}
    </aside>
  )
}

function DetailRow({ label, value }) {
  return (
    <tr className="detail-row">
      <td className="detail-label">{label}</td>
      <td className="detail-value">{value}</td>
    </tr>
  )
}