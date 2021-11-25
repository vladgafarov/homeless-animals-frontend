import * as Yup from 'yup'
import { ErrorMessage, Field, Formik } from 'formik'
import FormStyles from '../styles/Form'
import Modal from '../utils/Modal'
import ErrorMessageQuery from '../utils/ErrorMessage'
import tw from 'twin.macro'
import { Button, GreenButton } from '../styles/Buttons'
import { useLazyGetVKLinkQuery } from '../redux/api/auth/getVKLink'
import LoadingOverlay from '../utils/LoadingOverlay'
import { useEffect, useState } from 'react'
import { useSignUpMutation } from '../redux/api/auth/signUp'
import { parseUrl } from '../../lib/parseUrl'
import { useLoginMutation } from '../redux/api/auth/login'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const RegisterModal = ({ isOpen, closeModal }) => {
   const router = useRouter()

   const [getVKLink, { data, isLoading, error, isSuccess }] =
      useLazyGetVKLinkQuery()
   const [signUp, { isLoading: isSignUpLoading, error: signUpError }] =
      useSignUpMutation()
   const [login, { isLoading: isLoginLoading, error: loginError }] =
      useLoginMutation()

   useEffect(() => {
      if (isSuccess) {
         window.open(data, '_blank')
      }
   }, [isSuccess, data])

   const loadingState = isLoading || isLoginLoading || isSignUpLoading
   const errorState = error || loginError || signUpError

   return (
      <Modal isOpen={isOpen} closeModal={closeModal}>
         <LoadingOverlay loading={loadingState} />

         <h1 tw="text-xl font-pb">Регистрация с помощью ВКонтакте</h1>

         <p>
            1. Нажмите на кнопку &quot;получить ссылку&quot;, в открывшемся окне
            разрешите доступ и скопируйте ссылку в адресной строке
         </p>
         <p>
            2. Введите скопированную ссылку в поле ниже и нажмите
            &quot;зарегистрироваться&quot;
         </p>

         {errorState && <ErrorMessageQuery error={errorState} />}

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
               await signUp({ url })
                  .unwrap()
                  .then(async () => {
                     toast.success('Регистрация прошла успешно')
                     await login({ url })
                        .unwrap()
                        .then(() => {
                           toast.success('Вход выполнен успешно')
                           router.push('/groups')
                        })
                        .catch(() => {
                           toast.error('Не удалось войти')
                        })
                  })
                  .catch(() => {
                     toast.error('Не удалось зарегистрироваться')
                  })
            }}
         >
            {props => (
               <FormStyles>
                  <fieldset disabled={loadingState}>
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
                     <GreenButton type="submit">Зарегистрироваться</GreenButton>
                  </fieldset>
               </FormStyles>
            )}
         </Formik>
      </Modal>
   )
}

export default RegisterModal
