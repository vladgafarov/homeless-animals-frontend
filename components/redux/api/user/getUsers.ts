import { User } from '../../interfaces/IUser'
import { backendApi } from '../backend'

const getUsers = backendApi.injectEndpoints({
   endpoints: build => ({
      getUsers: build.query<User[], void>({
         query: () => 'users',
         providesTags: (result, error, arg) =>
            result
               ? [
                    ...result.map(({ id }) => ({ type: 'User' as const, id })),
                    'User',
                 ]
               : ['User'],
      }),
   }),
   overrideExisting: false,
})

export const { useGetUsersQuery } = getUsers
