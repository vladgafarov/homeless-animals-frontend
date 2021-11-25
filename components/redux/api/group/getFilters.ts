import { Filters } from '../../interfaces/IFilters'
import { backendApi } from '../backend'

const getGroups = backendApi.injectEndpoints({
   endpoints: build => ({
      getFilters: build.query<Filters, void>({
         query: () => 'groups/filters',
      }),
   }),
   overrideExisting: false,
})

export const { useGetFiltersQuery } = getGroups
