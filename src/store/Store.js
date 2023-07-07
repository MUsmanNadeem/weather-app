import { configureStore } from '@reduxjs/toolkit'
import weatherSlice from './weatherReducer'
export const store = configureStore({
  reducer: {
    weatherSlice
  },
})