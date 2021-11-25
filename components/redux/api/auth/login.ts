import { backendApi } from '../backend'

const login = backendApi.injectEndpoints({
   endpoints: build => ({
      login: build.mutation<string, { url: string }>({
         query: ({ url }) => ({
            url: 'login',
            method: 'POST',
            body: url,
            headers: {
               'content-type': 'application/json',
            },
            credentials: 'include',
            responseHandler: res => res.text(),
         }),
      }),
   }),
   overrideExisting: false,
})

export const { useLoginMutation } = login
