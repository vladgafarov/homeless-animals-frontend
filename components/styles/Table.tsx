import tw, { styled } from 'twin.macro'

export const TableWrapper = tw.div`
   overflow-x-auto lg:overflow-visible
   mt-10
   border-2 border-blue-300 rounded
`

export const TableStyles = styled.table`
   ${tw`
      text-base
      text-gray-900
      md:w-full
      mx-auto
      overflow-visible
      rounded-md
   `}
`

export const TableHead = tw.thead`
   p-2
   border-b-2
   border-blue-300
   font-pb
   bg-blue-100
   overflow-y-auto
   overflow-x-hidden
   text-left
`

export const TableRow = styled.tr`
   ${tw`
      transition
      hover:(bg-blue-100)
   `}
`

export const TableHeader = styled.th`
   ${tw`py-2 px-3`}
   &:last-of-type {
      text-align: right;
   }
   ${(props: { index: number }) =>
      props.index === 0 ? tw`border-r-2 border-blue-300` : ''}
`

export const TableBody = tw.tbody``

export const TableData = styled.td`
   ${tw`
      py-4 px-3 flex items-center 
      // border-r-2 border-blue-300
   `}
   &:first-of-type {
      ${(props: { index: number }) =>
         props.index === 0 ? tw`justify-center` : ''}
   }
   &:last-of-type {
      ${tw`justify-end pr-4`}
   }
   ${(props: { index: number }) =>
      props.index === 0 ? tw`border-r-2 border-blue-300` : ''}
`

export const Pagination = styled.div`
   ${tw`flex items-center justify-center space-x-3 mt-4`}

   > span {
      ${tw`flex flex-col items-center md:(flex-row space-y-0 space-x-1)`}
   }

   button {
      ${tw`
         bg-blue-500 text-white
         rounded
         p-1.5
         text-xl
      `}
      &:disabled {
         ${tw`bg-blue-300`}
      }
   }
`
