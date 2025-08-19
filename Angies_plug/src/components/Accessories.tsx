import React from 'react';

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
	return (
		<section className="py-12">
			<div className="container">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xs tracking-[0.3em] font-medium">ACCESSORIES</h2>
					<div className="flex gap-2">
						<button className="nav-arrow" aria-label="prev">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5"><path d="m15 18-6-6 6-6"/></svg>
						</button>
						<button className="nav-arrow" aria-label="next">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5"><path d="m9 18 6-6-6-6"/></svg>
						</button>
					</div>
				</div>
				<div className="grid md:grid-cols-[1fr_420px] gap-6">
					<div className="grid grid-cols-2 gap-6">
						{items.map((it) => (
							<div key={it.id} className="rounded-xl overflow-hidden border border-black/10">
								<div className="aspect-[3/4] bg-muted">
									<img src={it.image} alt={it.name} className="w-full h-full object-cover" />
								</div>
								<div className="p-4 text-sm font-medium">{it.name}</div>
							</div>
						))}
					</div>
					<div className="relative rounded-xl overflow-hidden bg-black text-white p-10 flex flex-col justify-end min-h-[420px]">
						<div className="absolute inset-0">
							<img src="https://images.unsplash.com/photo-1483985974336-2cb3b6bfa3a9?q=80&w=1200&auto=format&fit=crop" alt="Sale" className="w-full h-full object-cover opacity-60" />
						</div>
						<div className="relative">
							<p className="uppercase tracking-widest text-xs">Spring collection</p>
							<h3 className="text-3xl font-semibold mt-2">30% OFF</h3>
							<p className="text-sm text-white/80 max-w-sm mt-2">Save on dresses, bags and more. Limited time offer for our newsletter subscribers.</p>
							<a href="#" className="mt-6 inline-block bg-white text-black px-5 py-2 rounded-md text-sm font-medium">Shop Now</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};


