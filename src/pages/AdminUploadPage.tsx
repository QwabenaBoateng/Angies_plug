import React from 'react';
import { logout, isAuthenticated } from '../auth/auth';
import { Navigate } from 'react-router-dom';

declare global {
	interface Window {
		cloudinary: any;
	}
}

export const AdminUploadPage: React.FC = () => {
	if (!isAuthenticated()) {
		return <Navigate to="/login" replace />;
	}
	function openWidget() {
		if (!window.cloudinary) {
			alert('Cloudinary widget not loaded.');
			return;
		}
		const widget = window.cloudinary.createUploadWidget(
			{
				cloudName: 'YOUR_CLOUD_NAME',
				uploadPreset: 'YOUR_UNSIGNED_PRESET',
				folder: 'angies-plug',
				multiple: true,
				maxFiles: 10,
			},
			(_: unknown, result: any) => {
				if (result?.event === 'success') {
					const url: string = result.info.secure_url;
					console.log('Uploaded:', url);
					alert('Uploaded: ' + url);
				}
			}
		);
		widget.open();
	}

	return (
		<div className="container py-12">
			<h1 className="text-2xl font-semibold">Admin: Upload Images</h1>
			<p className="text-black/60 mt-2">Use the button below to upload product and banner images. Copy the resulting URLs and paste them into the site content.</p>
			<div className="mt-6 flex items-center gap-3">
				<button onClick={openWidget} className="px-5 py-3 bg-black text-white rounded-md">Open Upload Widget</button>
				<button onClick={() => logout()} className="px-4 py-3 border border-black/10 rounded-md">Logout</button>
			</div>
			<div className="mt-6 text-xs text-black/60">
				Note: Replace YOUR_CLOUD_NAME and YOUR_UNSIGNED_PRESET in `AdminUploadPage.tsx`. Create the unsigned preset in Cloudinary → Settings → Upload.
			</div>
		</div>
	);
};


