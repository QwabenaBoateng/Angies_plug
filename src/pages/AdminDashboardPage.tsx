import React, { useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../auth/auth';
import { addProduct } from '../store/contentStore';
import { addBrand } from '../store/contentStore';
import type { Product } from '../types/product';
import { loadHeroImages } from '../store/heroStore';
import { uploadImageToSupabase } from '../lib/uploadToSupabase';
import { createProduct, createBrand, addHeroImage as dbAddHeroImage } from '../lib/db';

// Removed demo CardProduct grid data

export const AdminDashboardPage: React.FC = () => {
	if (!isAuthenticated()) {
		return <Navigate to="/login" replace />;
	}

	const navigate = useNavigate();
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
		setFormName(file.name.replace(/\.[^.]+$/, ''));
		setFormCategory(uploadMode === 'hero' ? 'hero' : 'featured');
		// Try Supabase first; if not configured, fallback to data URL preview
		uploadImageToSupabase(file, uploadMode === 'hero' ? 'hero' : 'products')
			.then((url) => setPendingUrl(url))
			.catch((err: any) => {
				const message = err?.message || String(err);
				alert(`Upload failed: ${message}`);
				const reader = new FileReader();
				reader.onload = () => setPendingUrl(reader.result as string);
				reader.readAsDataURL(file);
			})
			.finally(() => { e.target.value = ''; });
	}

	function openUploadWidget() {
		// Replace cloud widget: use local picker and upload to Supabase storage
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.onchange = async () => {
			const file = input.files?.[0];
			if (!file) return;
			try {
				const url = await uploadImageToSupabase(file, 'products');
				setPendingUrl(url);
				setFormName(file.name.replace(/\.[^.]+$/, ''));
				setFormPrice('');
				setFormCategory('featured');
			} catch (e: any) {
				const message = e?.message || String(e);
				alert(`Upload failed: ${message}`);
			}
		};
		input.click();
	}

	async function saveUploadedProduct(e: React.FormEvent) {
		e.preventDefault();
		if (!pendingUrl) return;
		const priceNum = Number(formPrice);
		if (formCategory !== 'hero' && formCategory !== 'brand' && (!formName || Number.isNaN(priceNum))) {
			alert('Please enter a name and numeric price.');
			return;
		}
		// Persist to Supabase DB so site can read it
		if (formCategory === 'brand') {
			await createBrand({ label: formName || 'Brand', imageUrl: pendingUrl });
		} else if (formCategory === 'hero') {
			await dbAddHeroImage(pendingUrl);
		} else {
			await createProduct({ name: formName || 'Hero Slide', price: Number.isNaN(priceNum) ? 0 : priceNum, imageUrl: pendingUrl, category: formCategory });
		}
		setPendingUrl(null);
		setHeroImages(loadHeroImages());
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
								{[
									{ key: 'hero', label: 'Hero' },
									{ key: 'womens', label: 'Womens' },
									{ key: 'mens', label: 'Mens' },
									{ key: 'featured', label: 'Featured' },
									{ key: 'accessories', label: 'Accessories' },
									{ key: 'brand', label: 'Brands' },
								].map((item) => (
									<div key={item.key} className={`pl-2 py-1 rounded hover:bg-white/5`}>
										<a href={`#/section/${item.key}`} onClick={(e) => { e.preventDefault(); navigate(`/section/${item.key}`); }}>{item.label}</a>
									</div>
								))}
							</div>
						)}

						{/* Remaining items */}
						{['Orders','Shipping','Coupons','Reviews & Ratings','Accounts'].map((label) => (
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
							<div className="flex items-center gap-3">
								<button onClick={openUploadWidget} className="h-10 px-4 rounded-md bg-[#5871e5] text-white">+ Add Product</button>
								<button onClick={chooseLocalFile} className="h-10 px-4 rounded-md border border-black/10">Upload from device</button>
							</div>
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
					<div className="p-6">
						{/* section intentionally left blank */}

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


