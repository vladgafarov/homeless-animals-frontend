import { backendApi } from '../backend'

const logout = backendApi.injectEndpoints({
   endpoints: build => ({
      logout: build.mutation<string, void>({
         query: () => ({
            url: 'logout',
            method: 'GET',
            credentials: 'include',
            responseHandler: res => res.text(),
         }),
      }),
   }),
   overrideExisting: false,
})

export const { useLogoutMutation } = logout
