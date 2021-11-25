import { backendApi } from '../backend'

const getUserInfo = backendApi.injectEndpoints({
   endpoints: build => ({
      getUserInfo: build.query<number, void>({
         query: () => ({
            url: 'info',
            method: 'GET',
            responseHandler: response => response.text(),
         }),
      }),
   }),
   overrideExisting: false,
})

export const { useLazyGetUserInfoQuery } = getUserInfo
