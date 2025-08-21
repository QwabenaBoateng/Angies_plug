import React from 'react';

export const Header: React.FC = () => {
	return (
		<header className="border-b border-black/10">
			<div className="bg-black text-white text-xs">
				<div className="container py-2 flex items-center justify-between">
					<p>Hotline: +234 800 000 0000</p>
					<div className="flex items-center gap-4">
						<a href="#" className="hover:underline">Help</a>
						<a href="#" className="hover:underline">Order Tracking</a>
					</div>
				</div>
			</div>
			<div className="container py-4 flex items-center justify-between gap-6">
				<div className="text-2xl font-semibold">Angie's Plug</div>
				<nav className="flex items-center gap-8 text-sm">
					<a className="font-medium" href="#">Home</a>
					<a href="#">Shop</a>
					<a href="#">Catalog</a>
					<a href="#">Contact</a>
				</nav>
				<div className="ml-auto flex items-center gap-4">
					<button aria-label="search" className="p-2 rounded-full hover:bg-black/5">
						<span className="i-search" />
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
					</button>
					<button className="p-2 rounded-full hover:bg-black/5" aria-label="account">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
					</button>
					<button className="relative p-2 rounded-full hover:bg-black/5" aria-label="cart">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6 5 3H2"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
						<span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] bg-black text-white rounded-full grid place-items-center">2</span>
					</button>
				</div>
			</div>
		</header>
	);
};


