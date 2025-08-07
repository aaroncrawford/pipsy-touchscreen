class PropertyService {
  constructor() {
    this.client = null
    this.property = null
    
    // Get data attributes from script tag
    const scriptTag = document.querySelector('script[data-client][data-property]')
    if (scriptTag) {
      this.client = scriptTag.getAttribute('data-client')
      this.property = scriptTag.getAttribute('data-property')
    }

    // Determine base URL based on environment
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    this.baseUrl = isLocalhost 
      ? 'http://localhost:9000/processProperty'
      : 'https://public1.pipsy.io/payloads'
  }

  async fetchPropertyData() {
    if (!this.client || !this.property) {
      console.error('Missing client or property data attributes')
      return null
    }

    const url = this.baseUrl.includes('localhost')
      ? `${this.baseUrl}/${this.client}-${this.property}`
      : `${this.baseUrl}/${this.client}-${this.property}.json`

    console.log('Fetching property data from:', url)

    try {
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch property data: ${response.status} ${response.statusText}`)
      }
      
      // Check if response has content
      const contentType = response.headers.get('content-type')
      const contentLength = response.headers.get('content-length')
      
      console.log('Response content-type:', contentType)
      console.log('Response content-length:', contentLength)
      
      // First, get the response text to check if it's empty
      const text = await response.text()
      
      if (!text || text.trim().length === 0) {
        console.warn('Response body is empty')
        return null
      }
      
      // Try to parse JSON
      try {
        const data = JSON.parse(text)
        console.log('Fetched property data:', data)
        return data
      } catch (jsonError) {
        console.error('Failed to parse JSON:', jsonError)
        console.log('Response text:', text.substring(0, 200))
        return null
      }
    } catch (error) {
      console.error('Error fetching property data:', error)
      console.error('URL was:', url)
      return null
    }
  }

  getClientId() {
    return this.client
  }

  getPropertyId() {
    return this.property
  }
}

export default new PropertyService()