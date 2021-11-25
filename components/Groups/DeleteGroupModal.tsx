import { RedButton, GreenButton } from '../styles/Buttons'
import Modal from '../utils/Modal'
import tw from 'twin.macro'
import LoadingOverlay from '../utils/LoadingOverlay'
import { useDeleteGroupMutation } from '../redux/api/group/deleteGroup'
import ErrorMessage from '../utils/ErrorMessage'
import toast from 'react-hot-toast'

interface IDeleteModal {
   isOpen: boolean
   closeModal: () => void
   groupId: number
}

const DeleteModal = ({ isOpen, closeModal, groupId }: IDeleteModal) => {
   const [deleteGroup, { error, isLoading }] = useDeleteGroupMutation()

   return (
      <Modal isOpen={isOpen} closeModal={closeModal}>
         <LoadingOverlay loading={isLoading} />

         <h1 tw="font-pb text-2xl">
            Вы дейстительно хотите удалить эту группу?
         </h1>
         {error && <ErrorMessage error={error} />}
         <div tw="flex items-center justify-center space-x-3 mt-6">
            <RedButton
               onClick={() => {
                  deleteGroup({ id: groupId })
                     .unwrap()
                     .then(res => {
                        toast.success('Группа успешно удалена')
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
