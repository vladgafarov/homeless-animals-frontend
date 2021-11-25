import { Filters } from '../components/redux/interfaces/IFilters'

export const prepareFilters = (filters: Filters) => {
   return Object.values(filters).map(filter => {
      return filter.map((item: string) => ({
         value: item,
         label: item,
      }))
   })
}
