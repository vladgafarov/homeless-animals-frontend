import { createReducer } from '@reduxjs/toolkit'
import {
   addFilter,
   addGroups,
   addGroupTimeInfo,
   addInterval,
   addSelectedGroupsId,
   addStartDate,
   clearFilters,
} from '.'
import { preparePublicationGroups } from '../../../lib/preparePublicationGroups'
import { Filter } from '../interfaces/IFilters'
import { Group } from '../interfaces/IGroup'
import { IGroupTimeInfo } from '../interfaces/IGroupTimeInfo'
import { PublicationGroup } from '../interfaces/IPost'

export interface ISelectedGroupsId {
   [key: number]: boolean
}

interface PostBuilderState {
   groups: Group[]
   selectedGroupsId: ISelectedGroupsId
   groupsTimeInfo: Partial<IGroupTimeInfo>[]
   filters: Filter
}

interface FilterAction {
   payload: Partial<Filter>
   type
}

interface AddStartDateAction {
   payload: Omit<IGroupTimeInfo, 'publicationInterval'>
   type
}

const initialState: PostBuilderState = {
   groups: [],
   selectedGroupsId: {},
   groupsTimeInfo: [],
   filters: { region: '', animalType: '' },
}

export const postBuilderReducer = createReducer(initialState, builder => {
   builder.addCase(addGroups, (state, action) => {
      state.groups = [...action.payload]
   })
   builder.addCase(addStartDate, (state, action: AddStartDateAction) => {
      const groups = state.groupsTimeInfo

      const index = groups.findIndex(
         obj => obj.groupId === action.payload.groupId
      )
      if (index >= 0) {
         groups[index] = {
            ...groups[index],
            publicationDataTime: action.payload.publicationDataTime,
         }
      } else {
         state.groupsTimeInfo = [...state.groupsTimeInfo, action.payload]
      }
   })
   builder.addCase(addInterval, (state, action) => {
      let groups = state.groupsTimeInfo

      const index = groups.findIndex(
         obj => obj.groupId === action.payload.groupId
      )
      if (index >= 0) {
         groups[index] = {
            ...groups[index],
            publicationInterval: action.payload.publicationInterval,
         }
      } else {
         state.groupsTimeInfo = [...state.groupsTimeInfo, action.payload]
      }
   })
   builder.addCase(addFilter, (state, action: FilterAction) => {
      state.filters = {
         ...state.filters,
         ...action.payload,
      }
   })
   builder.addCase(addSelectedGroupsId, (state, action) => {
      state.selectedGroupsId = { ...action.payload }
   })
   builder.addCase(clearFilters, (state, action) => {
      state.filters = { region: '', animalType: '' }
   })
})
