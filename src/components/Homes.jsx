import { useState, useEffect } from 'react'
import { useAppSelector } from '../store/hooks.js'
import './Homes.scss'

const Homes = () => {
  const { data, loading, error } = useAppSelector(state => state.property)
  const [homes, setHomes] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (data && data.homes) {
      // Transform the data to match our Home interface
      const transformedHomes = data.homes.map((home, index) => ({
        id: home.id || String(index + 1),
        name: home.name || home.title || `Property ${index + 1}`,
        price: formatPrice(home.price || home.listPrice),
        bedrooms: home.bedrooms || home.beds || 0,
        bathrooms: home.bathrooms || home.baths || 0,
        sqft: formatSqft(home.sqft || home.squareFeet || home.area),
        image: home.image || home.photo || home.mainImage || `/home-${index + 1}.jpg`,
        status: determineStatus(home),
        address: home.address,
        description: home.description,
        features: home.features || home.amenities,
        ...home
      }))
      
      setHomes(transformedHomes)
    } else if (!loading) {
      // Use mock data if no data available
      setHomes(getMockHomes())
    }
  }, [data, loading])

  const formatPrice = (price) => {
    if (typeof price === 'string') return price
    if (typeof price === 'number') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price)
    }
    return 'Price Upon Request'
  }

  const formatSqft = (sqft) => {
    if (typeof sqft === 'string') return sqft
    if (typeof sqft === 'number') {
      return new Intl.NumberFormat('en-US').format(sqft)
    }
    return 'N/A'
  }

  const determineStatus = (home) => {
    if (home.status) {
      const status = home.status.toLowerCase()
      if (status.includes('available') || status.includes('active')) return 'available'
      if (status.includes('pending') || status.includes('contract')) return 'pending'
      if (status.includes('sold') || status.includes('closed')) return 'sold'
    }
    return 'available'
  }

  const getMockHomes = () => [
    {
      id: '1',
      name: 'Ocean View Villa',
      price: '$3,500,000',
      bedrooms: 4,
      bathrooms: 4.5,
      sqft: '4,200',
      image: '/home-1.jpg',
      status: 'available'
    },
    {
      id: '2',
      name: 'Golf Course Estate',
      price: '$2,800,000',
      bedrooms: 3,
      bathrooms: 3.5,
      sqft: '3,600',
      image: '/home-2.jpg',
      status: 'available'
    },
    {
      id: '3',
      name: 'Garden Cottage',
      price: '$1,950,000',
      bedrooms: 2,
      bathrooms: 2,
      sqft: '2,400',
      image: '/home-3.jpg',
      status: 'pending'
    }
  ]

  const filteredHomes = homes.filter(home => 
    filter === 'all' || home.status === filter
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'status-available'
      case 'pending': return 'status-pending'
      case 'sold': return 'status-sold'
      default: return ''
    }
  }

  if (loading) {
    return (
      <div className="homes-loading">
        <div className="spinner"></div>
        <p>Loading homes...</p>
      </div>
    )
  }

  if (error && homes.length === 0) {
    return (
      <div className="homes-error">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="homes-container">
      <div className="homes-header">
        <h2>Available Homes</h2>
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'available' ? 'active' : ''}
            onClick={() => setFilter('available')}
          >
            Available
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
        </div>
      </div>

      <div className="homes-grid">
        {filteredHomes.map(home => (
          <div key={home.id} className="home-card">
            <div className="home-image">
              <img 
                src={home.image} 
                alt={home.name}
                onError={(e) => {
                  e.target.src = '/placeholder-home.jpg'
                }}
              />
              <div className={`home-status ${getStatusColor(home.status)}`}>
                {home.status}
              </div>
            </div>
            <div className="home-details">
              <h3>{home.name}</h3>
              <p className="home-price">{home.price}</p>
              <div className="home-specs">
                <span>{home.bedrooms} BD</span>
                <span>{home.bathrooms} BA</span>
                <span>{home.sqft} sq ft</span>
              </div>
              {home.address && (
                <p className="home-address">{home.address}</p>
              )}
              <button className="home-cta">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Homes