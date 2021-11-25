import tw from 'twin.macro'

const FormSkeleton = () => {
   return (
      <div tw="space-y-8 animate-pulse mt-12">
         <div tw="w-full lg:w-1/2 space-y-3">
            <div tw="w-2/5 h-6 bg-blue-100 rounded"></div>
            <div tw="w-full h-10 bg-blue-100 rounded border-2 border-blue-300"></div>
         </div>
         <div tw="w-full lg:w-1/2 space-y-3">
            <div tw="w-2/5 h-6 bg-blue-100 rounded"></div>
            <div tw="w-full h-10 bg-blue-100 rounded border-2 border-blue-300"></div>
         </div>
         <div tw="w-full lg:w-3/4 space-y-3">
            <div tw="w-2/5 h-6 bg-blue-100 rounded"></div>
            <div tw="w-full h-24 bg-blue-100 rounded border-2 border-blue-300"></div>
         </div>
      </div>
   )
}

export default FormSkeleton
