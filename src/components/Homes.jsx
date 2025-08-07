import { useState, useEffect } from 'react'
import { useAppSelector } from '../store/hooks.js'

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-12 h-12 border-3 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 text-lg">Loading homes...</p>
      </div>
    )
  }

  if (error && homes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-red-600 text-lg mb-6">{error}</p>
      </div>
    )
  }

  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 m-0">Available Homes</h2>
        <div className="flex gap-2">
          <button 
            className={`px-6 py-3 border-none rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 shadow-sm ${
              filter === 'all' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : 'bg-white text-gray-600 hover:bg-gray-200 hover:-translate-y-0.5'
            }`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-6 py-3 border-none rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 shadow-sm ${
              filter === 'available' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : 'bg-white text-gray-600 hover:bg-gray-200 hover:-translate-y-0.5'
            }`}
            onClick={() => setFilter('available')}
          >
            Available
          </button>
          <button 
            className={`px-6 py-3 border-none rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 shadow-sm ${
              filter === 'pending' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : 'bg-white text-gray-600 hover:bg-gray-200 hover:-translate-y-0.5'
            }`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8 pb-8">
        {filteredHomes.map(home => (
          <div key={home.id} className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl group">
            <div className="relative w-full h-64 overflow-hidden">
              <img 
                src={home.image} 
                alt={home.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = '/placeholder-home.jpg'
                }}
              />
              <div className={`absolute top-4 right-4 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wide text-white ${
                home.status === 'available' ? 'bg-green-500' : 
                home.status === 'pending' ? 'bg-orange-500' : 
                'bg-gray-500'
              }`}>
                {home.status}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 m-0 mb-3">{home.name}</h3>
              <p className="text-2xl font-bold text-blue-600 m-0 mb-4">{home.price}</p>
              <div className="flex gap-6 mb-6">
                <span className="text-gray-600 text-sm font-medium">{home.bedrooms} BD</span>
                <span className="text-gray-600 text-sm font-medium">{home.bathrooms} BA</span>
                <span className="text-gray-600 text-sm font-medium">{home.sqft} sq ft</span>
              </div>
              {home.address && (
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{home.address}</p>
              )}
              <button className="w-full py-3.5 bg-blue-600 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Homes