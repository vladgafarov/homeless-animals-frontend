import { Group } from '../../interfaces/IGroup'
import { backendApi } from '../backend'

const addGroup = backendApi.injectEndpoints({
   endpoints: build => ({
      addGroup: build.mutation<string, Omit<Group, 'id'>>({
         query: ({ ...body }) => ({
            url: 'group/save',
            method: 'POST',
            body,
            credentials: 'include',
            responseHandler: response => response.text(),
         }),
         invalidatesTags: (result, error, arg) => ['Group'],
      }),
   }),
   overrideExisting: false,
})

export const { useAddGroupMutation } = addGroup
