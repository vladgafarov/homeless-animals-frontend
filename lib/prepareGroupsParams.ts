import { Filter } from '../components/redux/interfaces/IFilters'

export const prepareGroupsParams = (filters: Filter): object | null => {
   const { region, animalType } = filters

   return region && !animalType
      ? {
           region,
        }
      : !region && animalType
      ? {
           animalType,
        }
      : region && animalType
      ? {
           region,
           animalType,
        }
      : null
}
