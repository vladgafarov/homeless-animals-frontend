import NProgress from 'nprogress'
import '../styles/nprogress.css'
import type { AppProps } from 'next/app'
import Page from '../components/Page'
import { Router } from 'next/dist/client/router'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { IdProvider } from '@chakra-ui/hooks'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

type NextPageWithLayout = NextPage & {
   getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout
}

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
   const getLayout = Component.getLayout ?? (page => page)

   return getLayout(
      <IdProvider>
         <Page>
            <Component {...pageProps} />
            <Toaster
               position="bottom-right"
               toastOptions={{ success: { duration: 4000 } }}
            />
         </Page>
      </IdProvider>
   )
}

export default MyApp
