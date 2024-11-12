import toast from "react-hot-toast";
import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			// add to cart
			addToCart(product);
		}
	};

	return (
		<div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-primary_dark_color shadow-lg shadow-primary_hover_color'>
			<Link to={ "/products/" + product._id}>
				<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
					<img className='object-cover w-full transition-transform duration-500 ease-out hover:scale-110' src={product.image} alt='product image' />
					<div className='absolute inset-0 bg-black bg-opacity-20' />
				</div>

				<div className='mt-4 px-5 pb-5'>
					<h5 className='text-xl font-semibold tracking-tight text-white'>
						{ product.name.length < 40 ? (
							product.name
						) : (
							product.name.slice(0, 37) + "..."
						)
						}
					</h5>
					<div className='mt-2 flex items-center justify-between'>
						<p>
							<span className='text-3xl font-bold text-primary_text_color'>
								₦{ product.price.toLocaleString() + ".00" } {/*  Formating the price to have commas */}
							</span>
						</p>
					</div>
				</div>
			</Link>
				<div className='px-5 pb-5'>
					<button
						className='flex items-center justify-center rounded-lg bg-primary_button_color px-5 py-2.5 text-center text-sm font-medium
						text-white hover:bg-primary_button_hover_color focus:outline-none focus:ring-4 focus:ring-primary_hover_color'
						onClick={handleAddToCart}
					>
						<ShoppingCart size={22} className='mr-2' />
						Add to cart
					</button>
				</div>
		</div>
	);
};

export default ProductCard;