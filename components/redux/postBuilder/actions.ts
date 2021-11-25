import { createAction } from '@reduxjs/toolkit'
import { Filter } from '../interfaces/IFilters'
import { Group } from '../interfaces/IGroup'
import { IGroupTimeInfo } from '../interfaces/IGroupTimeInfo'

export const addGroups = createAction<Group[]>('addGroups')
export const addGroupTimeInfo = createAction<IGroupTimeInfo>('addGroupTimeInfo')
export const addStartDate =
   createAction<Omit<IGroupTimeInfo, 'publicationInterval'>>('addStartDate')
export const addInterval =
   createAction<Omit<IGroupTimeInfo, 'publicationDataTime'>>('addInterval')
export const addSelectedGroupsId = createAction<object>('addSelectedGroupsId')
export const addFilter = createAction<Partial<Filter>>('addFilter')
export const clearFilters = createAction('clearFilters')
