import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AdminApp from './AdminApp';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Root container not found');
}

createRoot(rootElement).render(
    <React.StrictMode>
        <AdminApp />
    </React.StrictMode>
);


