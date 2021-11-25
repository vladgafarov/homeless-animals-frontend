import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { ReactElement } from 'react'
import Layout from '../components/Layout/Layout'
import PostBuilder from '../components/PostBuilder/PostBuilder'

const CreatePage = ({ userInfo }) => {
   return (
      <>
         <Head>
            <title>Создать публикацию</title>
         </Head>
         <PostBuilder userInfo={userInfo} />
      </>
   )
}

CreatePage.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async context => {
   const cookie = context.req.headers.cookie

   const userInfo = await fetch(`${process.env.BACKEND}info`, {
      method: 'GET',
      headers: {
         cookie,
      },
   })

   return {
      props: {
         userInfo: await userInfo.text(),
      },
   }
}

export default CreatePage
