import { RedButton, GreenButton } from '../styles/Buttons'
import Modal from '../utils/Modal'
import tw from 'twin.macro'
import { useDeletePostMutation } from '../redux/api/post/deletePost'
import LoadingOverlay from '../utils/LoadingOverlay'
import ErrorMessage from '../utils/ErrorMessage'
import toast from 'react-hot-toast'

interface IDeleteModal {
   isOpen: boolean
   closeModal: () => void
   postId: number
}

const DeletePostModal = ({ isOpen, closeModal, postId }: IDeleteModal) => {
   const [deletePost, { error, isLoading }] = useDeletePostMutation()

   return (
      <Modal isOpen={isOpen} closeModal={closeModal}>
         <LoadingOverlay loading={isLoading} />

         <h1 tw="font-pb text-2xl">
            Вы дейстительно хотите удалить этот пост?
         </h1>
         {error && <ErrorMessage error={error} />}
         <div tw="flex items-center justify-center space-x-3 mt-6">
            <RedButton
               onClick={() => {
                  deletePost({ postId, userId: 129362217 })
                     .unwrap()
                     .then(res => {
                        closeModal()
                        toast.success(`Пост успшено удален`)
                     })
               }}
            >
               Да
            </RedButton>
            <GreenButton onClick={closeModal}>Нет</GreenButton>
         </div>
      </Modal>
   )
}

export default DeletePostModal
