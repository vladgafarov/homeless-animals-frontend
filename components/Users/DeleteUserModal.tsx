import { RedButton, GreenButton } from '../styles/Buttons'
import Modal from '../utils/Modal'
import tw from 'twin.macro'
import LoadingOverlay from '../utils/LoadingOverlay'
import { useDeleteUserMutation } from '../redux/api/user/deleteUser'
import ErrorMessage from '../utils/ErrorMessage'
import toast from 'react-hot-toast'

interface IDeleteModal {
   isOpen: boolean
   closeModal: () => void
   userId: number
}

const DeleteModal = ({ isOpen, closeModal, userId }: IDeleteModal) => {
   const [deleteUser, { error, isLoading }] = useDeleteUserMutation()

   return (
      <Modal isOpen={isOpen} closeModal={closeModal}>
         <LoadingOverlay loading={isLoading} />
         {error && <ErrorMessage error={error} />}
         <h1 tw="font-pb text-2xl">
            Вы дейстительно хотите удалить этого пользователя?
         </h1>
         <div tw="flex items-center justify-center space-x-3 mt-6">
            <RedButton
               onClick={() => {
                  deleteUser({ id: userId })
                     .unwrap()
                     .then(res => {
                        toast.success('Пользователь успешно удален')
                        closeModal()
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

export default DeleteModal
