import { backendApi } from '../backend'

interface UpdatePostResponse {
   userId: number
   postId: number
}

const updatePost = backendApi.injectEndpoints({
   endpoints: build => ({
      updatePost: build.mutation<UpdatePostResponse, FormData>({
         query: body => ({
            url: 'post/update',
            method: 'POST',
            body,
            headers: {
               accept: 'text/plain',
            },
            credentials: 'include',
         }),
         invalidatesTags: (result, error, arg) => [
            result ? { type: 'Post', id: result.postId } : 'Post',
         ],
      }),
   }),
   overrideExisting: false,
})

export const { useUpdatePostMutation } = updatePost
