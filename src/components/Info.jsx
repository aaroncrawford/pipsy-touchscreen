const Info = () => {
  return (
    <div className="p-12 h-full overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-100">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-wide">Welcome to Kukuiula</h1>
        <p className="text-xl text-gray-600 font-light">A Private Club Community on Kauai's South Shore</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
        <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
          <div className="text-5xl mb-4 bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent">⛳</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Championship Golf</h3>
          <p className="text-gray-600 leading-relaxed">18-hole Tom Weiskopf signature golf course with stunning ocean views and year-round perfect conditions.</p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
          <div className="text-5xl mb-4 bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent">🏖️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Beach Club</h3>
          <p className="text-gray-600 leading-relaxed">Exclusive beach access with full-service amenities, water sports, and beachside dining experiences.</p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
          <div className="text-5xl mb-4 bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Fine Dining</h3>
          <p className="text-gray-600 leading-relaxed">Multiple restaurants offering farm-to-table cuisine, fresh seafood, and world-class culinary experiences.</p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
          <div className="text-5xl mb-4 bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent">🧘</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Spa & Wellness</h3>
          <p className="text-gray-600 leading-relaxed">Full-service spa, fitness center, and wellness programs designed for relaxation and rejuvenation.</p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
          <div className="text-5xl mb-4 bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent">🎾</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recreation</h3>
          <p className="text-gray-600 leading-relaxed">Tennis courts, swimming pools, hiking trails, and a variety of activities for all ages.</p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
          <div className="text-5xl mb-4 bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent">🏡</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom Homes</h3>
          <p className="text-gray-600 leading-relaxed">Luxury homes and homesites with architectural excellence and breathtaking views throughout the community.</p>
        </div>
      </div>

      <div className="text-center p-8">
        <p className="text-xl text-gray-700 italic">Discover the lifestyle that awaits you at Kukuiula</p>
      </div>
    </div>
  )
}

export default Info