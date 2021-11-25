import { backendApi } from '../backend'

const signUp = backendApi.injectEndpoints({
   endpoints: build => ({
      signUp: build.mutation<string, { url: string }>({
         query: ({ url }) => ({
            url: 'signUp',
            method: 'POST',
            body: url,
            headers: {
               'content-type': 'application/json',
            },
            responseHandler: response => response.text(),
         }),
      }),
   }),
   overrideExisting: false,
})

export const { useSignUpMutation } = signUp
