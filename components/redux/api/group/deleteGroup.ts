import { Group } from '../../interfaces/IGroup'
import { backendApi } from '../backend'

const deleteGroup = backendApi.injectEndpoints({
   endpoints: build => ({
      deleteGroup: build.mutation<string, Pick<Group, 'id'>>({
         query: ({ id }) => ({
            url: `group`,
            method: 'DELETE',
            headers: {
               'content-type': 'text/plain',
            },
            params: {
               groupId: id,
            },
            responseHandler: response => response.text(),
         }),
         invalidatesTags: (result, error, arg) => ['Group'],
      }),
   }),
   overrideExisting: false,
})

export const { useDeleteGroupMutation } = deleteGroup
