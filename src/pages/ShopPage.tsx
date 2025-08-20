import React from 'react';
import { loadProducts } from '../store/contentStore';
import { formatCurrencyGHS } from '../lib/formatCurrency';
import { addToCart } from '../store/cartStore';

export const ShopPage: React.FC = () => {
	const allProducts = React.useMemo(() => loadProducts().filter(p => p.category !== 'hero'), []);
	const categories = React.useMemo(() => Array.from(new Set(allProducts.map(p => p.category))).filter(c => c !== 'featured'), [allProducts]);
	const [query, setQuery] = React.useState('');
	const [minPrice, setMinPrice] = React.useState<string>('');
	const [maxPrice, setMaxPrice] = React.useState<string>('');
	const [category, setCategory] = React.useState<string>('');
	const products = React.useMemo(() => {
		const q = query.trim().toLowerCase();
		let list = allProducts;
		if (q) list = list.filter(p => p.name.toLowerCase().includes(q));
		const min = parseFloat(minPrice);
		const max = parseFloat(maxPrice);
		if (!isNaN(min)) list = list.filter(p => p.price >= min);
		if (!isNaN(max)) list = list.filter(p => p.price <= max);
		if (category) list = list.filter(p => p.category === category);
		return list;
	}, [allProducts, query, minPrice, maxPrice, category]);

	return (
		<main className="container py-8">
			<h1 className="text-xl font-semibold">Shop</h1>
			<div id="search" className="mt-4 grid md:grid-cols-[1fr_auto_auto_auto] gap-3 items-center">
				<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." className="w-full border border-black/10 rounded-md px-3 py-2 text-sm" />
				<input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min price" className="border border-black/10 rounded-md px-3 py-2 text-sm w-32" />
				<input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max price" className="border border-black/10 rounded-md px-3 py-2 text-sm w-32" />
				<select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-black/10 rounded-md px-3 py-2 text-sm w-40">
					<option value="">All categories</option>
					{categories.map(c => (
						<option key={c} value={c}>{c}</option>
					))}
				</select>
			</div>
			{products.length === 0 ? (
				<p className="mt-4 text-sm text-black/60">No products yet. Use the admin upload to add items.</p>
			) : (
				<div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
					{products.map((p) => (
						<article key={p.id} className="bg-white rounded-lg overflow-hidden border border-black/10">
							<div className="relative aspect-[3/4] bg-muted overflow-hidden">
								<img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
								{p.outOfStock && (
									<div className="absolute inset-0 bg-black/60 grid place-items-center">
										<span className="text-white text-xs font-semibold uppercase tracking-wide">Out of Stock</span>
									</div>
								)}
							</div>
							<div className="p-4 text-sm">
								<h3 className="font-medium line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
								<div className="mt-2 flex items-center justify-between">
									<span className="font-semibold">{formatCurrencyGHS(p.price)}</span>
									<button className={`text-xs px-3 py-2 border border-black/10 rounded-md transition ${p.outOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white'}`} disabled={p.outOfStock} onClick={() => !p.outOfStock && addToCart({ id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl })}>
										{p.outOfStock ? 'Out of Stock' : 'Add to Cart'}
									</button>
								</div>
							</div>
						</article>
					))}
				</div>
			)}
		</main>
	);
};


