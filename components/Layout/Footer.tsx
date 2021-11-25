import Link from 'next/link'
import Image from 'next/image'
import { FaRegCopyright, FaTelegram } from 'react-icons/fa'
import tw, { styled } from 'twin.macro'
import logo from '../../public/static/logo.svg'

const FooterStyles = styled.footer`
   ${tw`bg-blue-50 py-6`}

   > div:first-of-type {
      ${tw`flex flex-col space-y-3 lg:(flex-row items-start justify-between space-y-0) mb-8`}

      div {
         ${tw`
            lg:px-1
         `}
      }
   }

   h5 {
      ${tw`text-xl font-pb`}
   }

   .logo {
      ${tw`flex items-center`}
      h5 {
         ${tw`ml-2`}
      }
   }
`

function Footer() {
   return (
      <FooterStyles className="padding-register-page">
         <div>
            <div className="logo">
               <Image src={logo} alt="" />
               <h5>Charity Assistant</h5>
            </div>

            <div>
               <h5>Поддержка</h5>
               <p>animalshomeless@yandex.ru</p>
               <p>+7 (922) 246-09-29</p>
            </div>

            <div>
               <h5>Информация</h5>
               <a href="#">Правила использования сайта</a>
            </div>

            <div>
               <h5>Мы в соц. сетях</h5>
               <Link href="https://t.me/vakonkov">
                  <a target="_blank">
                     <FaTelegram size="24" />
                  </a>
               </Link>
            </div>
         </div>
         <p tw="flex items-center lg:pl-1">
            <FaRegCopyright /> <span tw="ml-2">2021 Charity Assistant </span>
         </p>
      </FooterStyles>
   )
}

export default Footer
