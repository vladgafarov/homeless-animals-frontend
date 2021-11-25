import { PostEdit } from '../../interfaces/IPost'
import { backendApi } from '../backend'

const getPost = backendApi.injectEndpoints({
   endpoints: build => ({
      getPost: build.query<PostEdit, { postId: number }>({
         query: ({ postId }) => ({
            url: 'post',
            params: { postId },
            credentials: 'include',
         }),
         providesTags: (result, error, arg) => [
            { type: 'Post', id: arg.postId },
         ],
      }),
   }),
   overrideExisting: false,
})

export const { useGetPostQuery, usePrefetch } = getPost
