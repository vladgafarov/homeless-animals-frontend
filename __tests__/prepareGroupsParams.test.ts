import { Filter } from '@/components/redux/interfaces/IFilters'
import { prepareGroupsParams } from '../lib/prepareGroupsParams'

const filter: Filter = {
   animalType: 'one',
   region: 'two',
}

describe('prepareFilters function', () => {
   it('Works with filters', () => {
      const result = prepareGroupsParams(filter)
      expect(result).toMatchObject(filter)
   })
   it('Works with one filter #1', () => {
      const result = prepareGroupsParams({
         animalType: 'one',
         region: '',
      })
      expect(result).toMatchObject({ animalType: 'one' })
   })
   it('Works with one filter #2', () => {
      const result = prepareGroupsParams({
         animalType: '',
         region: 'two',
      })
      expect(result).toEqual(expect.objectContaining({ region: 'two' }))
   })
   it('Returns null', () => {
      const result = prepareGroupsParams({
         animalType: '',
         region: '',
      })
      expect(result).toBeNull()
   })
})
