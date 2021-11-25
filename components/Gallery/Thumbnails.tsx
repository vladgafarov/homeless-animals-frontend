import tw, { styled } from 'twin.macro'
import Image from 'next/image'
import { Image as IImage } from './Gallery'
import { IDots } from './Dots'
import { AnimateSharedLayout } from 'framer-motion'
import SmoothTransition from '../Animations/SmoothTransition'

interface IThumbnails extends IDots {
   images: IImage[]
}

const ThumbnailsStyles = tw.div`
   flex justify-center space-x-4 my-6 min-w-min
`

const Thumbnail = styled.div`
   ${tw`
      relative
      w-24 h-16 border-2 
   `}
   .smooth {
      ${tw`
         absolute -inset-0.5
         border-4 border-blue-400 bg-transparent
         z-50
      `}
   }
`

const Thumbnails = ({ slider, currentSlide, images }: IThumbnails) => {
   return (
      <AnimateSharedLayout>
         <div tw="overflow-x-auto w-full">
            <ThumbnailsStyles>
               {images.map((image, i) => (
                  <Thumbnail
                     onClick={() => {
                        slider.moveToSlide(i)
                     }}
                     // css={currentSlide === i ? tw`border-blue-300` : ''}
                     key={i}
                  >
                     <Image
                        src={image.src}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        quality="20"
                     />
                     {currentSlide === i && <SmoothTransition name="smooth" />}
                  </Thumbnail>
               ))}
            </ThumbnailsStyles>
         </div>
      </AnimateSharedLayout>
   )
}

export default Thumbnails
