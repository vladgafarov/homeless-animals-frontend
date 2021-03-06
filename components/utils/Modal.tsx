import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { IoCloseOutline } from 'react-icons/io5'

const ModalStyles = styled(motion.div)`
   z-index: 42;
   ${tw`fixed top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none`}
`

const ModalContent = styled(motion.div)`
   ${tw`relative w-11/12 sm:w-4/5 lg:w-2/3 xl:w-2/5 2xl:w-1/3 rounded-xl pointer-events-auto overflow-hidden bg-white p-6 text-black`}
`

export const CloseButton = styled.span`
   ${tw`
      absolute
      top-3 right-4
      text-2xl cursor-pointer text-black
   `}
`

const ModalOverlay = styled(motion.div)`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.8);
   z-index: 41;
`

interface IModal {
   children: React.ReactNode
   isOpen: boolean
   closeModal: Function
   customStyles?: boolean
}

const Modal = ({ children, isOpen, closeModal }: IModal) => {
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
                  <ModalContent layout>
                     {children}
                     <CloseButton onClick={() => closeModal()}>
                        <IoCloseOutline />
                     </CloseButton>
                  </ModalContent>
               </ModalStyles>
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

export default Modal
