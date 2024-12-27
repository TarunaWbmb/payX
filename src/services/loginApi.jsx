import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken } from '../common/headers.jsx'
import { onMutationStartedDefault } from './serviceUtility.js'

const URL =
  import.meta.env.VITE_BASE_URL || 'https://silent-water-22848.pktriot.net'

export const loginApi = createApi({
  reducerPath: 'loginApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => getToken(headers),
  }),
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: '/api/admin/login',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onMutationStartedDefault,
    }),

    logoutAdmin: builder.mutation({
      query: (data) => ({
        url: '/api/admin/logout',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onMutationStartedDefault,
    }),
  }),
})

export const { useLoginAdminMutation, useLogoutAdminMutation } = loginApi
