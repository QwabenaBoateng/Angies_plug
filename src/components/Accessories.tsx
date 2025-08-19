import React from 'react';
import { getProductsByCategory } from '../store/contentStore';
import { formatCurrencyGHS } from '../lib/formatCurrency';

const items = [
	{
		id: 'a1',
		name: 'Slim Fit Chinos',
		image: 'https://images.unsplash.com/photo-1620799139501-bd2d3bbe563a?q=80&w=800&auto=format&fit=crop',
	},
	{
		id: 'a2',
		name: 'Casual Dress',
		image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
	},
];

export const Accessories: React.FC = () => {
	const uploaded = getProductsByCategory('accessories');
	return (
		<section className="py-12">
			<div className="container">
				<div className="mb-4">
					<h2 className="text-xs tracking-[0.3em] font-medium">ACCESSORIES</h2>
				</div>
				<div className="grid gap-6 grid-cols-2 md:grid-cols-3">
						{(uploaded.length ? uploaded.map(u => ({ id: u.id, name: u.name, image: u.imageUrl, outOfStock: (u as any).outOfStock })) : items).map((it) => (
							<div key={it.id} className="rounded-xl overflow-hidden border border-black/10">
								<div className="relative aspect-[3/4] bg-muted">
									<img src={it.image} alt={it.name} className="w-full h-full object-cover" />
									{(it as any).outOfStock && (
										<div className="absolute inset-0 bg-black/60 grid place-items-center">
											<span className="text-white text-xs font-semibold uppercase tracking-wide">Out of Stock</span>
										</div>
									)}
								</div>
								<div className="p-4 text-sm font-medium">{it.name}</div>
							</div>
						))}
					</div>
			</div>
		</section>
	);
};


