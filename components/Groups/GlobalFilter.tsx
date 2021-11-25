import { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import tw from 'twin.macro'

const GlobalFilter = ({ filter, setFilter }) => {
   const [value, setValue] = useState(filter)

   const onChange = useAsyncDebounce(value => {
      setFilter(value || undefined)
   }, 200)

   return (
      <div tw="flex items-center justify-center mt-6">
         <span>Поиск:</span>
         <input
            tw="w-full lg:w-3/5 ml-2 py-1 px-2 rounded border-2 border-blue-300 focus:(border-blue-500 ring-blue-300) transition outline-none"
            type="text"
            value={value || ''}
            onChange={e => {
               setValue(e.target.value)
               onChange(e.target.value)
            }}
         />
      </div>
   )
}

export default GlobalFilter
