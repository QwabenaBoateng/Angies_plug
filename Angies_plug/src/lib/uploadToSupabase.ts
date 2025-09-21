import { supabase } from './supabaseClient';

const BUCKET = (import.meta as any).env?.VITE_SUPABASE_BUCKET || 'angies-plug';

export async function uploadImageToSupabase(file: File, folder: string = 'images'): Promise<string> {
    if (!supabase) {
        throw new Error('Supabase is not configured. Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
    }
    if (!BUCKET) {
        throw new Error('Supabase bucket is not set. Define VITE_SUPABASE_BUCKET in your env.');
    }
    const path = `images/${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: '3600', upsert: false });
    if (error) {
        throw new Error(`Upload failed: ${error.message}`);
    }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
}


