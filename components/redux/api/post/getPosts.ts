import { PostList } from '../../interfaces/IPost'
import { backendApi } from '../backend'

const getPosts = backendApi.injectEndpoints({
   endpoints: build => ({
      getPosts: build.query<PostList[], { userId: number }>({
         query: ({ userId }) => ({
            url: 'posts/list',
            params: { userId },
            credentials: 'include',
         }),
         providesTags: (result, error, arg) =>
            result
               ? [
                    ...result.map(({ postId }) => ({
                       type: 'Post' as const,
                       id: postId,
                    })),
                    { type: 'Post', id: 'LIST' },
                 ]
               : [{ type: 'Post', id: 'LIST' }],
         transformResponse: (response: PostList[], meta) => {
            return response
               .sort((a, b) => {
                  return a.postStatus.indexOf('o') - b.postStatus.indexOf('o')
               })
               .reverse()
         },
      }),
   }),
   overrideExisting: false,
})

export const { useGetPostsQuery } = getPosts
