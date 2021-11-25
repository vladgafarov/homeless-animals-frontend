import { Form } from 'formik'
import tw, { styled } from 'twin.macro'

const FormStyles = styled(Form)`
   ${tw`relative`}

   label {
      ${tw`
         flex flex-col
         font-pm
         mt-5
      `}
      span {
         ${tw`text-lg`}
      }
   }

   input,
   textarea {
      ${tw`
         py-2 px-4 
         border-2 border-blue-400 rounded 
         outline-none
         transition
         focus:(ring-2 ring-blue-300 border-blue-500)
      `}
   }

   button {
      ${tw`mt-5`}
   }

   .error {
      ${tw`
         text-red-500
         font-pb
      `}
   }
`

export default FormStyles
