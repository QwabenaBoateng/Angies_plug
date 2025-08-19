import type { Config } from 'tailwindcss';

export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#111111',
				accent: '#c7ab8a',
				muted: '#f2efe9',
			},
			fontFamily: {
				sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
			boxShadow: {
				soft: '0 12px 24px rgba(0,0,0,0.06)',
			},
		},
	},
	plugins: [],
} satisfies Config;


