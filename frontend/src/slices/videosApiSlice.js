import { apiSlice } from './apiSlice'

const videosApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createVideo: builder.mutation({
      query: (data) => ({
        url: `/courses/${ data.courseId }/videos/create`,
        method: 'POST',
        body: data
      })
    }),
    updateVideo: builder.mutation({
      query: (data) => ({
        url: `/courses/${ data.courseId }/videos/${ data.videoId }`,
        method: 'PATCH',
        body: data
      })
    }),
    deleteVideo: builder.mutation({
      query: ({ courseId, videoId }) => ({
        url: `/courses/${ courseId }/videos/${ videoId }`,
        method: 'DELETE'
      })
    })
  })
})

export const
  {
    useCreateVideoMutation,
    useUpdateVideoMutation,
    useDeleteVideoMutation,
  } = videosApiSlice