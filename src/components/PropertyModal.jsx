import { useState, useEffect } from "react"
import {
	X,
	ChevronLeft,
	ChevronRight,
	Bed,
	Bath,
	Square,
	MapPin,
	Calendar,
	Home,
	Trees,
	Milestone
} from "lucide-react"
import numeral from "numeral"

const PropertyModal = ({ property, isOpen, onClose, custom }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = "unset"
		}

		return () => {
			document.body.style.overflow = "unset"
		}
	}, [isOpen])

	if (!isOpen || !property) return null

	const images = property.images || []
	const hasMultipleImages = images.length > 1

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % images.length)
	}

	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
	}

	const formatDescription = (description) => {
		if (!description) return null
		// Parse HTML content and convert to JSX
		return { __html: description }
	}

	const propertyType = property.start_date ? "Home" : "Homesite"

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				className="relative w-full max-w-7xl max-h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
				>
					<X className="w-6 h-6 text-gray-700" />
				</button>

				<div className="flex flex-col lg:flex-row h-full">
					{/* Image Gallery */}
					<div className="relative lg:w-3/5 h-[480px] lg:h-auto bg-gray-100">
						{images.length > 0 ? (
							<>
								<img
									src={images[currentImageIndex]}
									alt={`${property.name} - Image ${currentImageIndex + 1}`}
									className="w-full h-full object-cover"
									onError={(e) => {
										e.target.src = "/placeholder-home.jpg"
									}}
								/>
								{hasMultipleImages && (
									<>
										<button
											onClick={prevImage}
											className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
										>
											<ChevronLeft className="w-8 h-8 text-gray-700" />
										</button>
										<button
											onClick={nextImage}
											className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
										>
											<ChevronRight className="w-8 h-8 text-gray-700" />
										</button>
										<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
											{images.map((_, index) => (
												<button
													key={index}
													onClick={() => setCurrentImageIndex(index)}
													className={`w-2 h-2 rounded-full transition-all duration-200 ${
														index === currentImageIndex
															? "bg-white w-8"
															: "bg-white/60 hover:bg-white/80"
													}`}
												/>
											))}
										</div>
									</>
								)}
							</>
						) : (
							<div className="w-full h-full flex items-center justify-center text-gray-400">
								<Square className="w-16 h-16" />
							</div>
						)}
					</div>

					{/* Property Details */}
					<div className="lg:w-2/5 p-6 lg:p-8 overflow-y-auto">
						<div className="mb-6">
							<div className="flex items-center gap-2 mb-2">
								{propertyType === "Home" ? (
									<Home className="w-5 h-5 text-blue-600" />
								) : (
									<Trees className="w-5 h-5 text-green-600" />
								)}
								<span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
									{propertyType}
								</span>
							</div>
							<h2 className="text-3xl font-bold text-gray-900 mb-2">
								{property.name}
							</h2>
							<p className="text-3xl font-bold text-blue-600">
								{typeof property.price === "number"
									? numeral(property.price).format("$0,0")
									: property.price}
							</p>
						</div>

						{/* Property Stats */}
						<div className="grid grid-cols-3 gap-4 mb-6">
							{property.bedrooms > 0 && (
								<div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
									<Bed className="w-5 h-5 text-gray-600" />
									<div>
										<p className="text-2xl font-semibold text-gray-900">
											{property.bedrooms}
										</p>
										<p className="text-xs text-gray-600">Bedrooms</p>
									</div>
								</div>
							)}
							{property.bathrooms > 0 && (
								<div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
									<Bath className="w-5 h-5 text-gray-600" />
									<div>
										<p className="text-2xl font-semibold text-gray-900">
											{property.bathrooms}
											{property.half_baths > 0 ? `.${property.half_baths}` : ""}
										</p>
										<p className="text-xs text-gray-600">Bathrooms</p>
									</div>
								</div>
							)}
							{property.sqft && property.sqft !== "N/A" && (
								<div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
									<Square className="w-5 h-5 text-gray-600" />
									<div>
										<p className="text-2xl font-semibold text-gray-900">
											{typeof property.sqft === "number"
												? numeral(property.sqft).format("0,0")
												: property.sqft}
										</p>
										<p className="text-xs text-gray-600">Sq Ft</p>
									</div>
								</div>
							)}
						</div>

						{/* Additional Info */}
						<div className="space-y-4 mb-6">
							{property.lot && (
								<div className="flex items-start gap-3">
									<Milestone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
									<p className="text-gray-700">Lot {property.lot}</p>
								</div>
							)}
							{property.address && (
								<div className="flex items-start gap-3">
									<MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
									<p className="text-gray-700">{property.address}</p>
								</div>
							)}
							{property.builder_marketing_name &&
								!custom?.personalize?.noBuilder && (
									<div className="flex items-start gap-3">
										<Home className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
										<p className="text-gray-700">
											{property.builder_marketing_name}
										</p>
									</div>
								)}
							{property.complete_date && (
								<div className="flex items-start gap-3">
									<Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
									<p className="text-gray-700">
										Completed{" "}
										{new Date(property.complete_date * 1000).getFullYear()}
									</p>
								</div>
							)}
						</div>

						{/* Description */}
						{property.description && (
							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-3">
									Description
								</h3>
								<div
									className="prose prose-sm text-gray-700 max-w-none"
									dangerouslySetInnerHTML={formatDescription(
										property.description
									)}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PropertyModal
