import PeopleAlsoBought from "../components/PeopleAlsoBought"
import { motion } from "framer-motion"
import { useProductStore } from "../stores/useProductStore";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { ShoppingCart, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";


const ProductPage = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])

    const { fetchProductById, product, deleteProduct } = useProductStore();
    
    const { id } = useParams();


    useEffect(() => {
		fetchProductById(id);
        }, [fetchProductById, id]);

    const { user } = useUserStore();
    const isAdmin = user?.role === "admin";
    const { addToCart } = useCartStore();
    const handleAddToCart = (product) => {
        if (!user) {
            toast.error("Please login to add products to cart", { id: "login" });
            return;
        } else {
            // add to cart
            addToCart(product);
        }
    };

    const handleDeteteProduct = (productId) => {
        deleteProduct(productId);
        window.history.back();
        window.location.reload();
    }   

    return (
        <div className='relative min-h-screen text-white overflow-hidden'>
            {product.length === 0 ? (
                <motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 justify-items-center mt-20'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.2 }}
				>
                    <h1 className='text-8xl font-semibold text-gray-300 text-center col-span-full'>
                        404
                    </h1>
                    <h2 className='text-4xl font-semibold text-gray-300 text-center col-span-full'>
                        Product not Found
                    </h2>
                </motion.div>
            ) : (
                <div className="relative min-h-screen text-white overflow-hidden z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 mt-6 mb-10 justify-items-center flex flex-col">
                    <div className="relative rounded-lg border p-6 sm:p-12 md:p-20 lg:p-36 shadow-sm border-gray-700 bg-gray-800 justify-items-center flex flex-col">
                        <div className="sm:mx-auto sm:w-full sm:max-w-4xl flex justify-around gap-6 lg:gap-14 w-full items-center sm:mb-6">
                            <motion.div
                                className='rounded-lg overflow-hidden lg:max-w-96 max-h-96 max-w-96 flex'
                                initial={{ opacity: 0, x: -40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                            <img
                                src={product.image}
                                alt={product.name}
                                className='w-full h-full max-h-96 max-w-96 object-cover transition-transform duration-500 ease-out group-hover:scale-110 rounded-lg'
                                loading='lazy'
                            />
                            </motion.div>
                            <motion.div
                                className='lg:max-w-96 rounded-lg overflow-hidden content-around flex flex-col h-full flex-shrink sm:gap-6'
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                <h3 className='text-left text- sm:text-xl md:text-2xl lg:text-3xl font-semibold sm:font-semibold tracking-tight text-primary_text_color mb-4 w-full'>
                                    { product.name }
                                </h3>
                                <div className="flex justify-between">
                                    <button
                                        className='flex items-center justify-center rounded-lg bg-primary_button_color px-5 py-2.5 text-center text-sm font-medium
                                        text-white hover:bg-primary_button_hover_color active:outline-offset-2 active:ring-2 active:ring-primary_color max-w-96 w-3/4'
                                        alt = "Add to cart"
                                        onClick={ () => {handleAddToCart(product._id)}}
                                    >
                                        <ShoppingCart size={22} className='mr-2' />
                                        <span className='hidden sm:inline ml-2'>Add to cart</span>
                                    </button>
                                    {isAdmin && (<button
                                        className=' rounded-lg place-content-center bg-red-500 hover:bg-red-600 w-1/5 flex items-center'
                                        alt = "Delete Product"
                                        onClick={() => {handleDeteteProduct(product._id)}}
                                    >
                                        <Trash className='h-5 w-5' />
                                    </button>)}
                                </div>
                            </motion.div>
                        </div>
                        <motion.div
                        className='sm:mx-auto sm:w-full sm:max-w-4xl space-y-10 flex flex-col mt-10'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <h3 className='text-2xl sm:text-3xl font-semibold tracking-tight mb-4 '>
                                Product Description:
                            </h3>
                            <p className='text-center text-base sm:text-xl text-gray-300 mb-12'>
                                { product.description }
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        className='sm:mx-auto sm:w-full flex flex-row justify-center'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <PeopleAlsoBought />
                    </motion.div>
                </div>
            )}
        </div>
    )
}

export default ProductPage;