import { ReactElement } from 'react'
import Layout from '../components/Layout/Layout'
import Users from '../components/Users/Users'

const UserPage = () => {
   return <Users />
}

UserPage.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>
}

export default UserPage
