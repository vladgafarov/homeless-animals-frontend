import Modal from '../utils/Modal'
import faker from 'faker'
import tw from 'twin.macro'
import { ErrorMessage, Field, Formik } from 'formik'
import * as Yup from 'yup'
import { Button } from '../styles/Buttons'
import ErrorMessageMutation from '../utils/ErrorMessage'
import LoadingOverlay from '../utils/LoadingOverlay'
import FormStyles from '../styles/Form'
import { useAddUserMutation } from '../redux/api/user/addUser'
import { useSendMailMutation } from '../redux/api/user/sendMail'
import toast from 'react-hot-toast'
interface IUserModal {
   isOpen: boolean
   closeModal: () => void
}

const UserModal = ({ isOpen, closeModal }: IUserModal) => {
   const [addUser, { error }] = useAddUserMutation()
   const [sendMail, { error: sendEmailError }] = useSendMailMutation()

   const errorState = error || sendEmailError
   return (
      <Modal isOpen={isOpen} closeModal={closeModal}>
         <h1 tw="font-pb text-2xl">Пригласить нового пользователя</h1>
         <Formik
            initialValues={{
               email: '',
               name: '',
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={Yup.object({
               email: Yup.string()
                  .email('Неверный адрес почты')
                  .required('Обязательно'),
               name: Yup.string()
                  .min(2, 'От 2-х символов')
                  .required('Обязательно'),
            })}
            onSubmit={async (values, actions) => {
               let userId: string

               await addUser(values)
                  .unwrap()
                  .then(res => {
                     userId = res
                     toast.success(`Пользователь успшено добавлен`)
                     closeModal()
                  })

               toast.promise(sendMail({ invitedUserId: userId }).unwrap(), {
                  loading: 'Отправка пригласительного письма',
                  success: 'Письмо успешно отправлено',
                  error: 'Не удалось отправить письмо',
               })
            }}
         >
            {({ isSubmitting }) => (
               <FormStyles>
                  <fieldset disabled={isSubmitting}>
                     <LoadingOverlay loading={isSubmitting} />

                     {errorState && <ErrorMessageMutation error={errorState} />}

                     <label htmlFor="email">
                        <span>Почта:</span>
                        <Field
                           name="email"
                           type="email"
                           placeholder="example@example.com"
                        />
                     </label>
                     <ErrorMessage name="email">
                        {text => <span className="error">{text}</span>}
                     </ErrorMessage>

                     <label htmlFor="name">
                        <span>Имя:</span>
                        <Field name="name" type="text" placeholder="" />
                     </label>
                     <ErrorMessage name="name">
                        {text => (
                           <>
                              <span className="error">{text}</span>
                              <br />
                           </>
                        )}
                     </ErrorMessage>

                     <Button type="submit">Пригласить</Button>
                  </fieldset>
               </FormStyles>
            )}
         </Formik>
      </Modal>
   )
}

export default UserModal
