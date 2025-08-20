import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
	{ title: "Women's Wear", subtitle: 'New arrivals', icon: '👗', anchor: 'womens' },
	{ title: 'Accessories', subtitle: 'New season', icon: '🎩', anchor: 'accessories' },
	{ title: "Men's Wear", subtitle: 'Best offers', icon: '👜', anchor: 'mens' },
	{ title: 'Footwear', subtitle: 'Coming Soon', icon: '👟', anchor: 'footwear' },
];

export const CategoriesRow: React.FC = () => {
	const navigate = useNavigate();
	return (
		<section className="py-8">
			<div className="container">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{categories.map((c) => (
						<button onClick={() => navigate(`/catalog#${c.anchor}`)} key={c.title} className="rounded-lg border border-black/10 p-6 text-center bg-white hover:shadow-sm transition">
							<div className="text-2xl">{c.icon}</div>
							<div className="mt-3 font-semibold">{c.title}</div>
							<div className="text-xs text-black/60">{c.subtitle}</div>
						</button>
					))}
				</div>
			</div>
		</section>
	);
};


