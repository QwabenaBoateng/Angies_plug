import React, { useEffect, useState } from 'react';
import { listProductsByCategory } from '../lib/db';
import { formatCurrencyGHS } from '../lib/formatCurrency';
import { addToCart } from '../store/cartStore';

type Accessory = {
	id: string;
	name: string;
	price: number;
	image: string;
	outOfStock?: boolean;
};

const items: Accessory[] = [
	{
		id: 'a1',
		name: 'Slim Fit Chinos',
		price: 199,
		image: 'https://images.unsplash.com/photo-1620799139501-bd2d3bbe563a?q=80&w=800&auto=format&fit=crop',
	},
	{
		id: 'a2',
		name: 'Casual Dress',
		price: 289,
		image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
	},
	{
		id: 'a3',
		name: 'Leather Belt',
		price: 149,
		image: 'https://images.unsplash.com/photo-1516641391044-6f6f1a15b43f?q=80&w=800&auto=format&fit=crop',
	},
	{
		id: 'a4',
		name: 'Wayfarer Sunglasses',
		price: 179,
		image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop',
	},
];

export const Accessories: React.FC = () => {
	const [accessories, setAccessories] = useState<Accessory[]>(items);

	useEffect(() => {
		listProductsByCategory('accessories')
			.then((rows: any[]) => {
				if (rows && rows.length) {
					setAccessories(rows.map(r => ({
						id: r.id,
						name: r.name,
						price: Number(r.price),
						image: r.image_url,
						outOfStock: !!r.out_of_stock,
					})));
				} else {
					// Keep fallback accessories if no data from Supabase
					console.log('No accessories found in Supabase, using fallback accessories');
				}
			})
			.catch((error) => {
				console.error('Error loading accessories:', error);
				// Keep fallback accessories on error
			});
	}, []);
	return (
		<section className="py-12">
			<div className="container">
				<div className="mb-4">
					<h2 className="text-xs tracking-[0.3em] font-medium">ACCESSORIES</h2>
				</div>
				<div className="grid gap-6 grid-cols-2 md:grid-cols-4">
					{accessories.map((it) => (
						<article key={it.id} className="bg-white rounded-lg overflow-hidden border border-black/10">
							<div className="relative aspect-[3/4] bg-muted overflow-hidden">
								<img src={it.image} alt={it.name} className="w-full h-full object-cover" />
								{it.outOfStock && (
									<div className="absolute inset-0 bg-black/60 grid place-items-center">
										<span className="text-white text-xs font-semibold uppercase tracking-wide">Out of Stock</span>
									</div>
								)}
							</div>
							<div className="p-4 text-sm">
								<h3 className="font-medium line-clamp-2 min-h-[2.5rem]">{it.name}</h3>
								<div className="mt-2 flex items-center justify-between">
									<span className="font-semibold">{formatCurrencyGHS(it.price)}</span>
									<button className={`text-xs px-3 py-2 border border-black/10 rounded-md transition ${it.outOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white'}`} disabled={it.outOfStock} onClick={() => !it.outOfStock && addToCart({ id: it.id, name: it.name, price: it.price, imageUrl: it.image })}>
										{it.outOfStock ? 'Out of Stock' : 'Add to Cart'}
									</button>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};


