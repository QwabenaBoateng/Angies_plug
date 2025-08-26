import { supabase } from './supabaseClient';

export async function listProductsByCategory(category: string) {
  const variants = [category, category.toUpperCase(), category.charAt(0).toUpperCase() + category.slice(1)];
  const orExpr = variants.map(v => `category.eq.${v}`).join(',');
  const { data, error } = await supabase!
    .from('products')
    .select('*')
    .or(orExpr)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createProduct(p: { name: string; price: number; imageUrl: string; category: string; }) {
  const { error } = await supabase!
    .from('products')
    .insert([{ name: p.name, price: p.price, image_url: p.imageUrl, category: p.category }]);
  if (error) throw error;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase!.from('products').delete().eq('id', id);
  if (error) throw error;
}

export async function listBrands() {
  const { data, error } = await supabase!.from('brands').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createBrand(b: { label: string; imageUrl: string }) {
  const { error } = await supabase!.from('brands').insert([{ label: b.label, image_url: b.imageUrl }]);
  if (error) throw error;
}

export async function addHeroImage(url: string) {
  const { error } = await supabase!.from('hero_images').insert([{ image_url: url }]);
  if (error) throw error;
}

export async function listHeroImages() {
  const { data, error } = await supabase!.from('hero_images').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data?.map((r: any) => r.image_url) ?? [];
}


