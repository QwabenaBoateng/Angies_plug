import React from 'react';
import { loadProducts } from '../store/contentStore';
import { formatCurrencyGHS } from '../lib/formatCurrency';
import { addToCart } from '../store/cartStore';
import { Link } from 'react-router-dom';

export const CatalogPage: React.FC = () => {
	const all = React.useMemo(() => loadProducts().filter(p => p.category !== 'hero' && p.category !== 'featured'), []);
	const groups = React.useMemo(() => {
		const map = new Map<string, typeof all>();
		for (const p of all) {
			const arr = map.get(p.category) ?? [] as typeof all;
			arr.push(p);
			map.set(p.category, arr);
		}
		return Array.from(map.entries());
	}, [all]);

	return (
		<main className="container py-8">
			<h1 className="text-xl font-semibold">Catalog</h1>
			{groups.length === 0 && all.length === 0 ? (
				<p className="mt-4 text-sm text-black/60">No products yet. Use the admin upload to add items.</p>
			) : (
				<div className="mt-6 space-y-10">
					{/* Men's Wear section shown first even if empty */}
					{/* Women's first */}
					{(() => {
						const womens = all.filter(p => p.category === 'womens');
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
						const accessories = all.filter(p => p.category === 'accessories');
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
						const mens = all.filter(p => p.category === 'mens');
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

					{/* Render remaining categories except 'mens' */}
					{/* Render remaining categories except 'mens', 'womens', 'accessories' */}
					{groups.filter(([category]) => category !== 'mens' && category !== 'womens' && category !== 'accessories').map(([category, products]) => (
						<section key={category}>
							<h2 className="text-sm tracking-[0.2em] font-medium uppercase">{category}</h2>
							<div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6">
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
						</section>
					))}
				</div>
			)}
		</main>
	);
};


