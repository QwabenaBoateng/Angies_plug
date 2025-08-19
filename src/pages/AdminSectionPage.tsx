import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { isAuthenticated } from '../auth/auth';
import { loadHeroImages, removeHeroImage } from '../store/heroStore';
import { getProductsByCategory, migrateHeroFromProducts, updateProduct, deleteProduct, toggleOutOfStock } from '../store/contentStore';
import type { ProductCategory } from '../types/product';
import { formatCurrencyGHS } from '../lib/formatCurrency';

type Section = 'hero' | 'featured' | 'accessories' | 'mens' | 'womens';

export const AdminSectionPage: React.FC = () => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    const { section } = useParams<{ section: Section }>();
    const sec = (section as Section) || 'featured';

    // Ensure any misfiled hero items are migrated from products storage
    if (sec === 'hero') {
        migrateHeroFromProducts();
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold capitalize">{sec} – Grid View</h1>
            </div>

            {sec === 'hero' ? (
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loadHeroImages().map((src, idx) => (
                        <div key={idx} className="bg-white rounded-xl border border-black/10 overflow-hidden relative">
                            <div className="aspect-[16/9] bg-muted">
                                <img src={src} alt={`Hero ${idx + 1}`} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-3 flex items-center justify-between text-sm">
                                <div>Slide {idx + 1}</div>
                                <button className="text-red-600" onClick={() => { removeHeroImage(idx); location.reload(); }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {getProductsByCategory(sec as ProductCategory).map((p) => (
                        <div key={p.id} className="bg-white rounded-xl border border-black/10 overflow-hidden">
                            <div className="aspect-[3/4] bg-muted">
                                <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                                {p.outOfStock && (
                                    <div className="absolute inset-0 bg-black/60 grid place-items-center">
                                        <span className="text-white text-sm font-semibold uppercase tracking-wide">Out of Stock</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-3 text-sm space-y-2">
                                <input
                                    defaultValue={p.name}
                                    className="w-full h-10 border border-black/10 rounded px-3"
                                    onBlur={(e)=>updateProduct(p.id,{ name: e.target.value })}
                                />
                                <div className="flex items-center justify-between gap-2">
                                    <input
                                        type="number"
                                        step="0.01"
                                        defaultValue={p.price}
                                        className="h-10 w-32 border border-black/10 rounded px-3"
                                        onBlur={(e)=>updateProduct(p.id,{ price: Number(e.target.value) })}
                                    />
                                    <button
                                        className="h-10 px-3 rounded border border-black/10"
                                        onClick={()=>{ deleteProduct(p.id); location.reload(); }}
                                    >Delete</button>
                                </div>
                                <button
                                    className={`h-9 px-3 rounded ${p.outOfStock ? 'bg-amber-600 text-white' : 'border border-black/10'}`}
                                    onClick={()=>{ toggleOutOfStock(p.id); location.reload(); }}
                                >{p.outOfStock ? 'Unset Out of Stock' : 'Mark Out of Stock'}</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


