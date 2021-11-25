import Head from 'next/head'
import { ReactElement, useMemo, useState } from 'react'
import Layout from '../components/Layout/Layout'
import tw from 'twin.macro'
import Gallery from '../components/Gallery/Gallery'

const PlaygroundPage = () => {
   const [originalImages, setOriginalImages] = useState([])

   return (
      <>
         <Head>
            <title>Playground</title>
         </Head>
         <Gallery setOriginalImages={setOriginalImages} />
      </>
   )
}

PlaygroundPage.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>
}
export default PlaygroundPage
