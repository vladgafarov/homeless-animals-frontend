import tw from 'twin.macro'

const SearchSkeleton = () => {
   return (
      <div tw="flex items-center justify-center my-6 animate-pulse">
         <div tw="h-6 w-16 rounded bg-blue-200 mr-3"></div>
         <div tw="h-8 w-3/5 bg-blue-300 rounded"></div>
      </div>
   )
}

export default SearchSkeleton
