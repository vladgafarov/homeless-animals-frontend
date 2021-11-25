import { backendApi } from '../backend'

interface SavePostResponse {
   userId: number
   postId: number
}

const savePost = backendApi.injectEndpoints({
   endpoints: build => ({
      savePost: build.mutation<SavePostResponse, FormData>({
         query: body => ({
            url: 'post/save',
            method: 'POST',
            body,
            headers: {
               accept: 'text/plain',
            },
            credentials: 'include',
         }),
         invalidatesTags: (result, error, arg) => [
            { type: 'Post', id: 'LIST' },
         ],
      }),
   }),
   overrideExisting: false,
})

export const { useSavePostMutation } = savePost
