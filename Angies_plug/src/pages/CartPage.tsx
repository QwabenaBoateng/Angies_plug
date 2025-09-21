import React from 'react';
import { clearCart, getCartTotal, loadCart, removeFromCart, updateQuantity } from '../store/cartStore';
import { formatCurrencyGHS } from '../lib/formatCurrency';

export const CartPage: React.FC = () => {
	const [items, setItems] = React.useState(loadCart());
	const refresh = () => setItems(loadCart());

	return (
		<main className="container py-8">
			<h1 className="text-xl font-semibold mb-6">Your Cart</h1>
			{items.length === 0 ? (
				<p className="text-sm text-black/60">Your cart is empty.</p>
			) : (
				<div className="grid gap-6 md:grid-cols-[1fr_320px]">
					<div className="space-y-4">
						{items.map((it) => (
							<div key={it.productId} className="flex gap-4 items-center border border-black/10 rounded-lg p-3">
								<img src={it.imageUrl} alt={it.name} className="w-20 h-24 object-cover rounded" />
								<div className="flex-1">
									<div className="font-medium">{it.name}</div>
									<div className="text-sm mt-1">{formatCurrencyGHS(it.price)}</div>
								</div>
								<div className="flex items-center gap-2">
									<button className="px-2 py-1 border" onClick={() => { updateQuantity(it.productId, it.quantity - 1); refresh(); }}>-</button>
									<input className="w-12 text-center border rounded" value={it.quantity} onChange={(e) => { const v = parseInt(e.target.value || '0', 10); updateQuantity(it.productId, isNaN(v) ? 0 : v); refresh(); }} />
									<button className="px-2 py-1 border" onClick={() => { updateQuantity(it.productId, it.quantity + 1); refresh(); }}>+</button>
								</div>
								<button className="text-xs text-red-600 ml-4" onClick={() => { removeFromCart(it.productId); refresh(); }}>Remove</button>
							</div>
						))}
					</div>
					<aside className="border border-black/10 rounded-lg p-4 h-fit">
						<div className="flex items-center justify-between">
							<span className="font-medium">Subtotal</span>
							<span className="font-semibold">{formatCurrencyGHS(getCartTotal())}</span>
						</div>
						<button className="mt-4 w-full py-2 bg-black text-white rounded-md">Checkout</button>
						<button className="mt-2 w-full py-2 border rounded-md" onClick={() => { clearCart(); refresh(); }}>Clear Cart</button>
					</aside>
				</div>
			)}
		</main>
	);
};


