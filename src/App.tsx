import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CatalogPage } from './pages/CatalogPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { CategoryListingPage } from './pages/CategoryListingPage';
import { AuthPage } from './pages/AuthPage';

const AppShell: React.FC = () => {
	return (
		<div className="font-sans text-black bg-white min-h-screen flex flex-col">
			<Header />
			<div className="flex-1">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/shop" element={<ShopPage />} />
					<Route path="/catalog" element={<CatalogPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/catalog/:category" element={<CategoryListingPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/account" element={<AuthPage />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
};

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<AppShell />
		</BrowserRouter>
	);
};

export default App;


