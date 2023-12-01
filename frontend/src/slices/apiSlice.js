import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:5173' }) //URL of api routes

const apiSlice = createApi(
	{
		baseQuery,
		tagTypes: [ 'User' ],
		endpoints: (builder) => ({})
	})

export { apiSlice }