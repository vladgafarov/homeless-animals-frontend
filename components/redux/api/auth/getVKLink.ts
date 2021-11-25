import { backendApi } from '../backend'

const getVKLink = backendApi.injectEndpoints({
   endpoints: build => ({
      getVKLink: build.query<string, void>({
         query: () => ({
            url: 'link/vk',
            headers: {
               'content-type': 'text/plain;',
            },
            responseHandler: response => response.text(),
         }),
      }),
   }),
   overrideExisting: false,
})

export const { useLazyGetVKLinkQuery } = getVKLink
