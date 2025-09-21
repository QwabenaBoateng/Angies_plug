import React from 'react';
import { Hero } from '../components/Hero';
import { CategoriesRow } from '../components/CategoriesRow';
import { Featured } from '../components/Featured';
import { NewsletterCta } from '../components/NewsletterCta';
import { Brands } from '../components/Brands';

export const HomePage: React.FC = () => {
	return (
		<main>
			<Hero />
			<CategoriesRow />
			<Featured />
			<NewsletterCta />
			<Brands />
		</main>
	);
};


