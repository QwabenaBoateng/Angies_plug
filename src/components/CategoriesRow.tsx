import React from 'react';

const categories = [
	{ title: "Men's Wear", subtitle: 'Best offers', icon: '👜' },
	{ title: "Women's", subtitle: 'New arrivals', icon: '👗' },
	{ title: 'Women', subtitle: 'Best sellers', icon: '👠' },
	{ title: 'Accessories', subtitle: 'New season', icon: '🎩' },
];

export const CategoriesRow: React.FC = () => {
	return (
		<section className="py-8">
			<div className="container">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{categories.map((c) => (
						<div key={c.title} className="rounded-lg border border-black/10 p-6 text-center bg-white">
							<div className="text-2xl">{c.icon}</div>
							<div className="mt-3 font-semibold">{c.title}</div>
							<div className="text-xs text-black/60">{c.subtitle}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};


