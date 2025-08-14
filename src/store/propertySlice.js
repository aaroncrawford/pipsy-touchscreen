import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import propertyService from "../services/propertyService.js"

const initialState = {
	data: null,
	loading: false,
	error: null,
	initialized: false,
}

// Async thunk to fetch property data
export const fetchPropertyData = createAsyncThunk(
	"property/fetchData",
	async () => {
		const data = await propertyService.fetchPropertyData()
		if (!data) {
			throw new Error("Failed to fetch property data")
		}
		return data
	}
)

const propertySlice = createSlice({
	name: "property",
	initialState,
	reducers: {
		resetPropertyData: (state) => {
			state.data = null
			state.loading = false
			state.error = null
			state.initialized = false
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPropertyData.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchPropertyData.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
				state.initialized = true
				state.error = null
			})
			.addCase(fetchPropertyData.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || "Failed to fetch property data"
				state.initialized = true
			})
	},
})

export const { resetPropertyData } = propertySlice.actions
export default propertySlice.reducer
