import React from 'react';

type Product = {
	id: string;
	name: string;
	price: string;
	image: string;
};

const products: Product[] = [
	{
		id: 'p1',
		name: 'Classic Polo Shirt',
		price: '$269.00',
		image:
			'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop',
	},
	{
		id: 'p2',
		name: 'White Summer Blouse',
		price: '$359.00',
		image:
			'https://images.unsplash.com/photo-1520975682031-6637b1514e10?q=80&w=800&auto=format&fit=crop',
	},
	{
		id: 'p3',
		name: 'Tailored Pants',
		price: '$309.00',
		image:
			'https://images.unsplash.com/photo-1520975733629-2f7f2b0d5d5c?q=80&w=800&auto=format&fit=crop',
	},
	{
		id: 'p4',
		name: 'Formal Trousers',
		price: '$399.00',
		image:
			'https://images.unsplash.com/photo-1520974722078-4c22a04d4e6e?q=80&w=800&auto=format&fit=crop',
	},
];

export const Featured: React.FC = () => {
	return (
		<section className="py-12">
			<div className="container">
				<h2 className="text-center text-xs tracking-[0.3em] font-medium">FEATURED LOOKS</h2>
				<div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
					{products.map((p) => (
						<article key={p.id} className="bg-white rounded-lg overflow-hidden border border-black/10">
							<div className="aspect-[3/4] bg-muted overflow-hidden">
								<img src={p.image} alt={p.name} className="w-full h-full object-cover" />
							</div>
							<div className="p-4 text-sm">
								<h3 className="font-medium line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
								<div className="mt-2 flex items-center justify-between">
									<span className="font-semibold">{p.price}</span>
									<button className="text-xs px-3 py-2 border border-black/10 rounded-md hover:bg-black hover:text-white transition">Add to Cart</button>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};


