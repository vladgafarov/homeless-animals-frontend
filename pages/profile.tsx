import { ReactElement } from 'react'
import Layout from '../components/Layout/Layout'
import Profile from '../components/Profile/Profile'

const ProfilePage = () => {
   return <Profile />
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>
}

export default ProfilePage
