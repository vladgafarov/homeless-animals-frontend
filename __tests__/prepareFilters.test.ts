import { Filters } from '@/components/redux/interfaces/IFilters'
import { prepareFilters } from '../lib/prepareFilters'

const filters: Filters = {
   animals: ['one', 'two', 'three'],
   regions: ['four', 'five', 'six'],
}

const outputFilters = [
   [
      { value: 'one', label: 'one' },
      { value: 'two', label: 'two' },
      { value: 'three', label: 'three' },
   ],
   [
      { value: 'four', label: 'four' },
      { value: 'five', label: 'five' },
      { value: 'six', label: 'six' },
   ],
]

describe('prepareFilters function', () => {
   it('Must work properly', () => {
      const result = prepareFilters(filters)
      expect(result).toMatchObject(outputFilters)
   })
   it('Must fail', () => {
      filters.animals.push('fail')
      const result = prepareFilters(filters)
      expect(result).not.toMatchObject(outputFilters)
   })
})
