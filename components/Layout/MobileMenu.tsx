import tw, { styled } from 'twin.macro'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { CloseButton } from '../utils/Modal'
import NavLink from './NavLink'
import Logout from './Logout'

const NavStyles = styled(motion.nav)`
   background-color: #fff;
   ${tw`
      fixed w-4/5 h-full right-0 top-0
      pl-5 
      flex flex-col justify-center
      z-50
      border-l-4 border-blue-500
   `}
   ul {
      ${tw`list-none pl-0`}
      li {
         ${tw`font-pb my-6`}
      }
   }
`

const Overlay = styled(motion.div)`
   ${tw`
      fixed inset-0 bg-black bg-opacity-80
   `}
`

const variants = {
   open: {
      x: 0,
      transition: {
         type: 'spring',
         stiffness: 300,
         damping: 40,
      },
   },
   closed: {
      x: '100%',
      transition: { duration: 0.5 },
   },
}

const fadeVariants = {
   initial: { opacity: 0 },
   animate: { opacity: 1 },
}

const MobileMenu = ({ isOpen, closeMenu }) => {
   return (
      <AnimatePresence>
         {isOpen && (
            <>
               <NavStyles
                  variants={variants}
                  initial="closed"
                  animate="open"
                  exit="closed"
               >
                  <motion.ul
                     variants={fadeVariants}
                     initial="initial"
                     animate="animate"
                     exit="initial"
                  >
                     <NavLink onClick={closeMenu} href="/groups">
                        Группы
                     </NavLink>
                     <NavLink onClick={closeMenu} href="/users">
                        Пользователи
                     </NavLink>
                     <NavLink onClick={closeMenu} href="/create">
                        Создать публикацию
                     </NavLink>
                     <NavLink onClick={closeMenu} href="/posts">
                        Мои публикации
                     </NavLink>
                  </motion.ul>
                  <motion.div
                     variants={fadeVariants}
                     initial="initial"
                     animate="animate"
                     exit="initial"
                  >
                     <Link href="/profile">
                        <a
                           tw="flex items-center font-pb text-xl"
                           onClick={closeMenu}
                        >
                           {/* <FaUserAlt tw="mr-1" color="#3B82F6" /> */}
                           <span>Профиль</span>
                        </a>
                     </Link>
                     <Logout />
                  </motion.div>
                  <CloseButton onClick={closeMenu}>&times;</CloseButton>
               </NavStyles>
               <Overlay
                  onClick={closeMenu}
                  initial={{ opacity: 0, zIndex: -1 }}
                  animate={{
                     opacity: 1,
                     zIndex: 40,
                     transition: { zIndex: { delay: 0 } },
                  }}
                  exit={{
                     opacity: 0,
                     zIndex: -1,
                  }}
                  transition={{
                     zIndex: {
                        delay: 0.25,
                     },
                  }}
               />
            </>
         )}
      </AnimatePresence>
   )
}

export default MobileMenu
