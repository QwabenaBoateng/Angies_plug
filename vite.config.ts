import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
	plugins: [
		react(),
		{
			name: 'admin-rewrite',
			configureServer(server) {
				server.middlewares.use((req, res, next) => {
					const url = req.url || '';
					if ((url === '/admin' || url.startsWith('/admin/')) && !url.endsWith('.html')) {
						const html = fs.readFileSync(resolve(__dirname, 'admin.html'), 'utf-8');
						res.setHeader('Content-Type', 'text/html; charset=utf-8');
						res.end(html);
						return;
					}
					next();
				});
			},
		},
	],
	build: {
		outDir: 'dist',
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				admin: resolve(__dirname, 'admin.html'),
			},
		},
	},
	server: {
		host: true,
	},
});


