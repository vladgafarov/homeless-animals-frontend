import tw from 'twin.macro'

const TabsSkeleton = () => {
   return (
      <div tw="flex items-stretch h-12 border-2 border-blue-200 divide-x-2 divide-blue-200 rounded my-6 animate-pulse overflow-x-auto min-w-min">
         <div tw="flex-1 flex items-center justify-center space-x-2 px-4">
            <div tw="w-8 h-8 rounded-full bg-blue-200"></div>
            <div tw="w-32 h-7 rounded bg-blue-200"></div>
         </div>
         <div tw="flex-1 flex items-center justify-center space-x-2 px-4">
            <div tw="w-8 h-8 rounded-full bg-blue-200"></div>
            <div tw="w-32 h-7 rounded bg-blue-200"></div>
         </div>
         <div tw="flex-1 flex items-center justify-center space-x-2 px-4">
            <div tw="w-8 h-8 rounded-full bg-blue-200"></div>
            <div tw="w-32 h-7 rounded bg-blue-200"></div>
         </div>
      </div>
   )
}

export default TabsSkeleton
