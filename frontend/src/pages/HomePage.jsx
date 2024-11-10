import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { motion } from "framer-motion";



const categories = [
	{ href: "/shirts", name: "Shirts", imageUrl: "/shirts.jpg" },
	{ href: "/pants", name: "Pants & Shorts", imageUrl: "/pants.jpg" },
	{ href: "/dresses", name: "Dress", imageUrl: "/dresses.jpg" },
	{ href: "/jackets", name: "Jackets & Coats", imageUrl: "/jackets.jpg" },
	{ href: "/sweats", name: "Hoodies & Sweaters", imageUrl: "/sweats.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/accessories", name: "Accessories", imageUrl: "/accessories.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
	{ href: "/hats", name: "Hats", imageUrl: "/hats.jpg" },
	{ href: "/underwears", name: "Underwears", imageUrl: "/underwears.jpg" },
];

const HomePage = () => {
	useEffect(()=>{
		window.scrollTo(0, 0);
	  },[])

	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<motion.div 
			className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 h-60 space-y-7 sm:space-y-10 mt-20 mb-16 content-center'
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 1, type: 'spring', stiffness: 100 }}
		>
				<h1 className='text-center text-4xl	 sm:text-6xl font-bold text-primary_text_color'>
					Unleash your style where comfort meets confidence
				</h1>
				<h1 className='text-center text-2xl sm:text-4xl font-bold'>
					Look good, feel good
				</h1>
			</motion.div>
			<motion.div 
			className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16'
			initial={{ opacity: 0, y: 40 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1, type: 'spring', stiffness: 100 }}
			>
				<h3 className='text-center text-4xl sm:text-5xl font-bold text-primary_text_color mb-4'>
					Explore Our Categories
				</h3>
				<p className='text-center text-xl text-gray-300 mb-12'>
					Discover the latest trends in eco-friendly fashion
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</motion.div>
		</div>
	);
};

export default HomePage;