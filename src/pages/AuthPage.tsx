import React from 'react';
import { getCurrentUser, loginUser, loginWithGoogleMock, registerUser, subscribe } from '../store/userStore';

export const AuthPage: React.FC = () => {
	const [mode, setMode] = React.useState<'login' | 'register'>('register');
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState<string | null>(null);
	const [user, setUser] = React.useState(getCurrentUser());

	React.useEffect(() => subscribe(setUser), []);

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		if (mode === 'register') {
			const res = registerUser(name, email, password);
			if (!res.ok) setError(res.error);
		} else {
			const res = loginUser(email, password);
			if (!res.ok) setError(res.error);
		}
	};

	if (user) {
		return (
			<main className="container min-h-[70vh] grid place-items-center">
				<div className="text-center">
					<h1 className="text-xl font-semibold">Welcome, {user.name}</h1>
					<p className="mt-2 text-sm text-black/60">You are signed in with {user.provider}.</p>
				</div>
			</main>
		);
	}

	return (
		<main className="container min-h-[70vh] grid place-items-center">
			<div className="w-full max-w-md">
				<h1 className="text-xl font-semibold">{mode === 'register' ? 'Create account' : 'Sign in'}</h1>
				<form onSubmit={submit} className="mt-4 space-y-3">
					{mode === 'register' && (
						<input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="w-full border border-black/10 rounded-md px-3 py-2 text-sm" />
					)}
					<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border border-black/10 rounded-md px-3 py-2 text-sm" />
					<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border border-black/10 rounded-md px-3 py-2 text-sm" />
					{error && <div className="text-xs text-red-600">{error}</div>}
					<button type="submit" className="w-full py-2 bg-black text-white rounded-md text-sm">{mode === 'register' ? 'Sign up' : 'Sign in'}</button>
				</form>
				<div className="mt-4">
					<button onClick={() => loginWithGoogleMock('Google User', email || 'user@example.com')} className="w-full py-2 border rounded-md text-sm flex items-center justify-center gap-2">
						<span className="inline-block w-4 h-4" aria-hidden>
							<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.7-2.6-5.7-5.8S8.9 5.8 12 5.8c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.8 3.5 14.6 2.6 12 2.6 6.9 2.6 2.8 6.7 2.8 11.8s4.1 9.2 9.2 9.2c5.3 0 8.8-3.7 8.8-8.9 0-.6-.1-1-.2-1.5H12z"/><path fill="#34A853" d="M3.9 7.3l3 2.2c.8-1.9 2.6-3.7 5.1-3.7 1.8 0 3 .8 3.7 1.5l2.5-2.4C16.8 3.5 14.6 2.6 12 2.6 8.2 2.6 4.9 4.7 3.9 7.3z" opacity=".8"/><path fill="#FBBC05" d="M12 21c2.7 0 5-.9 6.7-2.4l-3-2.3c-.9.6-2.2 1-3.7 1-2.4 0-4.5-1.6-5.3-3.7l-3 2.3C5.2 19.2 8.3 21 12 21z" opacity=".8"/><path fill="#4285F4" d="M21.7 12.1c0-.6-.1-1-.2-1.5H12v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.7-2.6-5.7-5.8S8.9 5.8 12 5.8c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.8 3.5 14.6 2.6 12 2.6c-5.1 0-9.2 4.1-9.2 9.2 0 1.5.4 2.8 1 4l3-2.3c-.5-1-.8-2.1-.8-3.1 0-3.2 2.6-5.8 5.7-5.8 1.8 0 3 .8 3.7 1.5l2.5-2.4C16.8 3.5 14.6 2.6 12 2.6 6.9 2.6 2.8 6.7 2.8 11.8c0 1.2.3 2.4.8 3.5l3-2.2" opacity=".8"/></svg>
						</span>
						<span>Continue with Google</span>
					</button>
				</div>
				<div className="mt-3 text-xs">
					<button className="underline" onClick={() => setMode(mode === 'register' ? 'login' : 'register')}>
						{mode === 'register' ? 'Have an account? Sign in' : "New here? Create an account"}
					</button>
				</div>
			</div>
		</main>
	);
};


