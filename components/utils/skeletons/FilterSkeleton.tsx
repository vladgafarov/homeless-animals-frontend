import tw from 'twin.macro'
import TitleSkeleton from './TitleSkeleton'

const FilterSkeleton = () => {
   return (
      <>
         <TitleSkeleton />
         <div tw="flex flex-col lg:flex-row space-x-12 mt-5">
            <div tw="flex-1 h-9 rounded bg-blue-200"></div>
            <div tw="flex-1 h-9 rounded bg-blue-200"></div>
         </div>
      </>
   )
}

export default FilterSkeleton
