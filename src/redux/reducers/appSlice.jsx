import { createSlice } from '@reduxjs/toolkit'
import { generateUniqueId } from '../../common/methods'

const initialState = {
  alerts: [],
  isLoading: false,
}

export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    successAlert: (state, { payload }) => {
      state.alerts.push({
        message: payload.message,
        severity: 'success',
        title: 'Success',
        key: generateUniqueId(),
      })
    },
    errorAlert: (state, { payload }) => {
      state.alerts.push({
        message: payload.message,
        severity: 'error',
        title: 'Error',
        key: generateUniqueId(),
      })
    },
    removeAlert: (state) => {
      state.alerts.splice(0, 1)
    },
    loadingStarted: (state) => {
      state.isLoading = true
    },
    loadingComplete: (state) => {
      state.isLoading = false
    },
  },
})

export const {
  successAlert,
  errorAlert,
  removeAlert,
  loadingStarted,
  loadingComplete,
} = AppSlice.actions

export default AppSlice.reducer
