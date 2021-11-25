import { backendApi } from '../backend'

const getPostStatus = backendApi.injectEndpoints({
   endpoints: build => ({
      getPostStatus: build.query<string, { postId: number }>({
         query: ({ postId }) => ({
            url: 'post/status',
            params: { postId },
            credentials: 'include',
            responseHandler: response => response.text(),
            invalidatesTags: (result, error, arg) => [
               { type: 'Post', id: arg.postId },
            ],
         }),
      }),
   }),
   overrideExisting: false,
})

export const { useGetPostStatusQuery } = getPostStatus
