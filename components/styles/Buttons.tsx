import tw, { styled } from 'twin.macro'

export const Button = styled.button`
   ${tw`
      relative
      pl-4
      pr-4
      pt-2
      pb-2
      text-white
      rounded-md
      bg-blue-500
      hover:bg-blue-400
      focus:bg-blue-600
      transition
  `}
   &[disabled] {
      ${tw`bg-opacity-40 cursor-not-allowed`}
   }
`

export const TableButton = styled(Button)`
   ${tw`
      bg-white
      border-2 border-blue-300 
      text-blue-300 
      hover:(bg-blue-300 text-white)
      focus:(bg-blue-400 text-white)
   `}
`

export const RedButton = styled(Button)`
   ${tw`
      bg-red-500
      hover:(bg-red-400)
      focus:(bg-red-600)
   `}
`

export const GreenButton = styled(Button)`
   ${tw`
      bg-green-500
      hover:(bg-green-400)
      focus:(bg-green-600)
   `}
`
