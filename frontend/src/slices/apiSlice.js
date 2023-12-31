import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

//May need to remove the /api at end
//set it to reducerPath: 'api' on the createApi variable
const baseQuery = fetchBaseQuery({
	baseUrl: 'https://omni-university.com/api',
	credentials: 'include'
})

export const apiSlice = createApi({
	baseQuery,
	tagTypes: [ 'Users', 'Courses', 'Videos' ],
	endpoints: (builder) => ({}),
})
