import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AdminUploadPage } from './pages/AdminUploadPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminSectionPage } from './pages/AdminSectionPage';

const AppShell: React.FC = () => {
	const location = useLocation();
	const isAdmin = location.pathname.startsWith('/admin');

	return (
		<div className="font-sans text-black bg-white min-h-screen flex flex-col">
			{!isAdmin && <Header />}
			<div className="flex-1">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<AdminLoginPage />} />
					<Route path="/admin" element={<AdminDashboardPage />} />
					<Route path="/admin/upload" element={<AdminUploadPage />} />
					<Route path="/admin/section/:section" element={<AdminSectionPage />} />
				</Routes>
			</div>
			{!isAdmin && <Footer />}
		</div>
	);
};

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<AppShell />
		</BrowserRouter>
	);
};

export default App;


