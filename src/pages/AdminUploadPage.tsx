import React from 'react';
import { logout, isAuthenticated } from '../auth/auth';
import { Navigate } from 'react-router-dom';
import { addBrand, loadBrands, deleteBrand } from '../store/contentStore';
import { uploadImageToSupabase } from '../lib/uploadToSupabase';

declare global {
	interface Window {
		cloudinary: any;
	}
}

export const AdminUploadPage: React.FC = () => {
	if (!isAuthenticated()) {
		return <Navigate to="/login" replace />;
	}

	const [brandLabel, setBrandLabel] = React.useState('');
	const [brands, setBrands] = React.useState(() => loadBrands());
	const refresh = () => setBrands(loadBrands());

	function openWidget() {
		if (!brandLabel.trim()) {
			alert('Enter a brand name before uploading.');
			return;
		}
		// If Supabase configured, use local file picker and upload to Supabase
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.multiple = true;
		input.onchange = async () => {
			const files = Array.from(input.files || []);
			for (const f of files) {
				try {
					const url = await uploadImageToSupabase(f, 'brands');
					addBrand({ label: brandLabel.trim(), imageUrl: url });
				} catch (err) {
					alert('Upload failed. Check Supabase configuration.');
				}
			}
			refresh();
		};
		input.click();
	}

	return (
		<div className="container py-12">
			<h1 className="text-2xl font-semibold">Admin: Upload Images</h1>
			<p className="text-black/60 mt-2">Upload brand images and manage the four visible labels on the homepage.</p>
			<div className="mt-6 flex flex-wrap items-center gap-3">
				<input value={brandLabel} onChange={(e) => setBrandLabel(e.target.value)} placeholder="Brand name (e.g., adidas)" className="h-12 w-64 border border-black/10 rounded-md px-3 text-sm" />
				<button onClick={openWidget} className="px-5 py-3 bg-black text-white rounded-md">Upload Brand Image</button>
				<button onClick={() => logout()} className="px-4 py-3 border border-black/10 rounded-md">Logout</button>
			</div>
			<div className="mt-8">
				<h2 className="font-semibold">Current Brands</h2>
				{brands.length === 0 ? (
					<p className="text-sm text-black/60 mt-2">No brands yet. Upload an image with a brand name above.</p>
				) : (
					<div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4">
						{brands.map(b => (
							<div key={b.id} className="border border-black/10 rounded-lg overflow-hidden">
								<div className="aspect-[3/4] bg-muted">
									<img src={b.imageUrl} alt={b.label} className="w-full h-full object-cover" />
								</div>
								<div className="p-2 text-sm flex items-center justify-between">
									<span className="font-medium">{b.label}</span>
									<button className="text-xs underline" onClick={() => { deleteBrand(b.id); refresh(); }}>Delete</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
			<div className="mt-6 text-xs text-black/60">Replace YOUR_CLOUD_NAME and YOUR_UNSIGNED_PRESET in this file with your Cloudinary credentials.</div>
		</div>
	);
}


