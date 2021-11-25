import { User } from '../../interfaces/IUser'
import { backendApi } from '../backend'

const deleteUser = backendApi.injectEndpoints({
   endpoints: build => ({
      deleteUser: build.mutation<User, Pick<User, 'id'>>({
         query: ({ id }) => ({
            url: `user`,
            method: 'DELETE',
            headers: {
               'content-type': 'text/plain',
            },
            params: {
               id,
            },
            responseHandler: response => response.text(),
         }),
         invalidatesTags: (result, error, arg) => [
            { type: 'User', id: arg.id },
         ],
      }),
   }),
   overrideExisting: false,
})

export const { useDeleteUserMutation } = deleteUser
