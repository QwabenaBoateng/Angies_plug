import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithCredentials } from '../auth/auth';

export const AdminLoginPage: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		if (loginWithCredentials(email, password)) {
			navigate('/admin', { replace: true });
		} else {
			setError('Invalid email or password');
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#a78bfa] via-[#93c5fd] to-[#c4b5fd] py-16 px-4">
			<div className="container max-w-5xl">
				<div className="grid md:grid-cols-2 bg-white/80 backdrop-blur rounded-2xl shadow-2xl overflow-hidden">
					{/* Left welcome panel */}
					<div className="relative hidden md:block">
						<img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop" alt="Welcome" className="absolute inset-0 w-full h-full object-cover" />
						<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,25,84,0.6)_0%,rgba(9,14,48,0.85)_100%)]" />
						<div className="relative p-10 text-white flex flex-col h-full justify-between">
							<div>
								<div className="opacity-90 text-sm font-medium">YOUR LOGO</div>
								<h2 className="mt-20 text-5xl font-semibold leading-tight">Hello,<br/>welcome!</h2>
								<p className="mt-6 text-white/80 max-w-xs">Manage site images and content securely from your admin dashboard.</p>
							</div>
							<div></div>
						</div>
					</div>

					{/* Right login form */}
					<div className="p-8 md:p-12">
						<h1 className="text-2xl font-semibold text-center md:text-left">Login</h1>
						<form onSubmit={handleSubmit} className="mt-8 space-y-4">
							<input
								type="email"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full h-12 rounded-xl border border-black/10 px-4 bg-white shadow-soft"
								autoComplete="username"
							/>
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full h-12 rounded-xl border border-black/10 px-4 bg-white shadow-soft"
								autoFocus
								autoComplete="current-password"
							/>
							<div className="flex items-center justify-between text-sm">
								<label className="flex items-center gap-2">
									<input type="checkbox" className="accent-black" />
									<span className="text-black/70">Remember me</span>
								</label>
								<a className="text-black/60 hover:text-black" href="#">Forgot password?</a>
							</div>
							{error && <div className="text-red-600 text-sm">{error}</div>}
							<button type="submit" className="w-full h-12 rounded-xl bg-[#5b6fed] text-white font-medium shadow-soft">Login</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};


