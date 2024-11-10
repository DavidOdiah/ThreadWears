import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import ProductPage from "./pages/ProductPage";
import PageNotFoundPage from "./pages/PageNotFoundPage";



function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems, cart } = useCartStore();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	// let crt;
	useEffect(() => {
		// if (!user) {crt = []; return};
		if (!user) return;

		getCartItems()
			// .then(crt = cart)
			// .then(console.log(cart));
	}, [getCartItems, user]);

	if (checkingAuth) return <LoadingSpinner />;

	return (
		<div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
			{/* Background gradient */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(96,165,250,0.3)_0%,rgba(29,78,216,0.2)_30%,rgba(0,0,0,0.1)_100%)]' />
				</div>
			</div>

			<div className='relative z-50 pt-20'>
				{cart && <Navbar />}
				<Routes>
					<Route path='/' element={ <HomePage /> } />
					<Route path='/signup' element={ !user ? <SignUpPage /> : <Navigate to='/' /> } />
					<Route path='/login' element={ !user ? <LoginPage /> : <Navigate to='/' /> } />
					<Route path='/secret-dashboard' element={ user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' /> } />
					<Route path='/category/:category' element={ <CategoryPage /> } />
					<Route path='/cart' element={ user ? <CartPage /> : <Navigate to='/login' /> } />
					<Route path='/purchase-success' element={ user ? <PurchaseSuccessPage /> : <Navigate to='/login' /> } />
					<Route path='/purchase-cancel' element={ user ? <PurchaseCancelPage /> : <Navigate to='/login' /> } />
					<Route path='/products/:id' element={ <ProductPage /> } />
					<Route path='*' element={ <PageNotFoundPage /> } />
				</Routes>
			</div>
			<Toaster />
		</div>
	);
}

export default App;