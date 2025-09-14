import { supabase } from './supabaseClient';

export async function listProductsByCategory(category: string) {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty array');
    return [];
  }
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error querying products:', error);
    throw error;
  }
  return data;
}

export async function createProduct(p: { name: string; price: number; imageUrl: string; category: string; }) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  const { data, error } = await supabase
    .from('products')
    .insert([{ name: p.name, price: p.price, image_url: p.imageUrl, category: p.category }])
    .select();
  if (error) {
    console.error('Error creating product:', error);
    throw error;
  }
  return data;
}

export async function deleteProduct(id: string) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}

export async function listBrands() {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty array');
    return [];
  }
  const { data, error } = await supabase.from('brands').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Error querying brands:', error);
    throw error;
  }
  return data;
}

export async function createBrand(b: { label: string; imageUrl: string }) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  const { data, error } = await supabase.from('brands').insert([{ label: b.label, image_url: b.imageUrl }]).select();
  if (error) {
    console.error('Error creating brand:', error);
    throw error;
  }
  return data;
}

export async function addHeroImage(url: string) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  const { data, error } = await supabase.from('hero_images').insert([{ image_url: url }]).select();
  if (error) {
    console.error('Error adding hero image:', error);
    throw error;
  }
  return data;
}

export async function listHeroImages() {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty array');
    return [];
  }
  const { data, error } = await supabase.from('hero_images').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Error querying hero images:', error);
    throw error;
  }
  return data?.map((r: any) => r.image_url) ?? [];
}


