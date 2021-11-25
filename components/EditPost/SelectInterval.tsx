import tw from 'twin.macro'
import { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { useAppDispatch } from '../redux/hooks'
import { addInterval } from '../redux/postBuilder'
import { EditPostContext } from './EditPostContext'

const options = [
   { value: 'Каждую минуту', label: 'Каждую минуту' },
   { value: 'Каждый час', label: 'Каждый час' },
   { value: 'Каждый день', label: 'Каждый день' },
   { value: 'Каждые три дня', label: 'Каждые три дня' },
   { value: 'Каждую неделю', label: 'Каждую неделю' },
   { value: 'Каждые 2 недели', label: 'Каждые 2 недели' },
   { value: 'Каждый месяц', label: 'Каждый месяц' },
]

const SelectInterval = ({ group, index }) => {
   const {
      original: { postingSchedules },
   } = useContext(EditPostContext)

   const dispatch = useAppDispatch()

   const [defaultValue, setDefaultValue] = useState<{
      value: string
      label: string
   }>(null)

   const [isLoading, setIsLoading] = useState<boolean>(true)

   useEffect(() => {
      const obj = postingSchedules.find(
         schedule => schedule.nameGroup === group.name
      )

      if (obj) {
         setDefaultValue({
            value: obj.publicationInterval,
            label: obj.publicationInterval,
         })
      }
      setIsLoading(false)
   }, [postingSchedules, group.name])

   return (
      <>
         {isLoading ? (
            <p>loading</p>
         ) : (
            <Select
               tw="w-full lg:w-4/5"
               placeholder="Выберите"
               options={options}
               defaultValue={defaultValue}
               isSearchable={false}
               isClearable={true}
               onChange={selectedOption => {
                  if (selectedOption) {
                     dispatch(
                        addInterval({
                           groupId: group.id,
                           publicationInterval: selectedOption.value,
                        })
                     )
                  }
               }}
            />
         )}
      </>
   )
}

export default SelectInterval
