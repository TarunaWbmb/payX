import { createSlice } from '@reduxjs/toolkit'

const serviceInitialState = {
  data: null,
}

export const service = createSlice({
  name: 'service',
  initialState: serviceInitialState,
  reducers: {
    reset: () => serviceInitialState,
  },
})
export const { reset } = service.actions
export default service.reducer
