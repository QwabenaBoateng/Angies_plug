import React, { useEffect, useState } from 'react';
import { listProductsByCategory } from '../lib/db';

 type Product = {
	id: string;
	name: string;
	price: number;
	image: string;
	outOfStock?: boolean;
 };

 const seedProducts: Product[] = [
	{
		id: 'p1',
		name: 'Classic Polo Shirt',
		price: 269,
		image:
			'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop',
	},
	{
		id: 'p2',
		name: 'White Summer Blouse',
		price: 359,
		image:
			'https://images.unsplash.com/photo-1520975682031-6637b1514e10?q=80&w=800&auto=format&fit=crop',
	},
	{
		id: 'p3',
		name: 'Tailored Pants',
		price: 309,
		image:
			'https://images.unsplash.com/photo-1520975733629-2f7f2b0d5d5c?q=80&w=800&auto=format&fit=crop',
	},
	{
		id: 'p4',
		name: 'Formal Trousers',
		price: 399,
		image:
			'https://images.unsplash.com/photo-1520974722078-4c22a04d4e6e?q=80&w=800&auto=format&fit=crop',
	},
 ];

 export const Featured: React.FC = () => {
	const [products, setProducts] = useState<Product[]>(seedProducts);

	useEffect(() => {
		listProductsByCategory('featured')
			.then((rows: any[]) => {
				if (rows && rows.length) {
					setProducts(rows.map(r => ({
						id: r.id,
						name: r.name,
						price: Number(r.price),
						image: r.image_url,
						outOfStock: !!r.out_of_stock,
					})));
				}
			})
			.catch(console.error);
	}, []);

	return (
		<section className="py-12">
			<div className="container">
				<h2 className="text-center text-xs tracking-[0.3em] font-medium">FEATURED LOOKS</h2>
				<div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
					{products.map((p) => (
						<article key={p.id} className="bg-white rounded-lg overflow-hidden border border-black/10">
							<div className="relative aspect-[3/4] bg-muted overflow-hidden">
								<img src={p.image} alt={p.name} className="w-full h-full object-cover" />
								{p.outOfStock && (
									<div className="absolute inset-0 bg-black/60 grid place-items-center">
										<span className="text-white text-xs font-semibold uppercase tracking-wide">Out of Stock</span>
									</div>
								)}
							</div>
							<div className="p-4 text-sm">
								<h3 className="font-medium line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
 };


