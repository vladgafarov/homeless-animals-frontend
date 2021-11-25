import { backendApi } from '../backend'

interface StopPost {
   userId: number
   postId: number
}

const stopPost = backendApi.injectEndpoints({
   endpoints: build => ({
      stopPost: build.mutation<string, StopPost>({
         query: ({ userId, postId }) => ({
            url: `publication/stop`,
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

export const { useStopPostMutation } = stopPost
