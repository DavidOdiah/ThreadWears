import { motion } from "framer-motion"

const PageNotFoundPage = () => {
  return (
    <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center mt-20'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
    >
        <h1 className='text-9xl font-bold text-gray-300 text-center col-span-full'>
            404
        </h1>
        <h2 className='text-5xl font-semibold text-gray-300 text-center col-span-full'>
            Page not Found
        </h2>
    </motion.div>
  )
}

export default PageNotFoundPage