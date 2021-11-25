import { ErrorMessage, Field, Formik, useFormikContext } from 'formik'
import { scroller } from 'react-scroll'
import { useContext, useEffect, useCallback } from 'react'
import * as Yup from 'yup'
import tw, { styled } from 'twin.macro'
import FormStyles from '../styles/Form'
import LoadingOverlay from '../utils/LoadingOverlay'
import { GreenButton } from '../styles/Buttons'
import { FaAngleRight } from 'react-icons/fa'
import { PostBuilderContext } from './PostBuilderContext'
import { Text } from './PostBuilderContext'
import { debounce } from 'lodash'

const CreatePostStyles = styled.div`
   ${tw`my-8`}
   input {
      ${tw`md:w-1/2`}
   }
   textarea {
      ${tw`md:w-3/4`}
   }
   .description {
      ${tw`text-gray-400 text-sm -mt-1 mb-2`}
   }
`

const AutoSetValues = () => {
   const { setText } = useContext(PostBuilderContext)
   const { values } = useFormikContext()

   const request = debounce(value => {
      setText(value as Text)
   }, 1000)
   //eslint-disable-next-line
   const debouceRequest = useCallback(value => request(value), [])

   useEffect(() => {
      const textValues = Object.values(values).filter(Boolean)
      if (textValues.length > 2) {
         debouceRequest(values)
      } else {
         debouceRequest(null)
      }
   }, [setText, values, debouceRequest])
   return null
}

const CreatePost = ({ setIndex }) => {
   const { setText } = useContext(PostBuilderContext)

   return (
      <CreatePostStyles>
         <Formik
            initialValues={{
               namePost: '',
               ageAnimal: '',
               description: '',
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={Yup.object({
               namePost: Yup.string()
                  .min(3, 'От 3-х символов')
                  .required('Обязательно'),
               ageAnimal: Yup.string().required('Обязательно'),
               description: Yup.string()
                  .min(3, 'От 3-х символов')
                  .required('Обязательно'),
            })}
            onSubmit={async (values, actions) => {
               setIndex(1)
               setText(values)
               scroller.scrollTo('tabs', {
                  duration: 650,
                  smooth: true,
                  offset: -30,
               })
            }}
         >
            {({ isSubmitting }) => (
               <FormStyles>
                  <fieldset disabled={isSubmitting}>
                     <LoadingOverlay loading={isSubmitting} />

                     <label htmlFor="namePost">
                        <span>Название поста:</span>
                        <p className="description">Something helpful</p>
                        <Field name="namePost" type="text" />
                     </label>
                     <ErrorMessage name="namePost">
                        {text => <span className="error">{text}</span>}
                     </ErrorMessage>

                     <label htmlFor="ageAnimal">
                        <span>Возраст:</span>
                        <p className="description">Something helpful</p>
                        <Field name="ageAnimal" type="text" />
                     </label>
                     <ErrorMessage name="ageAnimal">
                        {text => <span className="error">{text}</span>}
                     </ErrorMessage>

                     <label htmlFor="description">
                        <span>Описание:</span>
                        <p className="description">Something helpful</p>
                        <Field as="textarea" name="description" type="text" />
                     </label>
                     <ErrorMessage name="description">
                        {text => <span className="error">{text}</span>}
                     </ErrorMessage>

                     <br />

                     <GreenButton type="submit" tw="flex items-center font-pm">
                        Далее <FaAngleRight tw="ml-1" size={18} />
                     </GreenButton>

                     <AutoSetValues />
                  </fieldset>
               </FormStyles>
            )}
         </Formik>
      </CreatePostStyles>
   )
}

export default CreatePost
