export default function History({ history, onClose, onSelect }) {
  return (
    <div className="history-page">
      <div className="history-header">
        <h2>Your Plant Journal 🌿</h2>
        <button className="btn" onClick={onClose}>Back</button>
      </div>
      {history.length === 0
        ? <div className="empty-history">No plants identified yet. Go scan something! 🌱</div>
        : <div className="history-grid">
            {history.map((entry, i) => (
              <div key={i} className="history-card glass" onClick={() => onSelect(entry)}>
                {entry.image && <img src={entry.image} alt={entry.commonName} className="history-img" />}
                <div className="history-info">
                  <div className="history-name">{entry.commonName}</div>
                  <div className="history-sci">{entry.scientificName}</div>
                  <div className="history-date">{entry.date}</div>
                  <div className="history-conf">{entry.confidence}% match</div>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  )
}