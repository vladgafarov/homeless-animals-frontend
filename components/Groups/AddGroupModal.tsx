import Modal from '../utils/Modal'
import tw from 'twin.macro'
import { ErrorMessage, Field, Formik } from 'formik'
import ErrorMessageMutation from '../utils/ErrorMessage'
import * as Yup from 'yup'
import { Button } from '../styles/Buttons'
import LoadingOverlay from '../utils/LoadingOverlay'
import FormStyles from '../styles/Form'
import { useAddGroupMutation } from '../redux/api/group/addGroup'
import toast from 'react-hot-toast'
import MultiInput, { Option } from './MultiInput'
import { useState } from 'react'
import { prepareMultiInput } from '../../lib/prepareMultiInput'
interface IGroupModal {
   isOpen: boolean
   closeModal: () => void
}

const GroupModal = ({ isOpen, closeModal }: IGroupModal) => {
   const [cities, setCities] = useState<Option[]>([])
   const [categories, setCategories] = useState<Option[]>([])

   const [addGroup, { error }] = useAddGroupMutation()

   return (
      <Modal isOpen={isOpen} closeModal={closeModal}>
         <h1 tw="font-pb text-2xl">Добавить группу</h1>
         <Formik
            initialValues={{
               name: '',
               link: '',
               regions: [],
               animalTypes: [],
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={Yup.object({
               name: Yup.string()
                  .min(2, 'От 2-х символов')
                  .required('Обязательно'),
               link: Yup.string()
                  .min(5, 'От 5 символов')
                  .required('Обязательно')
                  .url('Неверная ссылка (не забудьте про https://)'),
            })}
            onSubmit={async (values, actions) => {
               if (cities.length === 0) {
                  actions.setFieldError(
                     'regions',
                     'Введите как минимум 1 город'
                  )
               } else if (categories.length === 0) {
                  actions.setFieldError(
                     'animalTypes',
                     'Введите как минимум 1 категорию'
                  )
               } else {
                  await addGroup({
                     name: values.name,
                     link: values.link,
                     regions: prepareMultiInput(cities),
                     animalTypes: prepareMultiInput(categories),
                  })
                     .unwrap()
                     .then(res => {
                        toast.success('Группа успешно добавлена')
                        closeModal()
                     })
               }
            }}
         >
            {({ isSubmitting }) => (
               <FormStyles>
                  <fieldset disabled={isSubmitting}>
                     <LoadingOverlay loading={isSubmitting} />

                     {error && <ErrorMessageMutation error={error} />}

                     <label>
                        <span>Название группы:</span>
                        <Field name="name" type="text" placeholder="" />
                     </label>
                     <ErrorMessage name="name">
                        {text => <span className="error">{text}</span>}
                     </ErrorMessage>

                     <label>
                        <span>Ссылка на группу:</span>
                        <Field name="link" type="text" placeholder="" />
                     </label>
                     <ErrorMessage name="link">
                        {text => <span className="error">{text}</span>}
                     </ErrorMessage>

                     <label>
                        <span>Города:</span>
                        <MultiInput
                           setExternalState={setCities}
                           placeholder={'Введите город и нажмите Enter'}
                        />
                     </label>
                     <ErrorMessage name="regions">
                        {text => <span className="error">{text}</span>}
                     </ErrorMessage>

                     <label>
                        <span>Категории:</span>
                        <MultiInput
                           setExternalState={setCategories}
                           placeholder={'Введите регион и нажмите Enter'}
                        />
                     </label>
                     <ErrorMessage name="animalTypes">
                        {text => (
                           <>
                              <span className="error">{text}</span>
                              <br />
                           </>
                        )}
                     </ErrorMessage>

                     <Button type="submit">Добавить</Button>
                  </fieldset>
               </FormStyles>
            )}
         </Formik>
      </Modal>
   )
}

export default GroupModal
