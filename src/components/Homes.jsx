import { useState, useEffect } from "react"
import { useAppSelector } from "../store/hooks.js"
import PropertyModal from "./PropertyModal"
import { Home, Trees } from "lucide-react"
import numeral from "numeral"

const Homes = () => {
	const { data, loading, error } = useAppSelector((state) => state.property)
	const [homes, setHomes] = useState([])
	const [filter, setFilter] = useState("all")
	const [selectedProperty, setSelectedProperty] = useState(null)
	const [modalOpen, setModalOpen] = useState(false)

	const formatPrice = (price) => {
		if (typeof price === "string") return price
		if (typeof price === "number") {
			return numeral(price).format("$0,0")
		}
		return "Price Upon Request"
	}

	const formatSqft = (sqft) => {
		if (typeof sqft === "string") return sqft
		if (typeof sqft === "number") {
			return numeral(sqft).format("0,0")
		}
		return "N/A"
	}

	const determineStatus = (home) => {
		if (home.lot_status) {
			const status = home.lot_status.toLowerCase()
			if (
				status.includes("available") ||
				status.includes("active") ||
				status.includes("developer")
			)
				return "available"
			if (status.includes("pending") || status.includes("contract"))
				return "pending"
			if (status.includes("sold") || status.includes("closed")) return "sold"
		}
		return "available"
	}

	useEffect(() => {
		if (data && data.available) {
			// Transform the data to match our Home interface
			const transformedHomes = data.available.map((home, index) => ({
				id: home.id || String(index + 1),
				name:
					home.marketing_home_type ||
					home.builder_marketing_name ||
					`${home.lot_type} Lot`,
				price: formatPrice(home.price),
				bedrooms: home.beds || 0,
				bathrooms: home.full_baths || 0,
				halfBaths: home.half_baths || 0,
				sqft: formatSqft(home.sqft || home.lot_size),
				image:
					home.images && home.images.length > 0
						? home.images[0]
						: `/home-${index + 1}.jpg`,
				status: determineStatus(home),
				address: home.address,
				description: home.marketing_description,
				features: home.features || [],
				...home,
			}))

			setHomes(transformedHomes)
		}
	}, [data, loading])

	const filteredHomes = homes.filter((home) => {
		if (filter === "all") return true
		if (filter === "homes")
			return home.start_date !== null && home.start_date !== undefined
		if (filter === "homesites")
			return home.start_date === null || home.start_date === undefined
		return true
	})

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
				<h2 className="text-3xl font-semibold text-gray-900 m-0">
					Available Properties
				</h2>
				<div className="flex gap-2">
					<button
						className={`px-6 py-3 border-none rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 shadow-sm ${
							filter === "all"
								? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
								: "bg-white text-gray-600 hover:bg-gray-200 hover:-translate-y-0.5"
						}`}
						onClick={() => setFilter("all")}
					>
						All
					</button>
					<button
						className={`px-6 py-3 border-none rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 shadow-sm flex items-center gap-2 ${
							filter === "homes"
								? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
								: "bg-white text-gray-600 hover:bg-gray-200 hover:-translate-y-0.5"
						}`}
						onClick={() => setFilter("homes")}
					>
						<Home className="w-4 h-4" />
						Homes
					</button>
					<button
						className={`px-6 py-3 border-none rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 shadow-sm flex items-center gap-2 ${
							filter === "homesites"
								? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
								: "bg-white text-gray-600 hover:bg-gray-200 hover:-translate-y-0.5"
						}`}
						onClick={() => setFilter("homesites")}
					>
						<Trees className="w-4 h-4" />
						Homesites
					</button>
				</div>
			</div>

			<div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8 pb-48">
				{filteredHomes.map((home) => (
					<div
						key={home.id}
						className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl group"
					>
						<div className="relative w-full h-64 overflow-hidden">
							<img
								src={home.image}
								alt={home.name}
								className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
								onError={(e) => {
									e.target.src = "/placeholder-home.jpg"
								}}
							/>
							<div className="absolute top-4 right-4 flex gap-2">
								<div
									className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide text-white flex items-center gap-1.5 ${
										home.start_date ? "bg-blue-600" : "bg-green-600"
									}`}
								>
									{home.start_date ? (
										<>
											<Home className="w-3 h-3" /> Home
										</>
									) : (
										<>
											<Trees className="w-3 h-3" /> Homesite
										</>
									)}
								</div>
							</div>
						</div>
						<div className="p-6">
							<h3 className="text-xl font-semibold text-gray-900 m-0 mb-3">
								{home.neighborhood} - Lot {home.lot}
							</h3>
							<p className="text-2xl font-bold text-blue-600 m-0 mb-4">
								{numeral(home.price).format("$0,0")}
							</p>
							<div className="h-14">
								{(home.bedrooms > 0 ||
									home.bathrooms > 0 ||
									(home.sqft && home.sqft !== "N/A")) && (
									<div className="flex gap-1 mb-6">
										{home.bedrooms > 0 && (
											<span className="text-gray-600 text-sm font-medium">
												{home.bedrooms} BD |
											</span>
										)}
										{home.bathrooms > 0 && (
											<span className="text-gray-600 text-sm font-medium">
												{home.bathrooms}
												{home.halfBaths > 0 ? `.${home.halfBaths}` : ""} BA |
											</span>
										)}
										{home.sqft && home.sqft !== "N/A" && (
											<span className="text-gray-600 text-sm font-medium">
												{numeral(home.sqft).format("0,0")} sq ft
											</span>
										)}
									</div>
								)}
							</div>
							<div
								onClick={() => {
									setSelectedProperty(home)
									setModalOpen(true)
								}}
								className="w-full py-3.5 text-center bg-blue-600 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30"
							>
								View Details
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Property Details Modal */}
			<PropertyModal
				property={selectedProperty}
				isOpen={modalOpen}
				onClose={() => {
					setModalOpen(false)
					setSelectedProperty(null)
				}}
			/>
		</div>
	)
}

export default Homes
