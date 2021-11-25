const errors = [
   {
      value: 'Group not found',
      translate: 'Группы не найдены',
   },
   {
      value: 'Posts not found',
      translate: 'Посты не найдены',
   },
   {
      value: 'Error service',
      translate: 'Ошибка сервера',
   },
   {
      value: 'Not authorized',
      translate: 'Не авторизован',
   },
]

const ErrorMessage = ({ error }) => {
   let message = error.data

   errors.forEach(errorArr => {
      if (errorArr.value.includes(error.data)) {
         message = errorArr.translate
      }
   })

   return <p className="error">{message}</p>
}

export default ErrorMessage
