import { useEffect, useState, useRef } from "react"
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./store/hooks.js"
import { fetchPropertyData } from "./store/propertySlice.js"
import IdleScreen from "./components/IdleScreen"
import Header from "./components/Header"
import Navigation from "./components/Navigation"
import Map from "./components/Map"
import Homes from "./components/Homes"
import Info from "./components/Info"

const IDLE_TIMEOUT = 10 * 60 * 1000 // 10 minutes

function AppContent() {
	const [isIdle, setIsIdle] = useState(true)
	const idleTimerRef = useRef()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { initialized, loading } = useAppSelector((state) => state.property)

	// Fetch property data once on app initialization
	useEffect(() => {
		if (!initialized) {
			dispatch(fetchPropertyData())
		}
	}, [dispatch, initialized])

	const resetIdleTimer = () => {
		if (idleTimerRef.current) {
			clearTimeout(idleTimerRef.current)
		}

		idleTimerRef.current = setTimeout(() => {
			setIsIdle(true)
			navigate("/")
		}, IDLE_TIMEOUT)
	}

	const handleUserActivity = () => {
		if (isIdle) {
			setIsIdle(false)
		}
		resetIdleTimer()
	}

	useEffect(() => {
		const events = ["mousedown", "touchstart", "click", "keypress"]

		events.forEach((event) => {
			window.addEventListener(event, handleUserActivity)
		})

		return () => {
			events.forEach((event) => {
				window.removeEventListener(event, handleUserActivity)
			})
			if (idleTimerRef.current) {
				clearTimeout(idleTimerRef.current)
			}
		}
	}, [isIdle])

	if (isIdle) {
		return <IdleScreen onInteract={() => setIsIdle(false)} />
	}

	return (
		<div className="w-screen h-screen flex flex-col bg-gray-50 relative aspect-video max-h-screen max-w-[calc(100vh*16/9)] mx-auto">
			<Header />
			<main className="flex-1 overflow-hidden relative">
				<Routes>
					<Route path="/" element={<Info />} />
					<Route path="/map" element={<Map />} />
					<Route path="/homes" element={<Homes />} />
					<Route path="/info" element={<Info />} />
				</Routes>
			</main>
			<Navigation />
		</div>
	)
}

function App() {
	return (
		<Router>
			<AppContent />
		</Router>
	)
}

export default App
