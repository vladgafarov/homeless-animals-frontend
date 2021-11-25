import { Option } from '@/components/Groups/MultiInput'
import { prepareMultiInput } from '../lib/prepareMultiInput'

const values: Option[] = [
   { label: 'one', value: 'one' },
   { label: 'two', value: 'two' },
   { label: 'three', value: 'three' },
]

const outputValues: string[] = ['one', 'two', 'three']

describe('prepareMultiInput function', () => {
   it('Works', () => {
      const result = prepareMultiInput(values)
      expect(result).toEqual(outputValues)
   })
})
