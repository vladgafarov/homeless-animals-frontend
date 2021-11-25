import tw, { styled } from 'twin.macro'

const TableSkeletonStyles = styled.div`
   ${tw`
      rounded overflow-hidden my-6
      border-2 border-blue-100
      animate-pulse
   `}
   min-width: 762px;
`

const Row = styled.div`
   ${tw`
      flex
      h-16
   `}
`

const Block = styled.div`
   ${tw`
      flex-1
      h-full
      flex items-center
   `}
`

const BlockItem = styled.div`
   ${tw`
      w-4/5 h-5 
      rounded 
      bg-blue-100
      ml-8
   `}
`

const TableHeader = styled.div`
   ${tw`
      flex
      h-10
      bg-blue-200 
   `}
   ${BlockItem} {
      ${tw`w-2/5 bg-blue-400`}
   }
`

const TableBody = styled.div`
   > div {
      &:nth-child(2n) {
         ${tw`bg-blue-100`}
         ${BlockItem} {
            ${tw`bg-blue-300 w-3/5`}
         }
      }
   }
`

const TableSkeleton = () => {
   return (
      <div tw="overflow-x-auto">
         <TableSkeletonStyles>
            <TableHeader>
               <Block>
                  <BlockItem />
               </Block>
               <Block>
                  <BlockItem />
               </Block>
               <Block>
                  <BlockItem />
               </Block>
               <Block>
                  <BlockItem />
               </Block>
            </TableHeader>
            <TableBody>
               <Row>
                  <Block>
                     <BlockItem />
                  </Block>
                  <Block>
                     <BlockItem />
                  </Block>
                  <Block>
                     <BlockItem />
                  </Block>
                  <Block>
                     <BlockItem />
                  </Block>
               </Row>
               <Row>
                  <Block>
                     <BlockItem />
                  </Block>
                  <Block>
                     <BlockItem />
                  </Block>
                  <Block>
                     <BlockItem />
                  </Block>
                  <Block>
                     <BlockItem />
                  </Block>
               </Row>
               <Row>
                  <Block>
                     <BlockItem />
                  </Block>
                  <Block>
                     <BlockItem />
                  </Block>
                  <Block>
                     <BlockItem />
                  </Block>
                  <Block>
                     <BlockItem />
                  </Block>
               </Row>
               <Row>
                  <Block>
                     <BlockItem />
                  </Block>
                  <Block>
                     <BlockItem />
                  </Block>
                  <Block>
                     <BlockItem />
                  </Block>
                  <Block>
                     <BlockItem />
                  </Block>
               </Row>
               <Row>
                  <Block>
                     <BlockItem />
                  </Block>
                  <Block>
                     <BlockItem />
                  </Block>
                  <Block>
                     <BlockItem />
                  </Block>
                  <Block>
                     <BlockItem />
                  </Block>
               </Row>
            </TableBody>
         </TableSkeletonStyles>
      </div>
   )
}

export default TableSkeleton
