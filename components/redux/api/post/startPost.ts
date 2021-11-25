import { backendApi } from '../backend'

interface StartPost {
   userId: number
   postId: number
}

const startPost = backendApi.injectEndpoints({
   endpoints: build => ({
      startPost: build.mutation<string, StartPost>({
         query: ({ userId, postId }) => ({
            url: `publication/start`,
            method: 'GET',
            params: {
               userId,
               postId,
            },
            credentials: 'include',
            responseHandler: response => response.text(),
         }),
         invalidatesTags: (result, error, arg) => [
            { type: 'Post', id: arg.postId },
         ],
      }),
   }),
   overrideExisting: false,
})

export const { useStartPostMutation } = startPost
