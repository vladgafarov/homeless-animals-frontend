import tw from 'twin.macro'
import { FaTrashAlt } from 'react-icons/fa'

const DeleteButtonStyles = tw.div`
   flex items-center
   bg-gray-300
   absolute right-0 top-2
   rounded-tl-full rounded-bl-full 
   py-1 pl-4 pr-2
   cursor-pointer
   transition
   hover:(bg-gray-400)
`

const DeleteButton = ({ onClick }) => {
   return (
      <DeleteButtonStyles onClick={onClick}>
         <span tw="mr-1">Удалить</span> <FaTrashAlt />
      </DeleteButtonStyles>
   )
}

export default DeleteButton
