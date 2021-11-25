import { useEffect, useState } from 'react'
import Picker from 'react-datepicker'
import { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import tw from 'twin.macro'
import { useAppDispatch } from '../redux/hooks'
import { addStartDate } from '../redux/postBuilder'

registerLocale('ru', ru)

interface IDatePicker {
   groupId: number
}

const DatePicker = ({ groupId }: IDatePicker) => {
   const dispatch = useAppDispatch()
   const [startDate, setStartDate] = useState<Date>(new Date())

   // useEffect(() => {
   //    dispatch(
   //       addStartDate({
   //          groupId,
   //          publicationDataTime: startDate.toISOString(),
   //       })
   //    )
   // }, [])

   return (
      <Picker
         selected={startDate}
         onChange={(date: Date) => {
            setStartDate(date)
            dispatch(
               addStartDate({
                  groupId,
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
   )
}

export default DatePicker
