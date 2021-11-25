import { FaPlus } from 'react-icons/fa'
import tw from 'twin.macro'
import { GreenButton } from '../styles/Buttons'
import { IModal } from '../../lib/useModal'

const AddGroup = ({ openModal }: Pick<IModal, 'openModal'>) => {
   return (
      <GreenButton
         css={tw`flex items-center mx-auto mt-8 font-pm`}
         onClick={openModal}
      >
         Добавить пользователя <FaPlus tw="ml-2" />
      </GreenButton>
   )
}

export default AddGroup
