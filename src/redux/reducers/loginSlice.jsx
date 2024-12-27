import { createSlice } from '@reduxjs/toolkit'

const loginInitialState = {
  token: null,
  user: null,
}

export const login = createSlice({
  name: 'login',
  initialState: loginInitialState,
  reducers: {
    reset: () => loginInitialState,
    setToken: (state, action) => {
      state.token = action.payload
    },
  },
})
export const { reset, setToken } = login.actions
export const selectToken = (state) => state.login.token
export default login.reducer
