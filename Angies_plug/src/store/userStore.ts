export type AuthProvider = 'password' | 'google';

export interface AppUser {
	id: string;
	name: string;
	email: string;
	provider: AuthProvider;
	createdAt: number;
}

type UserListener = (user: AppUser | null) => void;

const USERS_KEY = 'angies_plug_users_v1';
const SESSION_KEY = 'angies_plug_user_session_v1';

const listeners: UserListener[] = [];

function notify(user: AppUser | null): void {
	for (const l of listeners) l(user);
}

export function subscribe(listener: UserListener): () => void {
	listeners.push(listener);
	return () => {
		const idx = listeners.indexOf(listener);
		if (idx !== -1) listeners.splice(idx, 1);
	};
}

function loadUsers(): Array<AppUser & { password?: string }> {
	try {
		const raw = localStorage.getItem(USERS_KEY);
		return raw ? (JSON.parse(raw) as Array<AppUser & { password?: string }>) : [];
	} catch {
		return [];
	}
}

function saveUsers(users: Array<AppUser & { password?: string }>): void {
	localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser(): AppUser | null {
	try {
		const raw = localStorage.getItem(SESSION_KEY);
		return raw ? (JSON.parse(raw) as AppUser) : null;
	} catch {
		return null;
	}
}

export function registerUser(name: string, email: string, password: string): { ok: true } | { ok: false; error: string } {
	const emailKey = email.trim().toLowerCase();
	if (!name.trim() || !emailKey || !password) return { ok: false, error: 'All fields are required' };
	const users = loadUsers();
	if (users.some(u => u.email.toLowerCase() === emailKey)) return { ok: false, error: 'Email already registered' };
	const user: AppUser & { password?: string } = {
		id: crypto.randomUUID(),
		name: name.trim(),
		email: emailKey,
		provider: 'password',
		createdAt: Date.now(),
		password,
	};
	users.push(user);
	saveUsers(users);
	localStorage.setItem(SESSION_KEY, JSON.stringify(user as AppUser));
	notify(user as AppUser);
	return { ok: true };
}

export function loginUser(email: string, password: string): { ok: true } | { ok: false; error: string } {
	const emailKey = email.trim().toLowerCase();
	const users = loadUsers();
	const found = users.find(u => u.email.toLowerCase() === emailKey && u.provider === 'password');
	if (!found || (found as any).password !== password) return { ok: false, error: 'Invalid credentials' };
	localStorage.setItem(SESSION_KEY, JSON.stringify(found as AppUser));
	notify(found as AppUser);
	return { ok: true };
}

export function loginWithGoogleMock(name: string, email: string): void {
	const emailKey = email.trim().toLowerCase();
	let users = loadUsers();
	let user = users.find(u => u.email.toLowerCase() === emailKey);
	if (!user) {
		user = { id: crypto.randomUUID(), name, email: emailKey, provider: 'google', createdAt: Date.now() } as AppUser;
		users.push(user as any);
		saveUsers(users);
	}
	localStorage.setItem(SESSION_KEY, JSON.stringify(user as AppUser));
	notify(user as AppUser);
}

export function logoutUser(): void {
	localStorage.removeItem(SESSION_KEY);
	notify(null);
}


