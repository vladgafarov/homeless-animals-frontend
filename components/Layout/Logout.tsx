import { useRouter } from 'next/router'
import { useLogoutMutation } from '../redux/api/auth/logout'
import ErrorMessage from '../utils/ErrorMessage'

const Logout = () => {
   const [logout, { error }] = useLogoutMutation()
   const router = useRouter()

   return (
      <div>
         {error && <ErrorMessage error={error} />}
         <button
            onClick={async () => {
               await logout()
               router.push('/login')
            }}
         >
            Выход
         </button>
      </div>
   )
}

export default Logout
