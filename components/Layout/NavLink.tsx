import { useRouter } from 'next/router'
import Link from 'next/link'
import tw, { styled } from 'twin.macro'
import SmoothTransition from '../Animations/SmoothTransition'

interface INavLink {
   href: string
   children: React.ReactNode
   isActive?: boolean
   onClick?: () => void
}

// const NavLinkStyles = styled.a(({ isActive }: Pick<INavLink, 'isActive'>) => [
//    tw`
//       text-blue-500 font-pb
//       p-3
//       transition
//       rounded
//       hover:(bg-blue-100)
//    `,
//    isActive && tw`bg-blue-500 text-white`,
// ])

const NavLinkStyles = styled.a`
   ${tw`
      relative
      text-blue-500 font-pb
      p-3
      transition
      rounded
   `}
   ${({ isActive }: Pick<INavLink, 'isActive'>) =>
      isActive ? tw`text-white hover:(text-white)` : tw`hover:(bg-blue-100)`}
   .smooth {
      ${tw`
         absolute inset-0
         bg-blue-500 rounded
      `}
      z-index: -1;
   }
`

const NavLink = ({ href, children, isActive = false, onClick }: INavLink) => {
   const { asPath } = useRouter()
   isActive = asPath === href

   return (
      <li onClick={onClick}>
         <Link href={href} passHref>
            <NavLinkStyles {...{ isActive }}>
               {children}
               {isActive && <SmoothTransition name="smooth" />}
            </NavLinkStyles>
         </Link>
      </li>
   )
}

export default NavLink
