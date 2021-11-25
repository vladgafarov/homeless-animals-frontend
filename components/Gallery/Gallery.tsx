import { TDetails } from 'keen-slider'
import { useKeenSlider } from 'keen-slider/react'
import tw from 'twin.macro'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { SliderWrapper } from './styles/SliderWrapper'
import ArrowLeft from './ArrowLeft'
import ArrowRight from './ArrowRight'
import Thumbnails from './Thumbnails'
import ImageUploadButton from './ImageUploadButton'
import DeleteButton from './DeleteButton'
import FullPageButton from './FullPageButton'
import FullPageModal from './FullPageModal'
import { useModal } from '../../lib/useModal'
import { OriginalImages } from '../PostBuilder/PostBuilderContext'

const MAX_SIZE = 10

export interface Image {
   id: number
   src: string
}

const Gallery = ({
   setOriginalImages,
   defaultImages,
}: {
   setOriginalImages: Dispatch<SetStateAction<OriginalImages[]>>
   defaultImages?: string[]
}) => {
   const [images, setImages] = useState<Image[]>([])
   const [currentSlide, setCurrentSlide] = useState(null)
   const [sliderState, setSliderState] = useState<TDetails>(null)
   const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
      initial: 0,
      move: s => {
         setSliderState(s.details())
      },
      slideChanged(s) {
         setCurrentSlide(s.details().relativeSlide)
      },
   })
   const { isOpen, openModal, closeModal } = useModal()

   const uploadImage = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target.files && target.files[0]) {
         for (let i = 0; i < target.files.length; i++) {
            const id = Date.now() + Math.floor(Math.random() * 100000)
            const img = URL.createObjectURL(target.files[i])
            setImages(prev => [
               ...prev,
               {
                  id,
                  src: img,
               },
            ])
            setOriginalImages(prev => [
               ...prev,
               {
                  id,
                  file: target.files[i],
               },
            ])
         }
      }
   }

   const slideValues = () => {
      if (!sliderState) return [0]

      const values = []
      for (let i = 0; i < images.length; i++) {
         values.push(images[i].src)
      }

      return values
   }

   const deleteImage = () => {
      setImages(prev => [
         ...prev.filter(image => image.id !== images[currentSlide].id),
      ])
      setOriginalImages(prev => [
         ...prev.filter(image => image.id !== images[currentSlide].id),
      ])
   }

   useEffect(() => {
      if (slider) {
         slider.refresh()
      }
   }, [images, slider])

   useEffect(() => {
      if (defaultImages) {
         defaultImages.forEach(image => {
            const id = Math.floor(Date.now() + Math.random() * 10000)

            fetch(image)
               .then(function (response) {
                  return response.blob()
               })
               .then(function (blob) {
                  setImages(prev => [
                     ...prev,
                     {
                        id,
                        src: URL.createObjectURL(blob),
                     },
                  ])
                  setOriginalImages(prev => [
                     ...prev,
                     {
                        id,
                        file: new File([blob], 'image', { type: blob.type }),
                     },
                  ])
               })
               .catch(err => {
                  console.log(err)
               })
         })
      }
   }, [defaultImages, setOriginalImages])

   return (
      <>
         {defaultImages && <h1 tw="font-pb text-2xl w-full mt-6">Галерея</h1>}
         <div tw="flex flex-col lg:flex-row lg:items-center justify-between mt-6 mb-6">
            <ImageUploadButton
               uploadImage={uploadImage}
               disabled={sliderState ? sliderState.size >= MAX_SIZE : false}
            />
            <span>
               Количество фотографий{' '}
               <span tw="text-blue-500">
                  {sliderState ? sliderState.size : 0}
               </span>
               /{MAX_SIZE}
            </span>
         </div>
         <SliderWrapper>
            <div ref={sliderRef} className="keen-slider slider">
               {slideValues()?.map((image, i) => {
                  return (
                     <div className="keen-slider__slide slide" key={i}>
                        {typeof image === 'string' && (
                           <Image
                              src={image}
                              alt=""
                              layout="fill"
                              objectFit="contain"
                              quality="75"
                           />
                        )}
                     </div>
                  )
               })}
            </div>
            {slider && images.length > 0 && (
               <>
                  <ArrowLeft
                     onClick={e => e.stopPropagation() || slider.prev()}
                     disabled={currentSlide === 0}
                  />
                  <ArrowRight
                     onClick={e => e.stopPropagation() || slider.next()}
                     disabled={currentSlide === slider.details().size - 1}
                  />
                  <DeleteButton onClick={deleteImage} />
                  <FullPageButton onClick={openModal} />
               </>
            )}
         </SliderWrapper>
         {slider && (
            <Thumbnails
               slider={slider}
               currentSlide={currentSlide}
               images={images}
            />
         )}
         <FullPageModal
            isOpen={isOpen}
            closeModal={closeModal}
            image={images[currentSlide]?.src}
         />
      </>
   )
}

export default Gallery
