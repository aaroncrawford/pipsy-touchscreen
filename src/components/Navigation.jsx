import { NavLink } from 'react-router-dom'
import './Navigation.scss'

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h1>Kukuiula</h1>
      </div>
      <div className="nav-links">
        <NavLink to="/map" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <span className="nav-icon">🗺️</span>
          <span className="nav-text">Site Map</span>
        </NavLink>
        <NavLink to="/homes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Homes</span>
        </NavLink>
        <NavLink to="/info" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <span className="nav-icon">ℹ️</span>
          <span className="nav-text">Information</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default Navigation