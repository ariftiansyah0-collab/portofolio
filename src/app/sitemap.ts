import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const BASE_URL = 'https://www.fajrielariftiansyah.my.id/';
    const { data: daftarProyek } = await supabase.from('proyek').select('id');
    const halamanProyek = (daftarProyek ?? []).map((item) => ({
        url: `${BASE_URL}/proyek/${item.id}`,
        lastModified: new Date(),
    }));
    
    return [
        { url: BASE_URL, lastModified: new Date() },
        { url: `${BASE_URL}/proyek`, lastModified: new Date() },
        { url: `${BASE_URL}/tentang`, lastModified: new Date() },
        ...halamanProyek,
    ];
}
