import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken } from '../common/headers.jsx'
import {
  onQueryStartedDefault,
  onMutationStartedDefault,
} from './serviceUtility.js'

const URL = import.meta.env.VITE_BASE_URL

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => getToken(headers),
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: '/api/admin/get-users',
        method: 'GET',
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onQueryStartedDefault,
    }),
    editUser: builder.mutation({
      query: (data) => ({
        url: '/api/admin/edit-user',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onMutationStartedDefault,
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: '/api/admin/delete-user',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onMutationStartedDefault,
    }),
    getAllLang: builder.query({
      query: () => ({
        url: `/api/admin/get-all-languages`,
        method: 'GET',
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onQueryStartedDefault,
    }),
    getSelectedLang: builder.query({
      query: () => ({
        url: '/api/admin/get-selected-languages',
        method: 'GET',
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onQueryStartedDefault,
    }),
    addLanguage: builder.mutation({
      query: (data) => ({
        url: '/api/admin/add-language',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onMutationStartedDefault,
    }),
    deleteLanguage: builder.mutation({
      query: (data) => ({
        url: '/api/admin/delete-language',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onMutationStartedDefault,
    }),
    getAllCountries: builder.query({
      query: () => ({
        url: `/api/admin/get-all-countries`,
        method: 'GET',
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onQueryStartedDefault,
    }),
    addCountry: builder.mutation({
      query: (data) => ({
        url: '/api/admin/add-countries',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onMutationStartedDefault,
    }),
    getSelectedCountries: builder.query({
      query: () => ({
        url: '/api/admin/get-selected-countries',
        method: 'GET',
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onQueryStartedDefault,
    }),
    deleteCountry: builder.mutation({
      query: (data) => ({
        url: '/api/admin/delete-country',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onMutationStartedDefault,
    }),
    addEmailTemplate: builder.mutation({
      query: (data) => ({
        url: '/api/admin/add-template',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onMutationStartedDefault,
    }),
    getEmailTemplates: builder.query({
      query: ({ templateType }) => ({
        url: `/api/admin/get-templates?templateType=${templateType}`,
        method: 'GET',
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onQueryStartedDefault,
    }),
    editEmailTemplate: builder.mutation({
      query: (data) => ({
        url: '/api/admin/edit-template',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onMutationStartedDefault,
    }),
    editTerms: builder.mutation({
      query: (data) => ({
        url: '/api/admin/update-terms-and-conditions',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onMutationStartedDefault,
    }),
    getTerms: builder.query({
      query: () => ({
        url: `/api/admin/get-terms-and-conditions`,
        method: 'GET',
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onQueryStartedDefault,
    }),
    getAllCurrencies: builder.query({
      query: () => ({
        url: `/api/admin/get-all-currencies`,
        method: 'GET',
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onQueryStartedDefault,
    }),
    addCurrency: builder.mutation({
      query: (data) => ({
        url: '/api/admin/add-currency',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onMutationStartedDefault,
    }),
    getAddedCurrencies: builder.query({
      query: () => ({
        url: `/api/admin/get-added-currencies`,
        method: 'GET',
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onQueryStartedDefault,
    }),
    updateCurrency: builder.mutation({
      query: (data) => ({
        url: '/api/admin/update-currency',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onMutationStartedDefault,
    }),
    addFxExchange: builder.mutation({
      query: (data) => ({
        url: '/api/admin/add-fx-exchange ',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onMutationStartedDefault,
    }),
    getFxExchange: builder.query({
      query: () => ({
        url: `/api/admin/get-fx-exchanges`,
        method: 'GET',
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onQueryStartedDefault,
    }),
    getTransferLimits: builder.query({
      query: ({ userId, currency }) => ({
        url: `api/admin/get-transfer-limits?userId=${userId}?currency=${currency}`,
        method: 'GET',
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onQueryStartedDefault,
    }),
    editTransferLimit: builder.mutation({
      query: (data) => ({
        url: '/api/admin/add-transfer-limits',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (response) => response,
      onQueryStarted: onMutationStartedDefault,
    }),
  }),
})

export const {
  useGetUsersQuery,
  useEditUserMutation,
  useDeleteUserMutation,
  useGetAllLangQuery,
  useGetSelectedLangQuery,
  useAddLanguageMutation,
  useDeleteLanguageMutation,
  useGetAllCountriesQuery,
  useAddCountryMutation,
  useGetSelectedCountriesQuery,
  useDeleteCountryMutation,
  useAddEmailTemplateMutation,
  useGetEmailTemplatesQuery,
  useEditEmailTemplateMutation,
  useEditTermsMutation,
  useGetTermsQuery,
  useGetAllCurrenciesQuery,
  useAddCurrencyMutation,
  useGetAddedCurrenciesQuery,
  useUpdateCurrencyMutation,
  useAddFxExchangeMutation,
  useGetFxExchangeQuery,
  useGetTransferLimitsQuery,
  useEditTransferLimitMutation,
} = serviceApi
