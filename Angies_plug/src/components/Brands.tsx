import React, { useEffect, useState } from 'react';
import { listBrands } from '../lib/db';

type BrandCard = {
	label: string;
	image: string;
};

const brands: BrandCard[] = [
	{
		label: 'adidas',
		image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
	},
	{
		label: 'MANGO',
		image: 'https://images.unsplash.com/photo-1520962657600-8031d2dc5b5b?q=80&w=1600&auto=format&fit=crop',
	},
	{
		label: 'asos design',
		image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
	},
	{
		label: 'TOPSHOP',
		image: 'https://images.unsplash.com/photo-1520974722078-4c22a04d4e6e?q=80&w=1600&auto=format&fit=crop',
	},
];

export const Brands: React.FC = () => {
	const [list, setList] = useState<BrandCard[]>(brands);

	useEffect(() => {
		listBrands()
			.then((rows: any[]) => {
				if (rows && rows.length) {
					setList(rows.slice(0, 4).map(r => ({ label: r.label, image: r.image_url })));
				} else {
					// Keep fallback brands if no data from Supabase
					console.log('No brands found in Supabase, using fallback brands');
				}
			})
			.catch((error) => {
				console.error('Error loading brands:', error);
				// Keep fallback brands on error
			});
	}, []);
	return (
		<section className="py-12">
			<div className="container">
				<h2 className="text-center text-3xl md:text-5xl font-semibold tracking-tight">The biggest labels</h2>
				<div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
					{list.map((b) => (
						<div key={b.label} className="relative rounded-xl overflow-hidden border border-black/10">
							<div className="aspect-[3/4]">
								<img 
									src={b.image} 
									alt={b.label} 
									className="w-full h-full object-cover" 
									onError={(e) => {
										console.error('Failed to load brand image:', b.image);
										// You could set a fallback image here if needed
									}}
								/>
							</div>
							<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
							<div className="absolute inset-x-0 bottom-4 text-white text-3xl font-extrabold text-center drop-shadow">{b.label}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};


