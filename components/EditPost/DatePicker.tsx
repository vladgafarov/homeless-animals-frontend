import { useContext, useEffect, useState } from 'react'
import Picker from 'react-datepicker'
import { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import tw from 'twin.macro'
import { useAppDispatch } from '../redux/hooks'
import { addStartDate } from '../redux/postBuilder'
import { EditPostContext } from './EditPostContext'

registerLocale('ru', ru)

interface IDatePicker {
   group: any
   index: number
}

const DatePicker = ({ group, index }: IDatePicker) => {
   const {
      original: { postingSchedules },
   } = useContext(EditPostContext)

   const dispatch = useAppDispatch()

   const [startDate, setStartDate] = useState<Date>(new Date())
   const [isLoading, setIsLoading] = useState<boolean>(true)

   useEffect(() => {
      const obj = postingSchedules.find(
         schedule => schedule.nameGroup === group.name
      )

      if (obj) {
         setStartDate(new Date(obj.publicationDataTime))
      }
      setIsLoading(false)
   }, [postingSchedules, group.name])

   return (
      <>
         {isLoading ? (
            <p>loading</p>
         ) : (
            <Picker
               selected={startDate}
               onChange={(date: Date) => {
                  setStartDate(date)
                  dispatch(
                     addStartDate({
                        groupId: group.id,
                        publicationDataTime: date.toISOString(),
                     })
                  )
               }}
               minDate={new Date()}
               showTimeSelect
               timeFormat="HH:mm"
               timeIntervals={2}
               dateFormat="dd.MM.yy HH:mm"
               showPopperArrow={false}
               tw="py-2 px-4 rounded bg-blue-400 text-white outline-none focus:(ring-2 ring-offset-blue-300 bg-blue-500) transition placeholder-current"
               placeholderText="Выберите дату"
               locale="ru"
            />
         )}
      </>
   )
}

export default DatePicker
