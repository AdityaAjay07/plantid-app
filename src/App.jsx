import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Quiz from './pages/Quiz'
import Toast from './components/Toast'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [toast, setToast] = useState(null)
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('plantHistory') || '[]'))
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('streak') || '0'))
  const location = useLocation()

  useEffect(() => { document.body.className = darkMode ? 'dark' : 'light' }, [darkMode])

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  function addToHistory(plant, image) {
    const entry = { ...plant, image, date: new Date().toLocaleDateString() }
    const newHistory = [entry, ...history].slice(0, 20)
    setHistory(newHistory)
    localStorage.setItem('plantHistory', JSON.stringify(newHistory))
    const newStreak = streak + 1
    setStreak(newStreak)
    localStorage.setItem('streak', newStreak)
  }

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="bg-particles">
        {[...Array(12)].map((_, i) => <div key={i} className={`particle p${i}`} />)}
      </div>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} streak={streak} />
      <div className="page-wrap" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home history={history} streak={streak} addToHistory={addToHistory} showToast={showToast} />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/quiz" element={<Quiz showToast={showToast} />} />
        </Routes>
      </div>
      {toast && <Toast message={toast.msg} type={toast.type} />}
    </div>
  )
}