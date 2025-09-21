import { Product } from '../types/product';

export type CartItem = {
	productId: string;
	name: string;
	price: number;
	imageUrl: string;
	quantity: number;
};

const STORAGE_KEY = 'angies_plug_cart_v1';

type CartListener = (items: CartItem[]) => void;
const listeners: CartListener[] = [];

function notify(items: CartItem[]): void {
	for (const l of listeners) l(items);
}

export function loadCart(): CartItem[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as CartItem[]) : [];
	} catch {
		return [];
	}
}

export function saveCart(items: CartItem[]): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	notify(items);
}

export function subscribe(listener: CartListener): () => void {
	listeners.push(listener);
	return () => {
		const idx = listeners.indexOf(listener);
		if (idx !== -1) listeners.splice(idx, 1);
	};
}

export function addToCart(input: { id: string; name: string; price: number; imageUrl: string }): void {
	const items = loadCart();
	const idx = items.findIndex(i => i.productId === input.id);
	if (idx === -1) {
		items.unshift({ productId: input.id, name: input.name, price: input.price, imageUrl: input.imageUrl, quantity: 1 });
	} else {
		items[idx].quantity += 1;
	}
	saveCart(items);
}

export function removeFromCart(productId: string): void {
	const items = loadCart().filter(i => i.productId !== productId);
	saveCart(items);
}

export function updateQuantity(productId: string, quantity: number): void {
	const items = loadCart();
	const idx = items.findIndex(i => i.productId === productId);
	if (idx === -1) return;
	if (quantity <= 0) {
		items.splice(idx, 1);
	} else {
		items[idx].quantity = quantity;
	}
	saveCart(items);
}

export function clearCart(): void {
	saveCart([]);
}

export function getCartCount(): number {
	return loadCart().reduce((sum, i) => sum + i.quantity, 0);
}

export function getCartTotal(): number {
	return loadCart().reduce((sum, i) => sum + i.price * i.quantity, 0);
}


