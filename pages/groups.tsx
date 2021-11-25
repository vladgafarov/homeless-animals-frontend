import { ReactElement } from 'react'
import Groups from '../components/Groups/Groups'
import Layout from '../components/Layout/Layout'

const GroupsPage = () => {
   return <Groups />
}

GroupsPage.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>
}

export default GroupsPage
