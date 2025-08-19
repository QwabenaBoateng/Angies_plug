import React from 'react';

export const Footer: React.FC = () => {
	return (
		<footer className="mt-12 border-t border-black/10">
			<div className="container py-10 grid md:grid-cols-4 gap-8 text-sm">
				<div>
					<div className="text-2xl font-semibold">Angie's Plug</div>
					<p className="mt-3 text-black/60">Curated looks to elevate your daily wardrobe. Quality meets comfort.</p>
				</div>
				<div>
					<h4 className="font-semibold">Company</h4>
					<ul className="mt-3 space-y-2 text-black/70">
						<li><a href="#">About</a></li>
						<li><a href="#">Careers</a></li>
						<li><a href="#">Contact</a></li>
					</ul>
				</div>
				<div>
					<h4 className="font-semibold">Help</h4>
					<ul className="mt-3 space-y-2 text-black/70">
						<li><a href="#">Shipping</a></li>
						<li><a href="#">Returns</a></li>
						<li><a href="#">FAQs</a></li>
					</ul>
				</div>
				<div>
					<h4 className="font-semibold">Newsletter</h4>
					<div className="mt-3 flex gap-2">
						<input placeholder="Email address" className="h-10 flex-1 rounded-md border border-black/10 px-3"/>
						<button className="h-10 px-4 rounded-md bg-black text-white">Join</button>
					</div>
				</div>
			</div>
			<div className="py-6 text-xs text-center text-black/60">© {new Date().getFullYear()} Angie's Plug. All rights reserved.</div>
		</footer>
	);
};


