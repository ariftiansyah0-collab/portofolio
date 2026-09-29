import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';

async function editProyekAction(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase
        .from('proyek')
        .update({
            judul: formData.get('judul') as string,
            deskripsi: formData.get('deskripsi') as string,
            teknologi: formData.get('teknologi') as string,
            link: (formData.get('link') as string) || null,
        })
        .eq('id', id);
    if (error) {
        console.error('Gagal mengedit proyek:', error.message);
    }
    revalidatePath('/admin/proyek');
    revalidatePath('/proyek');
    redirect('/admin/proyek');
}
export default async function EditProyekPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createSupabaseServerClient();
    const { data: proyek } = await supabase
        .from('proyek')
        .select('*')
        .eq('id', id)
        .single();
    if (!proyek) redirect('/admin/proyek');

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-6 ">Edit Proyek</h1>
            <div className="bg-white rounded-2xl border-slate-200 p-6">
                <form action={editProyekAction} className="space-y-4">
                    <input type="hidden" name="id" value={proyek.id} />
                    <div>
                        <label htmlFor="edit-judul" className="block text-sm font-medium text-slate-700 mb-1">Judul Proyek</label>
                        <input id="edit-judul" name="judul" defaultValue={proyek.judul} required className="w-ful border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus-ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="edit-teknologi" className="block text-sm font-medium text
                        slate-700 mb-1">Teknologi (pisah koma)</label>
                        <input id="edit-teknologi" name="teknologi" defaultValue={proyek.teknologi}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="edit-deskripsi" className="block text-sm font-medium text
                                        slate-700 mb-1">Deskripsi</label>
                        <textarea id="edit-deskripsi" name="deskripsi"
                            defaultValue={proyek.deskripsi} rows={3}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="edit-link" className="block text-sm font-medium text
                                        slate-700 mb-1">Link Proyek (opsional)</label>
                        <input id="edit-link" name="link" type="url" defaultValue={proyek.link ??
                            ''}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex gap-3">
                        <button type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font
                                        medium hover:bg-blue-700 transition-colors">
                            Simpan Perubahan
                        </button>
                        <a href="/admin/proyek"
                            className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-5 py-2 
                                        rounded-lg text-sm font-medium transition-colors">
                            Batal
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}