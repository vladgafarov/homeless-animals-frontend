import Footer from '../Layout/Footer'
import Hero from './Hero'
import Steps from './Steps'
import { useModal } from '../../lib/useModal'
import RegisterModal from './RegisterModal'
import LoginModal from './LoginModal'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { useRouter } from 'next/router'

const Register = () => {
   const { isOpen, closeModal, openModal } = useModal()
   const { pathname } = useRouter()

   return (
      <Provider store={store}>
         <Hero openModal={openModal} />
         <Steps />
         <Footer />
         {pathname.includes('[guid]') ? (
            <RegisterModal isOpen={isOpen} closeModal={closeModal} />
         ) : (
            <LoginModal isOpen={isOpen} closeModal={closeModal} />
         )}
      </Provider>
   )
}

export default Register
