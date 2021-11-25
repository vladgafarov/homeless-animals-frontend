import Footer from './Footer'
import Header from './Header'
import tw from 'twin.macro'
import { Provider } from 'react-redux'
import { store } from '../redux/store'

const Layout: React.FC = ({ children }) => {
   return (
      <Provider store={store}>
         <main tw="min-h-screen flex flex-col justify-between overflow-hidden">
            <Header />
            <div tw="flex-grow min-h-screen" className="padding">
               {children}
            </div>
            <Footer />
         </main>
      </Provider>
   )
}

export default Layout
