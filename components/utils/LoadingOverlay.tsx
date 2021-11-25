import { CgSpinner } from 'react-icons/cg'
import { AnimatePresence, motion } from 'framer-motion'
import tw from 'twin.macro'

const Overlay = ({ children, overlay }) => (
   <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      tw="absolute inset-0 z-40 flex items-center justify-center text-black bg-white bg-opacity-80"
   >
      {children}
   </motion.div>
)

const Loading = ({ size }) => {
   const sizes = {
      sm: '32',
      md: '52',
      lg: '60',
   }

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
      >
         <CgSpinner size={sizes[size] ?? size} tw="animate-spin z-50" />
      </motion.div>
   )
}

interface ILoadingOverlay {
   loading: boolean
   overlay?: boolean
   size?: 'sm' | 'md' | 'lg' | number
}

const LoadingOverlay = ({
   loading,
   overlay = true,
   size = 'md',
}: ILoadingOverlay) => {
   return (
      <AnimatePresence>
         {loading && (
            <Overlay overlay={overlay}>
               <Loading size={size} />
            </Overlay>
         )}
      </AnimatePresence>
   )
}

export default LoadingOverlay
