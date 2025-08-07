import { useEffect } from 'react'
import './IdleScreen.scss'

const IdleScreen = ({ onInteract }) => {
  useEffect(() => {
    const handleClick = () => {
      onInteract()
    }

    window.addEventListener('click', handleClick)
    window.addEventListener('touchstart', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('touchstart', handleClick)
    }
  }, [onInteract])

  return (
    <div className="idle-screen">
      <div className="idle-content">
        <img 
          src="/welcome-hero.jpg" 
          alt="Welcome to Our Community" 
          className="idle-image"
        />
        <div className="idle-overlay">
          <h1 className="idle-title">Welcome to Kukuiula</h1>
          <p className="idle-subtitle">Tap anywhere to explore</p>
          <div className="pulse-indicator"></div>
        </div>
      </div>
    </div>
  )
}

export default IdleScreen