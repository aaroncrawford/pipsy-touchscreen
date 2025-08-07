import { NavLink } from "react-router-dom"

const Navigation = () => {
	const css = `px-12 text-lg font-medium uppercase tracking-wide text-center whitespace-nowrap transform border-r h-full py-12 border-neutral-700 hover:bg-neutral-800 transition-all duration-300`
	return (
		<div className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-gray-200 shadow-lg z-50">
			<div className="px-8 flex h-full">
				<NavLink
					to="/map"
					className={({ isActive }) =>
						`${css} ${
							isActive ? "bg-white-600 text-white" : "bg-neutral-900 text-white"
						}`
					}
				>
					<span>Site Map</span>
				</NavLink>
				<NavLink
					to="/homes"
					className={({ isActive }) =>
						`${css} ${isActive ? "bg-white" : "bg-neutral-900 text-white"}`
					}
				>
					<span>Homes</span>
				</NavLink>
				<NavLink
					to="/info"
					className={({ isActive }) =>
						`${css} ${isActive ? "bg-white" : "bg-neutral-900 text-white"}`
					}
				>
					<span>Information</span>
				</NavLink>
			</div>
		</div>
	)
}

export default Navigation
