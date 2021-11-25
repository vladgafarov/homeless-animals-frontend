import { useEffect, useMemo, useState } from 'react'
import Select from 'react-select'
import tw, { styled } from 'twin.macro'
import { useGetGroupsQuery } from '../redux/api/group/getGroups'
import ErrorMessage from '../utils/ErrorMessage'
import DatePicker from './DatePicker'
import { prepareGroupsParams } from '../../lib/prepareGroupsParams'
import LoadingOverlay from '../utils/LoadingOverlay'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {
   addGroups,
   clearFilters,
   postBuilderSelector,
} from '../redux/postBuilder'
import GroupsWithFiltersTable from './GroupsWithFiltersTable'

const GroupsStyles = styled.div`
   ${tw`mt-6`}
   h1 {
      ${tw`font-pb text-2xl w-full`}
   }
`

const GroupsWithFilters = () => {
   const dispatch = useAppDispatch()
   const { filters } = useAppSelector(postBuilderSelector)

   const {
      data: groups,
      isLoading,
      error,
      isFetching,
   } = useGetGroupsQuery(prepareGroupsParams(filters))

   useEffect(() => {
      if (groups && !error) {
         dispatch(addGroups(groups))
      }
   }, [dispatch, groups, error])

   useEffect(() => {
      if (groups) {
         dispatch(clearFilters())
      }
      //eslint-disable-next-line
   }, [])

   const columns = useMemo(
      () => [
         {
            Header: 'Название группы',
            accessor: 'name',
            minWidth: 100,
            width: 120,
            maxWidth: 160,
         },
      ],
      []
   )

   return (
      <div>
         {isLoading ? (
            'Loading...'
         ) : (
            <GroupsStyles>
               <h1>Группы</h1>

               {error ? (
                  <ErrorMessage error={error} />
               ) : (
                  <div className="wrapper" tw="relative">
                     <LoadingOverlay loading={isFetching} />
                     <GroupsWithFiltersTable data={groups} columns={columns} />
                  </div>
               )}
            </GroupsStyles>
         )}
      </div>
   )
}

export default GroupsWithFilters
