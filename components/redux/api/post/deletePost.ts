import { backendApi } from '../backend'

const deletePost = backendApi.injectEndpoints({
   endpoints: build => ({
      deletePost: build.mutation<string, { userId: number; postId: number }>({
         query: ({ userId, postId }) => ({
            url: `post`,
            method: 'DELETE',
            headers: {
               'content-type': 'text/plain',
            },
            credentials: 'include',
            params: {
               userId,
               postId,
            },
            responseHandler: response => response.text(),
         }),
         invalidatesTags: (result, error, arg) => [
            { type: 'Post', id: arg.postId },
         ],
      }),
   }),
   overrideExisting: false,
})

export const { useDeletePostMutation } = deletePost
