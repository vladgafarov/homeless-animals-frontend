import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { IoMenu } from 'react-icons/io5'
import tw from 'twin.macro'
import MobileMenu from './MobileMenu'
import Nav from './Nav'
import Tooltip from '../utils/Tooltip'
import Logout from './Logout'

const HeaderStyles = tw.header`
   border-b-2 border-blue-100
   flex items-center justify-between lg:justify-around
   py-3
   px-3 lg:px-0
`

function Header() {
   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

   const openMenu = () => setIsMenuOpen(true)
   const closeMenu = () => setIsMenuOpen(false)

   return (
      <HeaderStyles>
         <div>
            <Link href="/groups">
               <a tw="flex items-center space-x-4 font-pb text-lg xl:text-xl cursor-pointer">
                  <Image
                     src="/static/logo.svg"
                     width="50"
                     height="44"
                     alt="Помощь бездомным животным"
                     className="img-fluid logo"
                  />
                  <span>Charity Assistant</span>
               </a>
            </Link>
         </div>
         <Nav />
         <div tw="hidden lg:block">
            <Tooltip content={<Logout />} interactive>
               <span>
                  <Link href="/profile">
                     <a tw="flex items-center justify-end space-x-4 font-pb  text-lg xl:text-xl cursor-pointer">
                        <span>Пользователь</span>
                        <Image
                           src="/static/user.png"
                           width="50"
                           height="50"
                           alt="Помощь бездомным животным"
                           className="img-fluid logo"
                        />
                     </a>
                  </Link>
               </span>
            </Tooltip>
         </div>

         {/* Mobile menu */}
         <button tw="p-2 lg:hidden" type="button" onClick={openMenu}>
            <IoMenu size="22" />
         </button>
         <MobileMenu isOpen={isMenuOpen} closeMenu={closeMenu} />
      </HeaderStyles>
   )
}

export default Header
