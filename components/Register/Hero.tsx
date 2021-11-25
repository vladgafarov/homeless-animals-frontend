import Image from 'next/image'
import logo from '../../public/static/logo.svg'
import dog from '../../public/static/dog.svg'
import tw from 'twin.macro'
import { Button } from '../styles/Buttons'
import { FaVk } from 'react-icons/fa'
import { IModal } from '../../lib/useModal'

const Hero = ({ openModal }: Pick<IModal, 'openModal'>) => {
   return (
      <div
         className="hero padding-register-page"
         tw="bg-blue-50 pt-4 pb-8 lg:pb-12"
      >
         <div className="header" tw="flex items-center">
            <Image src={logo} alt="Помощь домашним животным" />
            <h1 tw="font-pb text-2xl ml-2">Charity Assistant</h1>
         </div>
         <div
            className="content"
            tw="flex flex-col lg:flex-row items-center justify-between pt-6"
         >
            <div className="text" tw="max-w-xl mb-4">
               <h2 tw="uppercase text-xl lg:text-3xl font-pb">
                  Сервис автоматической публикации благотворительных объявлений
               </h2>
               <p tw="lg:text-xl py-4">
                  Размести ваше объявление в несколько кликов
               </p>
               <Button onClick={openModal} tw="flex items-center">
                  <span tw="mr-2">Войти через ВКонтакте</span> <FaVk />
               </Button>
            </div>
            <div className="image">
               <Image src={dog} alt="Помощь домашним животным" />
            </div>
         </div>
      </div>
   )
}

export default Hero
