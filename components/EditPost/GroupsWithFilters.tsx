import { useContext, useEffect, useMemo } from 'react'
import tw, { styled } from 'twin.macro'
import { useLazyGetGroupsQuery } from '../redux/api/group/getGroups'
import ErrorMessage from '../utils/ErrorMessage'
import { prepareGroupsParams } from '../../lib/prepareGroupsParams'
import LoadingOverlay from '../utils/LoadingOverlay'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addGroups, postBuilderSelector } from '../redux/postBuilder'
import GroupsWithFiltersTable from './GroupsWithFiltersTable'
import { EditPostContext } from './EditPostContext'
import TableSkeleton from '../utils/skeletons/TableSkeleton'
import TitleSkeleton from '../utils/skeletons/TitleSkeleton'

const GroupsStyles = styled.div`
   ${tw`mt-6`}
   h1 {
      ${tw`font-pb text-2xl w-full`}
   }
`

const GroupsWithFilters = () => {
   const {
      original: { region, typeAnimal },
   } = useContext(EditPostContext)
   const dispatch = useAppDispatch()
   const { filters } = useAppSelector(postBuilderSelector)

   const [getGroups, { data: groups, isLoading, error, isFetching }] =
      useLazyGetGroupsQuery()

   useEffect(() => {
      if (groups && !error) {
         dispatch(addGroups(groups))
      }
   }, [dispatch, groups, error])

   useEffect(() => {
      getGroups(prepareGroupsParams(filters))
   }, [filters, getGroups])

   useEffect(() => {
      getGroups(
         prepareGroupsParams({
            region,
            animalType: typeAnimal,
         })
      )
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
      <>
         {isLoading ? (
            <>
               <TitleSkeleton />
               <TableSkeleton />
            </>
         ) : groups ? (
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
         ) : null}
      </>
   )
}

export default GroupsWithFilters
