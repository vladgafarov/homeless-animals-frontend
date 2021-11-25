import { motion } from 'framer-motion'

const SmoothTransition = ({
   name,
   transition,
}: {
   name: string
   transition?: {}
}) => {
   return (
      <motion.div
         layoutId={name}
         className={name}
         initial={false}
         animate={{ opacity: 1 }}
         transition={{
            duration: 0.35,
            ease: 'easeInOut',
         }}
      />
   )
}

export default SmoothTransition
