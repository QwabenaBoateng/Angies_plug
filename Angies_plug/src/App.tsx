import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoriesRow } from './components/CategoriesRow';
import { Featured } from './components/Featured';
import { NewsletterCta } from './components/NewsletterCta';
import { Accessories } from './components/Accessories';
import { Footer } from './components/Footer';

const App: React.FC = () => {
	return (
		<div className="font-sans text-black bg-white">
			<Header />
			<main>
				<Hero />
				<CategoriesRow />
				<Featured />
				<NewsletterCta />
				<Accessories />
			</main>
			<Footer />
		</div>
	);
};

export default App;


