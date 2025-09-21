const AUTH_STORAGE_KEY = 'angies_plug_admin_authed';

export function isAuthenticated(): boolean {
	return typeof window !== 'undefined' && localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

export function loginWithCredentials(email: string, password: string): boolean {
	// Allow overriding via env, but default to requested credentials
	const expectedEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@gmail.com';
	const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin';
	const success = email.trim().toLowerCase() === expectedEmail.toLowerCase() && password === expectedPassword;
	if (success) {
		localStorage.setItem(AUTH_STORAGE_KEY, 'true');
	}
	return success;
}

export function logout(): void {
	if (typeof window !== 'undefined') {
		localStorage.removeItem(AUTH_STORAGE_KEY);
	}
}


