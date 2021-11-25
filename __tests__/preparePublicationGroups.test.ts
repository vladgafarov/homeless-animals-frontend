import { preparePublicationGroups } from '../lib/preparePublicationGroups'
import {
   groups,
   groupsTimeInfo1,
   selectedGroupsId1,
   selectedGroupsId2,
   groupsTimeInfo2,
   outputValue1,
   outputValue2,
   selectedGroupsId3,
   groupsTimeInfo3,
   outputValue3,
   selectedGroupsId4,
   groupsTimeInfo4,
   outputValue4,
} from '../lib/testData/preparePublicationGroups'

describe('preparePublicationGroups function', () => {
   it('Works', () => {
      const result = preparePublicationGroups(
         groups,
         selectedGroupsId1,
         groupsTimeInfo1
      )
      expect(result).toEqual(outputValue1)
   })
   it('Works with empty groupsTimeInfo', () => {
      const result = preparePublicationGroups(
         groups,
         selectedGroupsId2,
         groupsTimeInfo2
      )
      expect(result.length).toEqual(outputValue2.length)
   })
   it('Works with one selected group', () => {
      const result = preparePublicationGroups(
         groups,
         selectedGroupsId3,
         groupsTimeInfo3
      )
      expect(result).toEqual(outputValue3)
   })
   it('Works with empty interval', () => {
      const result = preparePublicationGroups(
         groups,
         selectedGroupsId4,
         groupsTimeInfo4
      )
      expect(result).toEqual(outputValue4)
   })
})
