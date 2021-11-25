import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'
import Layout from '../components/Layout/Layout'
import Posts from '../components/Posts/Posts'

const PostsPage = ({ userInfo }) => {
   return <Posts userInfo={userInfo} />
}

PostsPage.getLayout = function getLayout(page: ReactElement) {
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

export default PostsPage
