import { ISelectedGroupsId } from '../components/redux/postBuilder'
import { Group } from '../components/redux/interfaces/IGroup'
import { IGroupTimeInfo } from '../components/redux/interfaces/IGroupTimeInfo'
import { PublicationGroup } from '../components/redux/interfaces/IPost'

export const preparePublicationGroups = (
   groups: Group[],
   selectedGroupsId: ISelectedGroupsId,
   groupsTimeInfo: Partial<IGroupTimeInfo>[]
): PublicationGroup[] => {
   let selectedGroups: Group[] = []

   Object.keys(selectedGroupsId).forEach(key => {
      selectedGroups.push(groups[key])
   })

   let result: PublicationGroup[] = []

   selectedGroups.forEach(group => {
      let groupTimeInfo = groupsTimeInfo.find(
         groupTimeInfo => groupTimeInfo.groupId === group.id
      ) ?? {
         publicationDataTime: new Date().toISOString(),
         publicationInterval: 'Каждый день',
      }

      if (Object.keys(groupTimeInfo).length === 2) {
         if (groupTimeInfo.publicationDataTime) {
            groupTimeInfo = {
               ...groupTimeInfo,
               publicationInterval: 'Каждый день',
            }
         } else if (groupTimeInfo.publicationInterval) {
            groupTimeInfo = {
               ...groupTimeInfo,
               publicationDataTime: new Date().toISOString(),
            }
         }
      }

      const { publicationDataTime, publicationInterval } = groupTimeInfo

      result.push({
         id: group.id,
         nameGroup: group.name,
         publicationDataTime,
         publicationInterval,
      })
   })

   return result
}
