import { supabase } from './supabaseClient';

export async function uploadImageToSupabase(file: File, folder: string = 'uploads'): Promise<string> {
    if (!supabase) throw new Error('Supabase is not configured');
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
    const { error } = await supabase.storage.from('angies-plug').upload(path, file, { cacheControl: '3600', upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from('angies-plug').getPublicUrl(path);
    return data.publicUrl;
}


