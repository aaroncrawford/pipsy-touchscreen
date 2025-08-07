import './Info.scss'

const Info = () => {
  return (
    <div className="info-container">
      <div className="info-hero">
        <h1>Welcome to Kukuiula</h1>
        <p className="info-subtitle">A Private Club Community on Kauai's South Shore</p>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <div className="info-icon">🏌️</div>
          <h3>Championship Golf</h3>
          <p>18-hole Tom Weiskopf signature golf course with stunning ocean views and year-round perfect conditions.</p>
        </div>

        <div className="info-card">
          <div className="info-icon">🏖️</div>
          <h3>Beach Club</h3>
          <p>Exclusive beach access with full-service amenities, water sports, and beachside dining experiences.</p>
        </div>

        <div className="info-card">
          <div className="info-icon">🍽️</div>
          <h3>Fine Dining</h3>
          <p>Multiple restaurants offering farm-to-table cuisine, fresh seafood, and world-class culinary experiences.</p>
        </div>

        <div className="info-card">
          <div className="info-icon">🧘</div>
          <h3>Spa & Wellness</h3>
          <p>Full-service spa, fitness center, and wellness programs designed for relaxation and rejuvenation.</p>
        </div>

        <div className="info-card">
          <div className="info-icon">🎾</div>
          <h3>Recreation</h3>
          <p>Tennis courts, swimming pools, hiking trails, and a variety of activities for all ages.</p>
        </div>

        <div className="info-card">
          <div className="info-icon">🏡</div>
          <h3>Custom Homes</h3>
          <p>Luxury homes and homesites with architectural excellence and breathtaking views throughout the community.</p>
        </div>
      </div>

      <div className="info-footer">
        <p>Discover the lifestyle that awaits you at Kukuiula</p>
      </div>
    </div>
  )
}

export default Info