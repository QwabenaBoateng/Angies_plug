export type ProductCategory = 'featured' | 'accessories' | 'mens' | 'womens' | 'hero';

export interface Product {
	id: string;
	name: string;
	price: number;
	imageUrl: string;
	category: ProductCategory;
	createdAt: number;
	outOfStock?: boolean;
}


