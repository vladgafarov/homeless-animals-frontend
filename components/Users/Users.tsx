import Head from 'next/head'
import { useMemo, useState } from 'react'
import { useModal } from '../../lib/useModal'
import DeleteUserModal from './DeleteUserModal'
import AddUserButton from './AddUserButton'
import AddUserModal from './AddUserModal'
import tw from 'twin.macro'
import { useGetUsersQuery } from '../redux/api/user/getUsers'
import LoadingOverlay from '../utils/LoadingOverlay'
import UsersTable from './UsersTable'
import TableSkeleton from '../utils/skeletons/TableSkeleton'

const Users = () => {
   const [userId, setUserId] = useState<number>()
   const { isOpen, closeModal, openModal } = useModal()
   const {
      isOpen: isDeleteModalOpen,
      closeModal: closeDeleteModal,
      openModal: openDeleteModal,
   } = useModal()

   const { data: users, isLoading, isError, isFetching } = useGetUsersQuery()

   const deleteUser = (id: number) => {
      openDeleteModal()
      setUserId(id)
   }

   const columns = useMemo(
      () => [
         {
            accessor: 'id',
         },
         {
            Header: 'Имя',
            accessor: 'name',
            minWidth: 100,
            width: 120,
            maxWidth: 160,
         },
         {
            Header: 'Почта',
            accessor: 'email',
            minWidth: 200,
            width: 240,
            maxWidth: 280,
         },
         {
            Header: 'Статус',
            accessor: 'status',
            maxWidth: 130,
            //eslint-disable-next-line
            Cell: ({ value }) => {
               if (value === 'NotRegistered') {
                  return <p>Не зарегистрирован</p>
               }
               return <p>Зарегистрирован</p>
            },
         },
      ],
      []
   )

   return (
      <>
         <Head>
            <title>Пользователи</title>
         </Head>
         <div className="layout-content">
            {isLoading ? (
               <TableSkeleton />
            ) : isError ? (
               <p>Не удалось подключиться к серверу</p>
            ) : (
               <div tw="relative">
                  <LoadingOverlay loading={isFetching} />
                  <UsersTable
                     data={users}
                     onDelete={deleteUser}
                     columns={columns}
                  />
               </div>
            )}

            <AddUserButton openModal={openModal} />

            <AddUserModal isOpen={isOpen} closeModal={closeModal} />
            <DeleteUserModal
               isOpen={isDeleteModalOpen}
               closeModal={closeDeleteModal}
               userId={userId}
            />
         </div>
      </>
   )
}

export default Users
