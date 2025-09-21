import React from 'react';

export const Footer: React.FC = () => {
	const [aboutOpen, setAboutOpen] = React.useState(false);
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
						<li><button onClick={() => setAboutOpen(true)} className="underline">About</button></li>
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
					<h4 className="font-semibold">Contact</h4>
					<ul className="mt-3 space-y-2 text-black/70">
						<li className="flex items-center gap-2">
							<span aria-hidden>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.11 3h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L9.1 10.9a16 16 0 0 0 4 4l1.71-1.11a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z"/></svg>
							</span>
							<span>Whatsapp: 0549759032 / 0504798069</span>
						</li>
						<li className="flex items-center gap-2">
							<span aria-hidden>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.11 3h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L9.1 10.9a16 16 0 0 0 4 4l1.71-1.11a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z"/></svg>
							</span>
							<span>Call: 0549759032</span>
						</li>
						<li className="flex items-center gap-2">
							<span aria-hidden>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4"><path d="M12 2.2c-4 0-7.2 3.2-7.2 7.2 0 4.3 3.1 7.9 7.2 12.4 4.1-4.5 7.2-8.1 7.2-12.4 0-4-3.2-7.2-7.2-7.2Zm0 9.9a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z"/></svg>
							</span>
							<span>TikTok: Angie's Plug</span>
						</li>
						<li className="flex items-center gap-2">
							<span aria-hidden>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4"><path d="M4 4h16v16H4z" fill="none"/><path d="M22 6l-10 7L2 6"/></svg>
							</span>
							<span>Email: Angelatyron251@gmail.com</span>
						</li>
					</ul>
				</div>
			</div>
			<div className="py-6 text-xs text-center text-black/60">© {new Date().getFullYear()} Angie's Plug. All rights reserved.</div>

			{aboutOpen && (
				<div className="fixed inset-0 bg-black/50 z-50 grid place-items-center" onClick={() => setAboutOpen(false)}>
					<div className="bg-white rounded-lg p-6 max-w-md w-[90%]" onClick={(e) => e.stopPropagation()}>
						<div className="flex items-center justify-between">
							<h3 className="text-base font-semibold">About Angie's Plug</h3>
							<button aria-label="Close" className="p-2" onClick={() => setAboutOpen(false)}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
							</button>
						</div>
						<p className="mt-3 text-sm text-black/70">
							Angie's Plug curates stylish, comfortable pieces for everyday wear. Discover featured looks,
							accessories, and essentials crafted to elevate your wardrobe.
						</p>
					</div>
				</div>
			)}
		</footer>
	);
};


