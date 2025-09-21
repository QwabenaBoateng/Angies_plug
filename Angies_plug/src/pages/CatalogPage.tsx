import React from 'react';
import { listProductsByCategory } from '../lib/db';
import { formatCurrencyGHS } from '../lib/formatCurrency';
import { addToCart } from '../store/cartStore';
import { Link, useLocation } from 'react-router-dom';

export const CatalogPage: React.FC = () => {
	const location = useLocation();
	const [categoryData, setCategoryData] = React.useState<{[key: string]: any[]}>({});
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		const categories = ['mens', 'womens', 'accessories', 'footwear'];
		const loadAllCategories = async () => {
			setLoading(true);
			const data: {[key: string]: any[]} = {};
			
			for (const category of categories) {
				try {
					const rows = await listProductsByCategory(category);
					data[category] = rows ? rows.map(r => ({
						id: r.id,
						name: r.name,
						price: Number(r.price),
						imageUrl: r.image_url,
						outOfStock: !!r.out_of_stock,
						category: category
					})) : [];
				} catch (error) {
					console.error(`Error loading ${category}:`, error);
					data[category] = [];
				}
			}
			
			setCategoryData(data);
			setLoading(false);
		};
		
		loadAllCategories();
	}, []);

	const all = React.useMemo(() => {
		return Object.values(categoryData).flat();
	}, [categoryData]);

	// Scroll to section when visiting /catalog#<anchor>
	React.useEffect(() => {
		if (!location.hash) return;
		const id = location.hash.replace('#', '');
		// Defer to ensure sections are rendered
		setTimeout(() => {
			const el = document.getElementById(id);
			if (el) {
				el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}, 0);
	}, [location.hash]);

	return (
		<main className="container py-8">
			<h1 className="text-xl font-semibold">Catalog</h1>
			{loading ? (
				<p className="mt-4 text-sm text-black/60">Loading products...</p>
			) : all.length === 0 ? (
				<p className="mt-4 text-sm text-black/60">No products yet. Use the admin upload to add items.</p>
			) : (
				<div className="mt-6 space-y-10">
					{/* Men's Wear section shown first even if empty */}
					{/* Women's first */}
					{(() => {
						const womens = categoryData.womens || [];
						return (
							<section id="womens">
								<h2 className="text-sm tracking-[0.2em] font-medium uppercase">Women's Wear</h2>
								{womens.length === 0 ? (
									<p className="mt-2 text-sm text-black/60">No women's products yet.</p>
								) : (
									<>
									<div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6">
										{womens.slice(0, 4).map((p) => (
											<article key={p.id} className="bg-white rounded-lg overflow-hidden border border-black/10">
												<div className="relative aspect-[3/4] bg-muted overflow-hidden">
													<img 
														src={p.imageUrl} 
														alt={p.name} 
														className="w-full h-full object-cover"
														onError={(e) => {
															console.error('Failed to load product image:', p.imageUrl);
														}}
													/>
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
									{womens.length > 4 && (
										<div className="mt-4">
											<Link to="/catalog/womens" className="inline-flex items-center gap-2 px-4 py-2 border-2 border-rose-500 text-rose-600 rounded-full text-xs font-semibold hover:bg-rose-50 transition">
												<span>SEE MORE</span>
												<span>→</span>
											</Link>
										</div>
									)}
									</>
								)}
							</section>
						);
					})()}

					{/* Accessories second */}
					{(() => {
						const accessories = categoryData.accessories || [];
						return (
							<section id="accessories">
								<h2 className="text-sm tracking-[0.2em] font-medium uppercase">Accessories</h2>
								{accessories.length === 0 ? (
									<p className="mt-2 text-sm text-black/60">No accessories yet.</p>
								) : (
									<>
									<div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6">
										{accessories.slice(0, 4).map((p) => (
											<article key={p.id} className="bg-white rounded-lg overflow-hidden border border-black/10">
												<div className="relative aspect-[3/4] bg-muted overflow-hidden">
													<img 
														src={p.imageUrl} 
														alt={p.name} 
														className="w-full h-full object-cover"
														onError={(e) => {
															console.error('Failed to load product image:', p.imageUrl);
														}}
													/>
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
									{accessories.length > 4 && (
										<div className="mt-4">
											<Link to="/catalog/accessories" className="inline-flex items-center gap-2 px-4 py-2 border-2 border-rose-500 text-rose-600 rounded-full text-xs font-semibold hover:bg-rose-50 transition">
												<span>SEE MORE</span>
												<span>→</span>
											</Link>
										</div>
									)}
									</>
								)}
							</section>
						);
					})()}
					{(() => {
						const mens = categoryData.mens || [];
						return (
							<section id="mens">
								<h2 className="text-sm tracking-[0.2em] font-medium uppercase">Men's Wear</h2>
								{mens.length === 0 ? (
									<p className="mt-2 text-sm text-black/60">No men's products yet.</p>
								) : (
									<>
									<div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6">
										{mens.slice(0, 4).map((p) => (
											<article key={p.id} className="bg-white rounded-lg overflow-hidden border border-black/10">
												<div className="relative aspect-[3/4] bg-muted overflow-hidden">
													<img 
														src={p.imageUrl} 
														alt={p.name} 
														className="w-full h-full object-cover"
														onError={(e) => {
															console.error('Failed to load product image:', p.imageUrl);
														}}
													/>
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
									{mens.length > 4 && (
										<div className="mt-4">
											<Link to="/catalog/mens" className="inline-flex items-center gap-2 px-4 py-2 border-2 border-rose-500 text-rose-600 rounded-full text-xs font-semibold hover:bg-rose-50 transition">
												<span>SEE MORE</span>
												<span>→</span>
											</Link>
										</div>
									)}
									</>
								)}
							</section>
						);
					})()}

					{/* Footwear section */}
					{(() => {
						const footwear = categoryData.footwear || [];
						return (
							<section id="footwear">
								<h2 className="text-sm tracking-[0.2em] font-medium uppercase">Footwear</h2>
								{footwear.length === 0 ? (
									<p className="mt-2 text-sm text-black/60">No footwear yet.</p>
								) : (
									<>
									<div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6">
										{footwear.slice(0, 4).map((p) => (
											<article key={p.id} className="bg-white rounded-lg overflow-hidden border border-black/10">
												<div className="relative aspect-[3/4] bg-muted overflow-hidden">
													<img 
														src={p.imageUrl} 
														alt={p.name} 
														className="w-full h-full object-cover"
														onError={(e) => {
															console.error('Failed to load product image:', p.imageUrl);
														}}
													/>
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
									{footwear.length > 4 && (
										<div className="mt-4">
											<Link to="/catalog/footwear" className="inline-flex items-center gap-2 px-4 py-2 border-2 border-rose-500 text-rose-600 rounded-full text-xs font-semibold hover:bg-rose-50 transition">
												<span>SEE MORE</span>
												<span>→</span>
											</Link>
										</div>
									)}
									</>
								)}
							</section>
						);
					})()}

				</div>
			)}
		</main>
	);
};


