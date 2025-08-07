import { configureStore } from '@reduxjs/toolkit'
import propertyReducer from './propertySlice.js'

export const store = configureStore({
  reducer: {
    property: propertyReducer
  }
})