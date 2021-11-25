import _ from 'lodash'
import { Group } from '../components/redux/interfaces/IGroup'
import { PublicationGroup } from '../components/redux/interfaces/IPost'

export const selectGroups = (
   groups: Group[],
   originalGroups: PublicationGroup[]
) => {
   let names = []
   groups.map(group => {
      const obj = _.pick(group, ['name'])
      names.push(obj['name'])
   })

   let originalNames = []
   originalGroups.map(group => {
      const obj = _.pick(group, ['nameGroup'])
      originalNames.push(obj['nameGroup'])
   })

   let result = {}
   names.map((name, index) => {
      if (originalNames.includes(name)) {
         result = { ...result, [index]: true }
      }
   })

   return result
}
