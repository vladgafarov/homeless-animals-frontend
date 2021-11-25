import { MdKeyboardArrowLeft } from 'react-icons/md'
import tw, { styled } from 'twin.macro'
import { Arrow } from './styles/Arrow'

const ArrowLeftStyles = styled(Arrow)`
   left: 0px;
`
const ArrowLeft = ({ disabled, onClick }) => {
   return (
      <ArrowLeftStyles {...{ disabled }} onClick={onClick}>
         <MdKeyboardArrowLeft tw="w-full h-full" />
      </ArrowLeftStyles>
   )
}

export default ArrowLeft
