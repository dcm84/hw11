import { configureStore } from '@reduxjs/toolkit'
import serviceListReducer from '../features/Services/serviceListSlice'
import serviceEditReducer from '../features/Services/serviceEditSlice'

const store = configureStore({
  reducer: {
    serviceList: serviceListReducer,
    serviceEdit: serviceEditReducer
  }
})

export default store


















