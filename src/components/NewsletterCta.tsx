import React from 'react';

export const NewsletterCta: React.FC = () => {
	return (
		<section className="py-12">
			<div className="container">
				<div className="grid md:grid-cols-[1fr_auto_auto] items-center gap-4 rounded-xl bg-muted p-6 md:p-10">
					<div>
						<p className="text-xs font-medium tracking-widest uppercase">Shop your</p>
						<h3 className="text-2xl md:text-3xl font-semibold">Best deals this week</h3>
					</div>
					<input
						placeholder="Enter your email"
						className="w-full md:w-80 h-12 rounded-md border border-black/10 px-4 bg-white"
					/>
					<button className="h-12 px-6 rounded-md bg-black text-white text-sm font-medium">Claim Coupon</button>
				</div>
			</div>
		</section>
	);
};


