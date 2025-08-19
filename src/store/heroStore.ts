const HERO_STORAGE_KEY = 'angies_plug_hero_images_v1';

export function loadHeroImages(): string[] {
	try {
		const raw = localStorage.getItem(HERO_STORAGE_KEY);
		return raw ? (JSON.parse(raw) as string[]) : [];
	} catch {
		return [];
	}
}

export function saveHeroImages(images: string[]): void {
	localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(images));
}

export function addHeroImage(dataUrl: string): void {
	const all = loadHeroImages();
	all.unshift(dataUrl);
	saveHeroImages(all);
}

export function removeHeroImage(index: number): void {
	const all = loadHeroImages();
	all.splice(index, 1);
	saveHeroImages(all);
}


