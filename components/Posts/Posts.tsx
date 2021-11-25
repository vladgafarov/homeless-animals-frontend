import Head from 'next/head'
import { useMemo, useState } from 'react'
import { useModal } from '../../lib/useModal'
import PostTable from './PostTable'
import DeletePostModal from './DeletePostModal'
import tw from 'twin.macro'
import { useGetPostsQuery } from '../redux/api/post/getPosts'
import ErrorMessage from '../utils/ErrorMessage'
import LoadingOverlay from '../utils/LoadingOverlay'
import { useAppDispatch } from '../redux/hooks'
import SearchSkeleton from '../utils/skeletons/SearchSkeleton'
import TableSkeleton from '../utils/skeletons/TableSkeleton'

const Posts = ({ userInfo }) => {
   const [postId, setPostId] = useState<number>()

   const dispatch = useAppDispatch()
   const { isOpen, closeModal, openModal } = useModal()
   const {
      isOpen: isEditModalOpen,
      closeModal: closeEditModal,
      openModal: openEditModal,
   } = useModal()

   const { isLoading, data, error, isFetching } = useGetPostsQuery({
      userId: parseInt(userInfo),
   })

   const deletePost = (id: number) => {
      openModal()
      setPostId(id)
   }

   const editPost = (id: number) => {
      openEditModal()
      setPostId(id)
   }

   const columns = useMemo(
      () => [
         {
            // Header: 'PostId',
            accessor: 'postId',
         },
         {
            Header: 'Название поста',
            accessor: 'namePost',
            minWidth: 200,
            width: 220,
            maxWidth: 240,
         },
         {
            Header: 'Статус',
            accessor: 'postStatus',
            Cell: ({ value }) => {
               switch (value) {
                  case 'Draft':
                     return 'Черновик'
                  case 'OnPublications':
                     return 'Запущен'
                  case 'Stopped':
                     return 'Остановлен'
                  default:
                     return value
               }
            },
            minWidth: 60,
            width: 80,
            maxWidth: 90,
         },
      ],
      []
   )

   return (
      <>
         <Head>
            <title>Мои посты</title>
         </Head>
         <div className="layout-content">
            {isLoading ? (
               <>
                  <SearchSkeleton />
                  <TableSkeleton />
               </>
            ) : error ? (
               <p tw="text-center">
                  <ErrorMessage error={error} />
               </p>
            ) : (
               <div tw="relative">
                  <LoadingOverlay loading={isFetching} />
                  <PostTable
                     data={data}
                     columns={columns}
                     onEdit={editPost}
                     onDelete={deletePost}
                     userInfo={userInfo}
                  />
               </div>
            )}
            <DeletePostModal
               isOpen={isOpen}
               closeModal={closeModal}
               postId={postId}
            />
         </div>
      </>
   )
}

export default Posts
