import { PublicationGroup } from '@/components/redux/interfaces/IPost'
import { selectGroups } from '../lib/selectGroups'
import { groups } from '../lib/testData/preparePublicationGroups'

const originalGroups: PublicationGroup[] = [
   {
      nameGroup: 'Тест3',
      publicationDataTime: '2021-11-30T20:04:00+00:00',
      publicationInterval: 'Каждую неделю',
   },
   {
      nameGroup: 'ТестТестТест',
      publicationDataTime: '2021-11-30T20:04:00+00:00',
      publicationInterval: 'Каждый день',
   },
]

const outputValues = { 0: true, 1: true }

describe('prepareMultiInput function', () => {
   it('Works', () => {
      const result = selectGroups(groups, originalGroups)
      expect(result).toEqual(outputValues)
   })
   it('Returns empty object', () => {
      const result = selectGroups(groups, [])
      expect(result).toEqual({})
   })
})
