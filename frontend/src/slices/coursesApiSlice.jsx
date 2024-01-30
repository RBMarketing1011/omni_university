import { apiSlice } from './apiSlice'

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: '/courses/create',
        method: 'POST',
        body: data,
      }),
    }),
    updateCourse: builder.mutation({
      query: (data) => ({
        url: `/courses/${ data.id }`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteCourse: builder.mutation({
      query: ({ id }) => ({
        url: `/courses/${ id }`,
        method: 'DELETE'
      }),
    }),
    getCourse: builder.query({
      query: (id) => `/courses/${ id }`
    }),
    getAllCourses: builder.query({
      query: () => '/courses'
    })
  }),
})

export const {
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetCourseQuery,
  useGetAllCoursesQuery
} = coursesApiSlice