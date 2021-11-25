import * as Yup from 'yup'
import { ErrorMessage, Field, Formik } from 'formik'
import FormStyles from '../styles/Form'
import Modal from '../utils/Modal'
import ErrorMessageQuery from '../utils/ErrorMessage'
import tw from 'twin.macro'
import { Button, GreenButton } from '../styles/Buttons'
import { useLazyGetVKLinkQuery } from '../redux/api/auth/getVKLink'
import { useEffect } from 'react'
import { useLoginMutation } from '../redux/api/auth/login'
import { useRouter } from 'next/router'
import LoadingOverlay from '../utils/LoadingOverlay'
import toast from 'react-hot-toast'

const LoginModal = ({ isOpen, closeModal }) => {
   const router = useRouter()

   const [getVKLink, { data, isLoading, error, isSuccess }] =
      useLazyGetVKLinkQuery()

   const [login, { isLoading: isLoginLoading, error: loginError }] =
      useLoginMutation()

   useEffect(() => {
      if (isSuccess) {
         window.open(data, '_blank')
      }
   }, [isSuccess, data])

   const loadingState = isLoading || isLoginLoading
   const errorState = error || loginError

   return (
      <Modal isOpen={isOpen} closeModal={closeModal}>
         <LoadingOverlay loading={loadingState} />

         <h1 tw="text-xl font-pb">Вход с помощью ВКонтакте</h1>

         <p>
            1. Нажмите на кнопку &quot;получить ссылку&quot;, в открывшемся окне
            разрешите доступ и скопируйте ссылку в адресной строке
         </p>
         <p>
            2. Введите скопированную ссылку в поле ниже и нажмите
            &quot;войти&quot;
         </p>

         <Formik
            initialValues={{
               url: '',
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={Yup.object({
               url: Yup.string()
                  .url('Введите правильную ссылку')
                  .required('Обязательно'),
            })}
            onSubmit={async ({ url }, actions) => {
               await login({ url })
                  .unwrap()
                  .then(res => {
                     closeModal()
                     router.push('/groups')
                     toast.success('Вход выполнен успешно')
                  })
                  .catch(() => {
                     toast.error('Не удалось войти')
                  })
            }}
         >
            {props => (
               <FormStyles>
                  <fieldset disabled={loadingState}>
                     {errorState && <ErrorMessageQuery error={errorState} />}
                     <label htmlFor="url">
                        <span>Ссылка</span>
                        <Field
                           name="url"
                           type="text"
                           placeholder="https://oauth.vk.com"
                        />
                     </label>

                     <ErrorMessage name="url">
                        {text => (
                           <>
                              <span className="error">{text}</span>
                              <br />
                           </>
                        )}
                     </ErrorMessage>

                     <Button
                        tw="mr-4"
                        type="button"
                        onClick={() => getVKLink()}
                     >
                        Получить ссылку
                     </Button>
                     <GreenButton type="submit">Войти</GreenButton>
                  </fieldset>
               </FormStyles>
            )}
         </Formik>
      </Modal>
   )
}

export default LoginModal
