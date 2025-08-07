import { useEffect } from 'react'

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
    <div className="fixed top-0 left-0 w-screen h-screen bg-black flex items-center justify-center cursor-pointer">
      <div className="relative w-full h-full max-w-[calc(100vh*16/9)] aspect-video mx-auto">
        <img 
          src="/welcome-hero.jpg" 
          alt="Welcome to Our Community" 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-black/50 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-6xl md:text-8xl font-light mb-4 tracking-wider drop-shadow-lg">Welcome to Kukuiula</h1>
          <p className="text-xl md:text-2xl font-light opacity-90 mb-12 drop-shadow-sm">Tap anywhere to explore</p>
          <div className="w-15 h-15 border-2 border-white/80 rounded-full relative animate-pulse">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white/90 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdleScreen