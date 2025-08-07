import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import { useAppSelector } from "../store/hooks.js"
import "mapbox-gl/dist/mapbox-gl.css"
import "./Map.scss"

// You'll need to add your Mapbox access token
mapboxgl.accessToken =
	"pk.eyJ1IjoiYWFyb25jcmF3Zm9yZCIsImEiOiJja292ejc0ZDAwMTBmMnBsamlkbm04bHphIn0.8NAh0_UJZ38MJFtuKQSapQ"

const Map = () => {
	const mapContainer = useRef(null)
	const [map, setMap] = useState(null)
	const { data, loading } = useAppSelector((state) => state.property)

	useEffect(() => {
		if (map || loading || !data) return // Initialize map only once and wait for data

		if (mapContainer.current) {
			// Use property lat/lng if available, otherwise use defaults
			const defaultCenter = [data.property?.lng, data.property?.lat]
			const defaultZoom = data.property?.zoom || 16

			const map = new mapboxgl.Map({
				container: mapContainer.current,
				//style: "mapbox://styles/mapbox/streets-v12",
				style: "mapbox://styles/mapbox/standard-satellite",
				center: defaultCenter,
				zoom: defaultZoom,
				pitch: 0, // Start with no pitch
				bearing: 0,
				antialias: true,
			})

			// Add navigation controls
			map.addControl(new mapboxgl.NavigationControl(), "top-right")

			// Add scale control
			map.addControl(new mapboxgl.ScaleControl(), "bottom-right")

			// Handle various map events for debugging
			map.on("error", (e) => {
				console.error("Map error:", e)
				if (e.error && e.error.status === 401) {
					console.error("Mapbox token is invalid or unauthorized")
				}
			})

			map.on("styledata", () => {
			})

			map.on("sourcedata", (e) => {
			})

			// Ensure map resizes properly
			setTimeout(() => {
				map?.resize()
				console.log("Map resized")
			}, 100)

			map.on("load", () => {
				console.log("Map fully loaded")

				// Try setting pitch and bearing after load
				map?.setPitch(45)
				map?.setBearing(-17.6)
				if (!map) return

				// Add 3D terrain
				map.addSource("mapbox-dem", {
					type: "raster-dem",
					url: "mapbox://mapbox.mapbox-terrain-dem-v1",
					tileSize: 512,
					maxzoom: 14,
				})

				map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 })

				// Add lot polygons if available
				if (data.mapLots && Array.isArray(data.mapLots)) {
					// Convert mapLots to GeoJSON format
					const lotsGeoJSON = {
						type: "FeatureCollection",
						features: data.mapLots
							.map((lot, index) => {
								// Check if lot has coordinates array
								const coordinates =
									lot.coordinates[0]

								if (!coordinates || !Array.isArray(coordinates)) {
									return null
								}

								// Ensure the polygon is closed (first and last points are the same)
								const polygonCoordinates = [...coordinates]
								if (polygonCoordinates.length > 0) {
									const firstPoint = polygonCoordinates[0]
									const lastPoint =
										polygonCoordinates[polygonCoordinates.length - 1]
									if (
										firstPoint[0] !== lastPoint[0] ||
										firstPoint[1] !== lastPoint[1]
									) {
										polygonCoordinates.push(firstPoint)
									}
								}
								let street = lot.address?.split(" ")[0] || ""
								if(!parseInt(street)) street = ""
								return {
									type: "Feature",
									properties: {
										id: lot.id || lot.lotNumber || `lot-${index}`,
										name:
											street ||
											lot.name ||
											lot.lotName ||
											`${lot.lotNumber || index + 1}`,
										status: lot.status || "available",
										price: lot.price,
										size: lot.size || lot.area,
										...lot,
									},
									geometry: {
										type: "Polygon",
										coordinates: [polygonCoordinates],
									},
								}
							})
							.filter(Boolean),
					}
					console.log(lotsGeoJSON)

					// Add lots source
					map.addSource("lots", {
						type: "geojson",
						data: lotsGeoJSON,
					})

					// Add lot fill layer
					map.addLayer({
						id: "lots-fill",
						type: "fill",
						source: "lots",
						paint: {
							"fill-color": [
								"case",
								["==", ["get", "lot_status"], "Closed"],
								"#cfcfcf",
								["==", ["get", "status"], "pending"],
								"#f59e0b",
								["==", ["get", "status"], "reserved"],
								"#8b5cf6",
								"#10b981", // available - green
							],
							"fill-opacity": 0.6,
						},
					})

					// Add lot outline layer
					map.addLayer({
						id: "lots-outline",
						type: "line",
						source: "lots",
						paint: {
							"line-color": "#ffffff",
							"line-width": 2,
							"line-opacity": 0.8,
						},
					})

					// Add lot labels
					map.addLayer({
						id: "lots-labels",
						type: "symbol",
						source: "lots",
						layout: {
							"text-field": ["get", "name"],
							"text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"],
							"text-size": 14,
							"text-anchor": "center",
						},
						paint: {
							"text-color": "#ffffff",
							"text-halo-color": "#000000",
							"text-halo-width": 2,
						},
					})

					// Add click event for lots
					map.on("click", "lots-fill", (e) => {
						if (!e.features || !e.features[0]) return

						const lot = e.features[0].properties
						const coordinates = e.features[0].geometry.coordinates[0]

						// Calculate center of polygon
						let sumLng = 0,
							sumLat = 0
						coordinates.forEach((coord) => {
							sumLng += coord[0]
							sumLat += coord[1]
						})
						const centerLng = sumLng / coordinates.length
						const centerLat = sumLat / coordinates.length

						// Create popup content
						const popupContent = `
					<div class="lot-popup">
						<h3>${lot?.name || "Lot"}</h3>
						<div class="lot-status ${lot?.status || "available"}">${
							lot?.status || "available"
						}</div>
						${lot?.price ? `<p class="lot-price">${lot.price}</p>` : ""}
						${lot?.size ? `<p class="lot-size">${lot.size}</p>` : ""}
					</div>
					`

						new mapboxgl.Popup()
							.setLngLat([centerLng, centerLat])
							.setHTML(popupContent)
							.addTo(map)
					})

					// Change cursor on hover
					map.on("mouseenter", "lots-fill", () => {
						if (map) map.getCanvas().style.cursor = "pointer"
					})

					map.on("mouseleave", "lots-fill", () => {
						if (map) map.getCanvas().style.cursor = ""
					})
				}

				// Add property marker if coordinates exist
				if (data.property?.lat && data.property?.lng) {
					const el = document.createElement("div")
					el.className = "property-marker"
					el.innerHTML = '<div class="marker-pulse"></div>'

					new mapboxgl.Marker(el)
						.setLngLat([data.property.lng, data.property.lat])
						.addTo(map)
				}
			})
		}
		setMap(map)
		return () => {
			map?.remove()
		}
	}, [loading, data])

	if (loading) {
		return (
			<div className="map-container">
				<div className="map-loading">
					<div className="spinner"></div>
					<p>Loading map...</p>
				</div>
			</div>
		)
	}

	return (
		<div className="map-container">
			<div ref={mapContainer} className="map-box" />
			<div className="map-overlay">
				<h2>Site Plan</h2>
				<p>Explore available lots</p>
				<div className="map-legend">
					<div className="legend-item">
						<span className="legend-color available"></span>
						<span>Available</span>
					</div>
					<div className="legend-item">
						<span className="legend-color pending"></span>
						<span>Pending</span>
					</div>
					<div className="legend-item">
						<span className="legend-color sold"></span>
						<span>Sold</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Map
