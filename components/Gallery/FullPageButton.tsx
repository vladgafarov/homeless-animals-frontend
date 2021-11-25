import { AiOutlineFullscreen } from 'react-icons/ai'
import tw from 'twin.macro'

const FullPageButtonStyles = tw.div`
   absolute bottom-2 right-2
   text-gray-300
   text-3xl
   cursor-pointer
   transition
   hover:(text-gray-400)
`

const FullPageButton = ({ onClick }) => {
   return (
      <FullPageButtonStyles onClick={onClick}>
         <AiOutlineFullscreen />
      </FullPageButtonStyles>
   )
}

export default FullPageButton
