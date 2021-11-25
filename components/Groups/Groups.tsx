import Head from 'next/head'
import { useMemo, useState } from 'react'
import { useModal } from '../../lib/useModal'
import AddGroupButton from './AddGroupButton'
import DeleteGroupModal from './DeleteGroupModal'
import AddGroupModal from './AddGroupModal'
import tw from 'twin.macro'
import { useGetGroupsQuery } from '../redux/api/group/getGroups'
import LoadingOverlay from '../utils/LoadingOverlay'
import GroupsTable from './GroupsTable'
import TableSkeleton from '../utils/skeletons/TableSkeleton'
import SearchSkeleton from '../utils/skeletons/SearchSkeleton'

const Groups = () => {
   const [groupId, setGroupId] = useState<number>()
   const { isOpen, closeModal, openModal } = useModal()
   const {
      isOpen: isDeleteModalOpen,
      closeModal: closeDeleteModal,
      openModal: openDeleteModal,
   } = useModal()

   const {
      data: groups,
      isLoading,
      isError,
      isFetching,
   } = useGetGroupsQuery(null)

   const deleteGroup = (id: number) => {
      openDeleteModal()
      setGroupId(id)
   }

   const columns = useMemo(
      () => [
         {
            accessor: 'id',
         },
         {
            Header: 'Название группы',
            accessor: 'name',
            minWidth: 100,
            width: 120,
            maxWidth: 150,
         },
         {
            Header: 'Ссылка на группу',
            accessor: 'link',
            //eslint-disable-next-line
            Cell: ({ value }) => (
               <a
                  href={value}
                  tw="text-blue-600"
                  target="_blank"
                  rel="noreferrer"
               >
                  {value}
               </a>
            ),
            minWidth: 220,
            width: 230,
            maxWidth: 260,
         },
         {
            Header: 'Категории животных',
            accessor: 'animalTypes',
            Cell: ({ cell: { value } }) => {
               return value.join(', ')
            },
            minWidth: 70,
            width: 130,
            maxWidth: 160,
         },
         {
            Header: 'Город',
            accessor: 'regions',
            Cell: ({ cell: { value } }) => {
               return value.join(', ')
            },
            minWidth: 70,
            width: 130,
            maxWidth: 160,
         },
      ],
      []
   )

   return (
      <>
         <Head>
            <title>Группы</title>
         </Head>
         <div className="layout-content">
            {isLoading ? (
               <>
                  <SearchSkeleton />
                  <TableSkeleton />
               </>
            ) : isError ? (
               <p>Не удалось подключиться к серверу</p>
            ) : (
               <div tw="relative">
                  <LoadingOverlay loading={isFetching} />
                  <GroupsTable
                     data={groups}
                     onDelete={deleteGroup}
                     columns={columns}
                  />
               </div>
            )}

            <AddGroupButton openModal={openModal} />

            <AddGroupModal isOpen={isOpen} closeModal={closeModal} />
            <DeleteGroupModal
               isOpen={isDeleteModalOpen}
               closeModal={closeDeleteModal}
               groupId={groupId}
            />
         </div>
      </>
   )
}

export default Groups
