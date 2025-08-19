import React, { useEffect, useMemo, useState } from 'react';
import { loadHeroImages } from '../store/heroStore';

export const Hero: React.FC = () => {
	// Read hero slides from storage; memo to avoid re-reading on every render
	const slides = useMemo(() => {
		const uploaded = loadHeroImages();
		return uploaded.length
			? uploaded
			: [
				'https://images.unsplash.com/photo-1528701800489-20be3c2ea4a0?q=80&w=1600&auto=format&fit=crop',
			];
	}, []);

	const [index, setIndex] = useState(0);

	const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
	const goNext = () => setIndex((i) => (i + 1) % slides.length);

	// Auto-play
	useEffect(() => {
		if (slides.length <= 1) return;
		const id = setInterval(goNext, 5000);
		return () => clearInterval(id);
	}, [slides.length]);

	return (
		<section className="relative">
			<div className="container">
				<div className="relative h-[520px] overflow-hidden rounded-lg bg-muted">
					<img
						src={slides[index]}
						alt="Fashion Hero"
						loading="eager"
						decoding="sync"
						className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
					/>
					{/* Lighten the overlay so the image keeps its original clarity */}
					<div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/10 to-transparent" />
					<div className="relative z-10 max-w-xl p-10 sm:p-14">
						<p className="uppercase tracking-widest text-xs text-black/60 font-medium">New Season</p>
						<h1 className="mt-2 text-4xl sm:text-5xl font-semibold leading-tight">Discover Your Style Today!</h1>
						<div className="mt-8 flex items-center gap-4">
							<a href="#" className="inline-block bg-black text-white px-6 py-3 rounded-md text-sm font-medium">Shop Now</a>
							<button className="nav-arrow" aria-label="prev" onClick={goPrev}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5"><path d="m15 18-6-6 6-6"/></svg>
							</button>
							<button className="nav-arrow" aria-label="next" onClick={goNext}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5"><path d="m9 18 6-6-6-6"/></svg>
							</button>
						</div>
					</div>
					{/* Dots */}
					{slides.length > 1 && (
						<div className="absolute bottom-4 left-10 z-10 flex gap-2">
							{slides.map((_, i) => (
								<button key={i} onClick={() => setIndex(i)} className={`w-2.5 h-2.5 rounded-full ${i === index ? 'bg-black' : 'bg-black/30'}`} aria-label={`Go to slide ${i + 1}`} />
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
};


