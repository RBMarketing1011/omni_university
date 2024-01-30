import { apiSlice } from './apiSlice'

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: '/users/login',
				method: 'POST',
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/users/logout',
				method: 'POST',
			}),
		}),
		register: builder.mutation({
			query: (data) => ({
				url: '/users/register',
				method: 'POST',
				body: data,
			}),
		}),
		updateUser: builder.mutation({
			query: (data) => ({
				url: `/users/${ data.id }`,
				method: 'PATCH',
				body: data,
			}),
		}),
		updateUserVideos: builder.mutation({
			query: (data) => ({
				url: `/users/${ data.id }/updateVideos`,
				method: 'PATCH',
				body: data,
			}),
		}),
		updateUserCourses: builder.mutation({
			query: (data) => ({
				url: `/users/${ data.id }/updateCourses`,
				method: 'PATCH',
				body: data,
			}),
		}),
		deleteUser: builder.mutation({
			query: ({ id }) => ({
				url: `/users/${ id }`,
				method: 'DELETE'
			}),
		}),
		getUserProfile: builder.query({
			query: (id) => `/users/${ id }`
		}),
		getAllUserProfiles: builder.query({
			query: () => '/users/all'
		})
	}),
})

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useUpdateUserMutation,
	useUpdateUserVideosMutation,
	useUpdateUserCoursesMutation,
	useDeleteUserMutation,
	useGetUserProfileQuery,
	useGetAllUserProfilesQuery
} = userApiSlice