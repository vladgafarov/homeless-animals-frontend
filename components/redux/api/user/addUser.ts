import { User } from '../../interfaces/IUser'
import { backendApi } from '../backend'

const addUser = backendApi.injectEndpoints({
   endpoints: build => ({
      addUser: build.mutation<string, Partial<User>>({
         query: ({ ...body }) => ({
            url: 'users/newUser',
            method: 'POST',
            body,
            responseHandler: response => response.text(),
         }),
         invalidatesTags: (result, error, arg) => [
            { type: 'User', id: arg.id },
         ],
      }),
   }),
   overrideExisting: false,
})

export const { useAddUserMutation } = addUser
