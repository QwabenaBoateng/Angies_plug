import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCartCount, subscribe } from '../store/cartStore';

export const Header: React.FC = () => {
	const navigate = useNavigate();
	const [count, setCount] = React.useState<number>(() => getCartCount());
	const [open, setOpen] = React.useState(false);
	React.useEffect(() => {
		setCount(getCartCount());
		return subscribe(() => setCount(getCartCount()));
	}, []);

	return (
		<header className="border-b border-black/10">
			<div className="container py-4 flex items-center gap-3 relative">
				<div className="text-2xl font-semibold">Angie's Plug</div>
				<button onClick={() => setOpen((v)=>!v)} className="sm:hidden p-2 rounded hover:bg-black/5 ml-auto" aria-label="menu">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
				</button>
				<nav className={`${open ? 'flex' : 'hidden'} sm:flex absolute sm:relative left-0 right-0 top-full sm:top-auto bg-white sm:bg-transparent border-b border-black/10 sm:border-0 p-4 sm:p-0 flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm justify-center sm:justify-start`}>
					<Link className="font-medium" to="/" onClick={()=>setOpen(false)}>Home</Link>
					<Link to="/shop" onClick={()=>setOpen(false)}>Shop</Link>
					<Link to="/catalog" onClick={()=>setOpen(false)}>Catalog</Link>
				</nav>
				<div className="ml-auto hidden sm:flex items-center gap-4">
					<button onClick={() => navigate('/shop#search')} aria-label="search" className="p-2 rounded-full hover:bg-black/5">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
					</button>
					<button onClick={() => navigate('/account')} className="p-2 rounded-full hover:bg-black/5" aria-label="account">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
					</button>
					<button onClick={() => navigate('/cart')} className="relative p-2 rounded-full hover:bg-black/5" aria-label="cart">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6 5 3H2"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
						<span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1 text-[10px] bg-black text-white rounded-full grid place-items-center">{count}</span>
					</button>
				</div>
			</div>
		</header>
	);
};


