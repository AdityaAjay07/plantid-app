import { useRef, useState } from 'react'

export default function UploadZone({ onImageLoaded }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  function processFile(file) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => onImageLoaded(e.target.result, file.type || 'image/jpeg')
    reader.readAsDataURL(file)
  }

  return (
    <div
      className={`upload-zone ${dragging ? 'drag-over' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); processFile(e.dataTransfer.files[0]) }}
      onClick={() => inputRef.current.click()}
    >
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => processFile(e.target.files[0])} />
      <div className="upload-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      </div>
      <h3>Drop a plant photo here</h3>
      <p>or click to browse — supports JPG, PNG, WEBP</p>
      <div className="upload-leaves">
        <span className="ul1">🌿</span>
        <span className="ul2">🍃</span>
        <span className="ul3">🌱</span>
      </div>
    </div>
  )
}