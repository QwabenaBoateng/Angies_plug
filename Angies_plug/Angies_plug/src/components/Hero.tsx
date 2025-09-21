import React from 'react';

export const Hero: React.FC = () => {
	return (
		<section className="relative">
			<div className="container">
				<div className="relative h-[520px] overflow-hidden rounded-lg bg-muted">
					<img
						src="https://images.unsplash.com/photo-1528701800489-20be3c2ea4a0?q=80&w=1600&auto=format&fit=crop"
						alt="Fashion Hero"
						className="absolute inset-0 w-full h-full object-cover object-center"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
					<div className="relative z-10 max-w-xl p-10 sm:p-14">
						<p className="uppercase tracking-widest text-xs text-black/60 font-medium">New Season</p>
						<h1 className="mt-2 text-4xl sm:text-5xl font-semibold leading-tight">Discover Your Style Today!</h1>
						<div className="mt-8 flex items-center gap-4">
							<a href="#" className="inline-block bg-black text-white px-6 py-3 rounded-md text-sm font-medium">Shop Now</a>
							<button className="nav-arrow" aria-label="prev">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5"><path d="m15 18-6-6 6-6"/></svg>
							</button>
							<button className="nav-arrow" aria-label="next">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5"><path d="m9 18 6-6-6-6"/></svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};


