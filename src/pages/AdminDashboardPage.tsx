import React, { useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../auth/auth';
import { formatCurrencyGHS } from '../lib/formatCurrency';
import { addProduct } from '../store/contentStore';
import { addBrand } from '../store/contentStore';
import type { Product } from '../types/product';
import { loadHeroImages, removeHeroImage } from '../store/heroStore';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;

type CardProduct = {
	id: string;
	name: string;
	price: number;
	image: string;
	category: string;
	stocks: number;
	orders: number;
	rating: number;
	badge?: string; // e.g., "25%"
	publishDate: string;
};

const products: CardProduct[] = [
	{
		id: 'p1',
		name: "World's Most Expensive T Shirt",
		price: 266.24,
		image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop',
		category: 'Fashion',
		stocks: 12,
		orders: 48,
		rating: 4.9,
		badge: '25%'
		,
		publishDate: '12 Oct, 2024',
	},
	{
		id: 'p2',
		name: 'Like Style Women Black Handbag',
		price: 742.0,
		image: 'https://images.unsplash.com/photo-1540855661-948f524f3f9b?q=80&w=800&auto=format&fit=crop',
		category: 'Fashion',
		stocks: 6,
		orders: 30,
		rating: 4.2,
		publishDate: '06 Jan, 2025',
	},
	{
		id: 'p3',
		name: 'Black Horn Backpack For Men',
		price: 113.24,
		image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
		category: 'Grocery',
		stocks: 10,
		orders: 28,
		rating: 3.8,
		badge: '25%'
		,
		publishDate: '26 Mar, 2025',
	},
	{
		id: 'p4',
		name: 'Innovative Education Book',
		price: 96.26,
		image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop',
		category: 'Kids',
		stocks: 15,
		orders: 40,
		rating: 4.7,
		publishDate: '02 Apr, 2025',
	},
	{
		id: 'p5',
		name: 'Sangria Girls Mint Green Slippers',
		price: 24.07,
		image: 'https://images.unsplash.com/photo-1542291024-54f908b42f31?q=80&w=800&auto=format&fit=crop',
		category: 'Kids',
		stocks: 8,
		orders: 55,
		rating: 4.7,
		badge: '70%'
		,
		publishDate: '16 Dec, 2024',
	},
	{
		id: 'p6',
		name: 'Lace-Up Casual Shoes For Men',
		price: 229.0,
		image: 'https://images.unsplash.com/photo-1542291026-0d6bbe0f1d5b?q=80&w=800&auto=format&fit=crop',
		category: 'Fashion',
		stocks: 18,
		orders: 48,
		rating: 4.2,
		publishDate: '03 Jan, 2025',
	},
];

export const AdminDashboardPage: React.FC = () => {
	if (!isAuthenticated()) {
		return <Navigate to="/login" replace />;
	}

	const [productsOpen, setProductsOpen] = useState(false);
	const [pendingUrl, setPendingUrl] = useState<string | null>(null);
	const [formName, setFormName] = useState('');
	const [formPrice, setFormPrice] = useState('');
	type UiCategory = Product['category'] | 'brand';
	const [formCategory, setFormCategory] = useState<UiCategory>('featured');
	const [uploadMode, setUploadMode] = useState<'product' | 'hero'>('product');
	const [heroImages, setHeroImages] = useState<string[]>(loadHeroImages());
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	function chooseLocalFile(mode: 'product' | 'hero' = 'product') {
		setUploadMode(mode);
		fileInputRef.current?.click();
	}

	function onLocalFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			const dataUrl = reader.result as string;
			setPendingUrl(dataUrl);
			setFormName(file.name.replace(/\.[^.]+$/, ''));
			setFormCategory(uploadMode === 'hero' ? 'hero' : 'featured');
		};
		reader.readAsDataURL(file);
		e.target.value = '';
	}

	function openUploadWidget() {
		if (!CLOUD_NAME || !UPLOAD_PRESET || !window.cloudinary?.createUploadWidget) {
			chooseLocalFile('product');
			return;
		}
		// @ts-ignore
		const widget = window.cloudinary.createUploadWidget(
			{ cloudName: CLOUD_NAME, uploadPreset: UPLOAD_PRESET, folder: 'angies-plug', multiple: false, resourceType: 'image' },
			(_: unknown, result: any) => {
				if (result?.event === 'success') {
					const url: string = result.info.secure_url;
					setPendingUrl(url);
					setFormName('');
					setFormPrice('');
					setFormCategory('featured');
				}
			}
		);
		widget?.open?.();
	}

	function saveUploadedProduct(e: React.FormEvent) {
		e.preventDefault();
		if (!pendingUrl) return;
		const priceNum = Number(formPrice);
		if (formCategory !== 'hero' && formCategory !== 'brand' && (!formName || Number.isNaN(priceNum))) {
			alert('Please enter a name and numeric price.');
			return;
		}
		if (formCategory === 'brand') {
			addBrand({ label: formName || 'Brand', imageUrl: pendingUrl });
		} else {
			addProduct({ name: formName || 'Hero Slide', price: Number.isNaN(priceNum) ? 0 : priceNum, imageUrl: pendingUrl, category: formCategory });
		}
		setPendingUrl(null);
		setHeroImages(loadHeroImages());
		setManagerRefresh((v) => v + 1);
		alert('Saved. It will appear in the selected section on the site.');
	}

	return (
		<div className="min-h-screen bg-[#f5f7fb]">
			<input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onLocalFileSelected} />
			<div className="flex">
				{/* Sidebar (dark like screenshot) */}
				<aside className="hidden md:flex w-64 min-h-screen bg-[#0f1a2c] text-white p-4 flex-col">
					<div className="flex items-center gap-2 px-2">
						<div className="w-6 h-6 rounded-full bg-[#5b6fed]" />
						<div className="font-semibold tracking-wide">Angie's Plug</div>
					</div>
					<div className="text-[10px] uppercase text-white/50 px-2 mt-6">Menu</div>
					<nav className="mt-2 text-sm">
						{/* Dashboard */}
						<div className="px-2 py-2 rounded-md hover:bg-white/5 cursor-pointer flex items-center justify-between">
							<span className="text-white/80">Dashboard</span>
							<span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.5 rounded">Hot</span>
						</div>

						{/* Products dropdown */}
						<button onClick={() => setProductsOpen((v) => !v)} className="w-full text-left px-2 py-2 rounded-md hover:bg-white/5 cursor-pointer flex items-center justify-between">
							<span className="font-medium">Products</span>
							<svg className={`w-3.5 h-3.5 transition-transform ${productsOpen ? '' : '-rotate-90'}`} viewBox="0 0 20 20" fill="currentColor"><path d="M6 8l4 4 4-4"/></svg>
						</button>
						{productsOpen && (
							<div className="ml-4 mt-1 space-y-1 text-white/70 text-[13px]">
								{['hero','womens','mens','featured','accessories'].map((s) => (
									<div key={s} className={`pl-2 py-1 rounded hover:bg-white/5 capitalize`}>
										<a href={`/admin/section/${s}`} onClick={(e) => {
											e.preventDefault();
											window.history.pushState({}, '', `/admin/section/${s}`);
											setManagerCategory((s as any) === 'hero' ? 'featured' : (s as any));
											// Let routing layer render the section page
											location.assign(`/admin/section/${s}`);
										}}>{s}</a>
									</div>
								))}
							</div>
						)}

						{/* Remaining items */}
						{['Orders','Calendar','Sellers','Invoice','Users List','Shipping','Coupons','Reviews & Ratings','Brands','Statistics','Localization','Accounts','Components','Multi Level'].map((label) => (
							<div key={label} className="px-2 py-2 rounded-md hover:bg-white/5 cursor-pointer flex items-center justify-between">
								<span className="text-white/80">{label}</span>
								{label==='Components' && <span className="text-[10px] bg-[#5b6fed] text-white px-1.5 py-0.5 rounded-full">v1.2</span>}
							</div>
						))}
					</nav>
				</aside>

				{/* Main content */}
				<div className="flex-1">
					{/* Top bar */}
					<header className="h-16 bg-white border-b border-black/10 flex items-center justify-between px-4 gap-4 sticky top-0">
						<div className="flex items-center gap-3">
							<button className="md:hidden p-2 rounded hover:bg-black/5" aria-label="menu">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
							</button>
							<div className="text-sm text-black/60">Products • Product Grid</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="hidden sm:flex items-center gap-2">
								<input placeholder="Search products..." className="h-10 w-64 rounded-md border border-black/10 px-3"/>
							</div>
							<button onClick={() => logout()} className="h-10 px-3 rounded-md border border-black/10">Logout</button>
							<div className="w-8 h-8 rounded-full bg-black/10" />
						</div>
					</header>

					{/* Content area */}
					<div className="p-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
						{/* Filters */}
						<aside className="bg-white rounded-xl border border-black/10 p-4 h-fit">
							<div className="flex items-center justify-between">
								<h3 className="text-sm font-semibold">Filters</h3>
								<button className="text-xs text-black/60">Clear All</button>
							</div>
							<div className="mt-4">
								<div className="text-xs font-semibold mb-2">PRODUCTS</div>
								<ul className="space-y-2 text-sm text-black/70">
									<li className="flex justify-between"><span>Grocery</span><span>5</span></li>
									<li className="flex justify-between"><span>Fashion</span><span>5</span></li>
									<li className="flex justify-between"><span>Electronics</span><span>3</span></li>
									<li className="flex justify-between"><span>Kids</span><span>4</span></li>
								</ul>
							</div>
							<div className="mt-6">
								<div className="text-xs font-semibold mb-2">PRICE</div>
								<div className="h-1 bg-black/10 rounded-full">
									<div className="h-1 bg-black rounded-full w-2/3" />
								</div>
								<div className="flex justify-between text-xs text-black/60 mt-2">
									<span>₵ 9.0</span>
									<span>₵ 2000</span>
								</div>
							</div>
							<div className="mt-6">
								<div className="text-xs font-semibold mb-2">COLORS</div>
								<div className="flex flex-wrap gap-2">
									{['#62d0ae','#5aa9e6','#8bc34a','#eab308','#e57373','#7c4dff','#0f172a','#e5e7eb'].map((c) => (
										<div key={c} className="w-6 h-6 rounded-full border" style={{ background: c }} />
									))}
								</div>
							</div>
						</aside>

						{/* Product grid */}
						<section>
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-sm font-semibold">PRODUCT GRID</h2>
								<div className="flex items-center gap-3">
									<button onClick={openUploadWidget} className="h-10 px-4 rounded-md bg-[#5871e5] text-white">+ Add Product</button>
									<button onClick={chooseLocalFile} className="h-10 px-4 rounded-md border border-black/10">Upload from device</button>
								</div>
							</div>
							<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
								{products.map((p) => (
									<article key={p.id} className="bg-white rounded-xl border border-black/10 shadow-soft overflow-hidden">
										<div className="relative p-4">
											{p.badge && (
												<span className="absolute left-4 top-4 text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full">{p.badge}</span>
											)}
											<div className="aspect-square bg-white grid place-items-center border border-black/10 rounded-md">
												<img src={p.image} alt={p.name} className="max-h-40 object-contain" />
											</div>
										</div>
										<div className="px-4 pb-4">
											<div className="text-[#5871e5] font-semibold">{formatCurrencyGHS(p.price)}</div>
											<h3 className="mt-1 font-medium line-clamp-2">{p.name}</h3>
											<div className="mt-3 grid grid-cols-4 text-center text-[11px] text-black/70">
												<div>
													<div className="font-semibold">{p.stocks}</div>
													<div>Stocks</div>
												</div>
												<div>
													<div className="font-semibold">{p.orders}</div>
													<div>Orders</div>
												</div>
												<div>
													<div className="font-semibold">{p.publishDate.split(' ')[0]}</div>
													<div>Publish</div>
												</div>
												<div>
													<div className="font-semibold">{p.rating.toFixed(1)}</div>
													<div>Rating</div>
												</div>
											</div>
										</div>
									</article>
								))}
							</div>
						</section>

						{/* Removed Category Manager table per request */}

						{/* Removed duplicate category cards section per request */}
					</div>
				</div>
			</div>

			{pendingUrl && (
				<div className="fixed inset-0 bg-black/50 grid place-items-center p-4 z-50">
					<div className="bg-white rounded-xl w-full max-w-lg p-6">
						<h3 className="text-lg font-semibold">Add product details</h3>
						<div className="mt-4 grid grid-cols-[120px_1fr] gap-4 items-start">
							<img src={pendingUrl} alt="preview" className="w-30 h-30 object-cover rounded border" />
							<form onSubmit={saveUploadedProduct} className="space-y-3">
								<input value={formName} onChange={(e)=>setFormName(e.target.value)} placeholder="Product name" className="w-full h-10 border border-black/10 rounded px-3" />
								<input value={formPrice} onChange={(e)=>setFormPrice(e.target.value)} placeholder="Price (number)" className="w-full h-10 border border-black/10 rounded px-3" />
								<select value={formCategory} onChange={(e)=>setFormCategory(e.target.value as UiCategory)} className="w-full h-10 border border-black/10 rounded px-3 bg-white">
									<option value="featured">Featured</option>
									<option value="accessories">Accessories</option>
									<option value="mens">Mens</option>
									<option value="womens">Womens</option>
									<option value="hero">Hero (homepage background)</option>
									<option value="brand">Brand (labels section)</option>
								</select>
								<div className="flex gap-3 pt-2">
									<button type="submit" className="h-10 px-4 rounded bg-black text-white">Save</button>
									<button type="button" onClick={()=>setPendingUrl(null)} className="h-10 px-4 rounded border border-black/10">Cancel</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};


