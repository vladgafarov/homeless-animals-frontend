import NavLink from './NavLink'
import tw from 'twin.macro'
import { AnimateSharedLayout } from 'framer-motion'
import Tooltip from '../utils/Tooltip'

const Nav = () => {
   return (
      <div tw="hidden lg:block">
         <ul tw="flex items-center space-x-1 xl:space-x-4">
            <AnimateSharedLayout>
               <NavLink href="/groups">Группы</NavLink>
               <NavLink href="/users">Пользователи</NavLink>
               <NavLink href="/create">Создать публикацию</NavLink>
               <NavLink href="/posts">Мои публикации</NavLink>
            </AnimateSharedLayout>
         </ul>
      </div>
   )
}

export default Nav
