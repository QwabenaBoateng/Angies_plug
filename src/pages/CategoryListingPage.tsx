import React from 'react';
import { useParams } from 'react-router-dom';
import { loadProducts } from '../store/contentStore';
import { formatCurrencyGHS } from '../lib/formatCurrency';
import { addToCart } from '../store/cartStore';

export const CategoryListingPage: React.FC = () => {
	const { category } = useParams<{ category: string }>();
	const products = React.useMemo(() => {
		const all = loadProducts();
		return all.filter(p => p.category === (category as any));
	}, [category]);

	const title = React.useMemo(() => {
		if (!category) return 'Catalog';
		if (category === 'womens') return "Women's Wear";
		if (category === 'mens') return "Men's Wear";
		return category.charAt(0).toUpperCase() + category.slice(1);
	}, [category]);

	return (
		<main className="container py-8">
			<h1 className="text-xl font-semibold">{title}</h1>
			{products.length === 0 ? (
				<p className="mt-4 text-sm text-black/60">No items available in this category.</p>
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


