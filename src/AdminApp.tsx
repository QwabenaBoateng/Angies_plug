import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminUploadPage } from './pages/AdminUploadPage';
import { AdminSectionPage } from './pages/AdminSectionPage';

export const AdminApp: React.FC = () => {
    return (
        <HashRouter>
            <div className="font-sans text-black bg-white min-h-screen flex flex-col">
                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<AdminDashboardPage />} />
                        <Route path="/login" element={<AdminLoginPage />} />
                        <Route path="/upload" element={<AdminUploadPage />} />
                        <Route path="/section/:section" element={<AdminSectionPage />} />
                    </Routes>
                </div>
            </div>
        </HashRouter>
    );
};

export default AdminApp;


