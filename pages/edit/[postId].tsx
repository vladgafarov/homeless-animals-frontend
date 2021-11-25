import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { ReactElement } from 'react'
import EditPost from '../../components/EditPost/EditPost'
import Layout from '../../components/Layout/Layout'

const EditPostPage = ({ userInfo }) => {
   return (
      <>
         <Head>
            <title>Редактирование поста</title>
         </Head>
         <EditPost userInfo={userInfo} />
      </>
   )
}

EditPostPage.getLayout = function getLayout(page: ReactElement) {
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

export default EditPostPage
