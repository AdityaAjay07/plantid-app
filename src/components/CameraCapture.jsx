import { useRef, useEffect } from 'react'

export default function CameraCapture({ onCapture, onClose }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => { streamRef.current = stream; videoRef.current.srcObject = stream })
      .catch(() => { alert('Camera access denied.'); onClose() })
    return () => streamRef.current?.getTracks().forEach(t => t.stop())
  }, [])

  function snap() {
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0)
    onCapture(canvas.toDataURL('image/jpeg', 0.92))
    streamRef.current?.getTracks().forEach(t => t.stop())
  }

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal glass" onClick={(e) => e.stopPropagation()}>
        <h3>Take a photo 📸</h3>
        <video ref={videoRef} autoPlay playsInline className="camera-feed" />
        <div className="camera-btn-row">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={snap}>Capture</button>
        </div>
      </div>
    </div>
  )
}