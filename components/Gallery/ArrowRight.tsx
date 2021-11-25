import { MdKeyboardArrowRight } from 'react-icons/md'
import tw, { styled } from 'twin.macro'
import { Arrow } from './styles/Arrow'

const ArrowRightStyles = styled(Arrow)`
   right: 0px;
`

const ArrowRight = ({ disabled, onClick }) => {
   return (
      <ArrowRightStyles {...{ disabled }} onClick={onClick}>
         <MdKeyboardArrowRight tw="w-full h-full" />
      </ArrowRightStyles>
   )
}

export default ArrowRight
