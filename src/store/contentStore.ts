import { Product, ProductCategory } from '../types/product';
import { addHeroImage } from './heroStore';

const STORAGE_KEY = 'angies_plug_products_v1';

export function loadProducts(): Product[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as Product[]) : [];
	} catch {
		return [];
	}
}

export function saveProducts(products: Product[]): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function addProduct(input: Omit<Product, 'id' | 'createdAt'>): Product {
	const product: Product = {
		...input,
		id: crypto.randomUUID(),
		createdAt: Date.now(),
	};
	if (product.category === 'hero') {
		addHeroImage(product.imageUrl);
	} else {
		const all = loadProducts();
		all.unshift(product);
		saveProducts(all);
	}
	return product;
}

export function getProductsByCategory(category: ProductCategory): Product[] {
	return loadProducts().filter((p) => p.category === category);
}

export function updateProduct(productId: string, updates: Partial<Pick<Product, 'name' | 'price' | 'category' | 'imageUrl' | 'outOfStock'>>): void {
	let all = loadProducts();
	const idx = all.findIndex((p) => p.id === productId);
	if (idx === -1) return;

	if (updates.category === 'hero') {
		const current = all[idx];
		addHeroImage((updates.imageUrl ?? current.imageUrl) as string);
		all = all.filter((p) => p.id !== productId);
		saveProducts(all);
		return;
	}

	all[idx] = { ...all[idx], ...updates } as Product;
	saveProducts(all);
}

export function deleteProduct(productId: string): void {
	const all = loadProducts().filter((p) => p.id !== productId);
	saveProducts(all);
}

export function migrateHeroFromProducts(): number {
	const all = loadProducts();
	const toMove = all.filter((p) => p.category === 'hero');
	if (toMove.length === 0) return 0;
	for (const p of toMove) {
		addHeroImage(p.imageUrl);
	}
	const remaining = all.filter((p) => p.category !== 'hero');
	saveProducts(remaining);
	return toMove.length;
}

export function toggleOutOfStock(productId: string): void {
	const all = loadProducts();
	const idx = all.findIndex((p) => p.id === productId);
	if (idx === -1) return;
	all[idx].outOfStock = !all[idx].outOfStock;
	saveProducts(all);
}


