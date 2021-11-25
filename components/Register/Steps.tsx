import Image from 'next/image'
import gallery from '../../public/static/gallery.svg'
import settings from '../../public/static/settings.svg'
import survey from '../../public/static/survey.svg'
import tw from 'twin.macro'

const Steps = () => {
   return (
      <div className="steps" tw="py-8">
         <h1 tw="text-3xl font-pb text-center mb-8 xl:mb-16">
            Необходимые шаги
         </h1>

         <div
            className="padding-register-page"
            tw="flex flex-col space-y-8 lg:(flex-row space-y-0) items-stretch justify-around"
         >
            <div tw="text-center flex flex-col justify-between">
               <Image src={settings} alt="" />
               <p>Настроить фильтры</p>
            </div>
            <div tw="text-center flex flex-col justify-between">
               <Image src={survey} alt="" />
               <p>Написать пост о питомце</p>
            </div>
            <div tw="text-center flex flex-col justify-between">
               <Image src={gallery} alt="" />
               <p>Загрузить фотографию питомца</p>
            </div>
         </div>
      </div>
   )
}

export default Steps
