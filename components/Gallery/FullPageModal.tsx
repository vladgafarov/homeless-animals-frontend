import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import Image from 'next/image'
import { IoCloseOutline } from 'react-icons/io5'

const ModalStyles = styled(motion.div)`
   z-index: 1002;
   ${tw`fixed top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none`}
`

const ModalContent = styled(motion.div)`
   ${tw`relative w-11/12 sm:w-4/5 lg:w-2/3 h-4/5 rounded pointer-events-auto overflow-hidden bg-white p-6 text-black`}
`

export const CloseButton = styled(motion.span)`
   z-index: 1002;
   ${tw`
      fixed
      top-3 right-4
      text-3xl cursor-pointer text-white
   `}
`

const ModalOverlay = styled(motion.div)`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.9);
   z-index: 1001;
`

interface IModal {
   image: string
   isOpen: boolean
   closeModal: Function
}

const FullPageModal = ({ image, isOpen, closeModal }: IModal) => {
   useEffect(() => {
      document.addEventListener('keyup', e => {
         if (e.key == 'Escape') {
            closeModal()
         }
      })
   }, [isOpen, closeModal])

   return (
      <AnimatePresence>
         {isOpen && (
            <>
               <ModalStyles
                  initial={{ opacity: 0, y: 100, scale: 0.95 }}
                  animate={{
                     opacity: 1,
                     y: 0,
                     scale: 1,
                  }}
                  exit={{ opacity: 0, y: 100, scale: 0.95 }}
                  transition={{
                     duration: 0.35,
                  }}
               >
                  <ModalContent>
                     <Image
                        src={image}
                        alt=""
                        layout="fill"
                        objectFit="contain"
                     />
                  </ModalContent>
               </ModalStyles>
               <CloseButton
                  onClick={() => closeModal()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
               >
                  <IoCloseOutline />
               </CloseButton>
               <ModalOverlay
                  onClick={() => closeModal()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
               />
            </>
         )}
      </AnimatePresence>
   )
}

export default FullPageModal
