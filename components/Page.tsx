import { createGlobalStyle } from 'styled-components'
import tw, { GlobalStyles as BaseStyles } from 'twin.macro'
import 'tippy.js/dist/tippy.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'keen-slider/keen-slider.min.css'

export const GlobalStyles = createGlobalStyle`
   @font-face {
      font-family: 'proxima';
      src: url('/static/fonts/proxima/ProximaNova-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
   }
   @font-face {
      font-family: 'proxima-medium';
      src: url('/static/fonts/proxima/ProximaNova-Semibold.woff') format('woff');
      font-style: normal;
   }
   @font-face {
      font-family: 'proxima-bold';
      src: url('/static/fonts/proxima/ProximaNova-Bold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
   }

   html, body {
      font-family: Helvetica, Arial;
      ${tw`font-p`}
   }

   .padding {
      ${tw`px-7 md:px-12 lg:px-20 xl:px-24 2xl:px-32`}
   }

   .padding-register-page {
      ${tw`px-7 md:px-12 lg:px-20 xl:px-32 2xl:px-80`}
   }

   .layout-content {
      ${tw`max-w-6xl mx-auto mb-6`}
   }

   .error {
      ${tw`
         text-red-500
         font-pb
      `}
   }

   input[type='checkbox'] {
      ${tw`h-5 w-5 rounded transition text-blue-500 focus:(ring-offset-0 ring-transparent)`}
   }
`

const Page = ({ children }) => {
   return (
      <>
         <BaseStyles />
         <GlobalStyles />
         {children}
      </>
   )
}

export default Page
