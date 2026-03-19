import { useState, useRef } from 'react'
import UploadZone from '../components/UploadZone'
import CameraCapture from '../components/CameraCapture'
import ResultCard from '../components/ResultCard'
import History from '../components/History'
import PlantOfDay from '../components/PlantOfDay'
import LeftPanel from '../components/LeftPanel'
import RightPanel from '../components/RightPanel'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export default function Home({ history, streak, addToHistory, showToast }) {
  const [image, setImage] = useState(null)
  const [imageBase64, setImageBase64] = useState(null)
  const [mimeType, setMimeType] = useState('image/jpeg')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showCamera, setShowCamera] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  function handleImageLoaded(dataUrl, mime) {
    setImage(dataUrl)
    setImageBase64(dataUrl.split(',')[1])
    setMimeType(mime)
    setResult(null)
    setError(null)
  }

  async function identifyPlant() {
    if (!imageBase64) return
    setLoading(true)
    setError(null)
    setResult(null)

    const prompt = `You are a plant identification expert. Analyze this plant image and return a JSON object with exactly these fields:
{
  "commonName": "string",
  "scientificName": "string",
  "family": "string",
  "origin": "string",
  "climate": "string",
  "confidence": number between 0-100,
  "health": "Healthy" or "Possibly Unhealthy" or "Diseased",
  "healthNote": "brief note on plant health from image",
  "description": "2-3 sentence description",
  "care": {
    "water": "watering frequency",
    "sunlight": "sunlight needs",
    "soil": "soil type",
    "toxic": true or false
  },
  "facts": ["fact1", "fact2", "fact3"],
  "similarPlants": ["plant1", "plant2", "plant3"]
}
Return only valid JSON, no markdown, no extra text.`

    try {
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: mimeType, data: imageBase64 } }] }]
          })
        }
      )
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error?.message || 'API error')
      let raw = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
      raw = raw.replace(/```json|```/g, '').trim()
      const plant = JSON.parse(raw)
      setResult(plant)
      addToHistory(plant, image)
      showToast(`Identified: ${plant.commonName}!`)
    } catch (err) {
      setError(err.message)
      showToast('Something went wrong', 'error')
    } finally {
      setLoading(false)
    }
  }

  function shareResult() {
    if (!result) return
    const text = `I just identified a ${result.commonName} (${result.scientificName}) using PlantID! 🌿 ${result.confidence}% confidence match.`
    if (navigator.share) {
      navigator.share({ title: 'PlantID Result', text })
    } else {
      navigator.clipboard.writeText(text)
      showToast('Result copied to clipboard!')
    }
  }

  return showHistory
    ? <div className="main"><History history={history} onClose={() => setShowHistory(false)} onSelect={(entry) => { setImage(entry.image); setResult(entry); setShowHistory(false) }} /></div>
    : <div className="three-col">
        <LeftPanel history={history} streak={streak} onShowHistory={() => setShowHistory(true)} />
        <main className="main">
          <PlantOfDay />
          <UploadZone onImageLoaded={handleImageLoaded} />
          <div className="btn-row">
            <MagneticBtn className="btn" onClick={() => setShowCamera(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              Camera
            </MagneticBtn>
            <MagneticBtn className="btn primary" onClick={identifyPlant} disabled={!imageBase64 || loading}>
              {loading ? <><div className="btn-spinner" /> Identifying...</> : '🔍 Identify Plant'}
            </MagneticBtn>
            {result && (
              <MagneticBtn className="btn share" onClick={shareResult}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                Share
              </MagneticBtn>
            )}
          </div>

          {showCamera && (
            <CameraCapture
              onCapture={(dataUrl) => { handleImageLoaded(dataUrl, 'image/jpeg'); setShowCamera(false) }}
              onClose={() => setShowCamera(false)}
            />
          )}

          {image && <div className="preview-section"><img src={image} alt="Plant preview" className="preview-img" /></div>}

          {loading && (
            <div className="loading">
              <div className="leaf-loader">
                <div className="leaf l1" /><div className="leaf l2" /><div className="leaf l3" />
              </div>
              <p>Analyzing your plant...</p>
              <p className="loading-sub">Using Gemini AI vision</p>
            </div>
          )}

          {error && <div className="error-box">{error}</div>}
          {result && <ResultCard plant={result} />}
        </main>
        <RightPanel result={result} />
      </div>
}

function MagneticBtn({ children, className, onClick, disabled }) {
  const ref = useRef(null)
  function onMove(e) {
    if (disabled) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
  }
  function onLeave() { ref.current.style.transform = 'translate(0,0)' }
  return (
    <button ref={ref} className={className} onClick={onClick} disabled={disabled}
      onMouseMove={onMove} onMouseLeave={onLeave} style={{ transition: 'transform 0.2s ease' }}>
      {children}
    </button>
  )
}