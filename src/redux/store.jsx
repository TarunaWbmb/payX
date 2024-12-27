import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { loginApi } from '../services/loginApi'
import loginReducer from './reducers/loginSlice'
import AlertReducer from './reducers/appSlice'
import { serviceApi } from '../services/serviceApi'
import serviceReducer from './reducers/serviceSlice'

const rootReducer = combineReducers({
  login: loginReducer,
  service: serviceReducer,
  app: AlertReducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      loginApi.middleware,
      serviceApi.middleware,
    ]),
})

setupListeners(store.dispatch)

export default store
