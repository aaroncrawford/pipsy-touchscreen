import { useAppSelector } from "../store/hooks.js"

const Header = () => {
	const { data, loading } = useAppSelector((state) => state.property)

	return (
		<header className="relative z-50 bg-neutral-900 shadow-sm px-0 py-4 min-h-24 flex items-center">
			<div className="w-full flex justify-center items-center">
				{data?.property?.logo ? (
					<img
						src={data.property.logo}
						alt="Logo"
						className="max-h-20 max-w-75 h-auto w-auto object-contain"
						onError={(e) => {
							e.target.style.display = "none"
						}}
					/>
				) : (
					!loading && (
						<h1 className="text-3xl font-light tracking-wide text-gray-900 m-0 text-center">
							Welcome Center
						</h1>
					)
				)}
			</div>
		</header>
	)
}

export default Header
