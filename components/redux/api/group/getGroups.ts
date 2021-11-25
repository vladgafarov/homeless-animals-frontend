import { Group } from '../../interfaces/IGroup'
import { backendApi } from '../backend'

const getGroups = backendApi.injectEndpoints({
   endpoints: build => ({
      getGroups: build.query<Group[], Partial<Group>>({
         query: ({ ...args }) => ({
            url: 'groups/list',
            params: { ...args },
         }),
         providesTags: (result, error, arg) => ['Group'],
      }),
   }),
   overrideExisting: false,
})

export const { useGetGroupsQuery, useLazyGetGroupsQuery } = getGroups
