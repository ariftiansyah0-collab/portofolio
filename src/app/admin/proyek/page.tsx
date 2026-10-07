import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from "@/lib/supabase-server";
import DeleteModal from '@/components/project/DeleteModal';
import AdminSidebar from '@/components/admin/AdminSidebar';
import EditModal from '../../../components/project/EditModal';

async function logoutAction() {
    'use server';
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect('/admin/login');
}

const BUCKET_FOTO_PROYEK = 'proyek';
const MAKS_UKURAN_FOTO = 5 * 1024 * 1024;
const EKSTENSI_FOTO: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
};

function ambilFoto(formData: FormData): File | null {
    const foto = formData.get('gambar');
    if (!(foto instanceof File) || foto.size === 0) return null;
    if (!EKSTENSI_FOTO[foto.type]) {
        throw new Error('Format foto harus JPG, PNG, atau WebP.');
    }
    if (foto.size > MAKS_UKURAN_FOTO) {
        throw new Error('Ukuran foto maksimal 5 MB.');
    }
    return foto;
}

async function unggahFotoProyek(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>, foto: File) {
    const path = `${crypto.randomUUID()}.${EKSTENSI_FOTO[foto.type]}`;
    const { error } = await supabase.storage.from(BUCKET_FOTO_PROYEK).upload(path, foto, {
        cacheControl: '3600',
        contentType: foto.type,
        upsert: false,
    });
    if (error) {
        console.error('Gagal mengunggah foto proyek:', error.message);
        throw new Error(`Gagal mengunggah foto: ${error.message}`);
    }

    return {
        path,
        url: supabase.storage.from(BUCKET_FOTO_PROYEK).getPublicUrl(path).data.publicUrl,
    };
}

async function hapusFotoProyek(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>, path: string) {
    const { error } = await supabase.storage.from(BUCKET_FOTO_PROYEK).remove([path]);
    if (error) console.error('Gagal membersihkan foto proyek:', error.message);
}

function pathFotoProyek(url: string): string | null {
    try {
        const urlFoto = new URL(url);
        const urlSupabase = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!);
        const awalanPath = `/storage/v1/object/public/${BUCKET_FOTO_PROYEK}/`;
        if (urlFoto.origin !== urlSupabase.origin || !urlFoto.pathname.startsWith(awalanPath)) return null;
        return decodeURIComponent(urlFoto.pathname.slice(awalanPath.length));
    } catch {
        return null;
    }
}

async function tambahProyekAction(formData: FormData) {
    'use server';
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Silakan masuk untuk mengelola proyek.');

    const foto = ambilFoto(formData);
    if (!foto) throw new Error('Foto proyek wajib diunggah.');
    const fotoTerunggah = await unggahFotoProyek(supabase, foto);
    const { error } = await supabase.from('proyek').insert({
        judul: formData.get('judul') as string,
        deskripsi: (formData.get('deskripsi') as string).trim(),
        detail: (formData.get('detail') as string).trim(),
        teknologi: formData.get('teknologi') as string,
        link: (formData.get('link') as string) || null,
        gambar: fotoTerunggah.url,
    });
    if (error) {
        console.error('Gagal menambah proyek:', error.message);
        await hapusFotoProyek(supabase, fotoTerunggah.path);
        throw new Error('Gagal menyimpan proyek. Silakan coba lagi.');
    }
    revalidatePath('/admin/proyek');
    revalidatePath('/proyek');
    revalidatePath('/');
}

async function hapusProyekAction(formData: FormData) {
    'use server';
    const id = formData.get('id');
    if (typeof id !== 'string' || !id.trim()) {
        throw new Error('ID proyek tidak valid.');
    }

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from('proyek').delete().eq('id', id);
    if (error) {
        console.error('Gagal menghapus proyek:', error.message);
        throw new Error('Gagal menghapus proyek. Silakan coba lagi.');
    }

    revalidatePath('/admin/proyek');
    revalidatePath('/proyek');
    revalidatePath('/');
    redirect('/admin/proyek');
}

async function editProyekAction(formData: FormData) {
    'use server';
    const id = formData.get('id');
    if (typeof id !== 'string' || !id.trim()) {
        throw new Error('ID proyek tidak valid.');
    }

    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Silakan masuk untuk mengelola proyek.');

    const { data: proyekLama, error: errorBaca } = await supabase
        .from('proyek')
        .select('gambar')
        .eq('id', id)
        .single();
    if (errorBaca) throw new Error('Proyek tidak ditemukan atau gagal dibaca.');

    const foto = ambilFoto(formData);
    const fotoTerunggah = foto ? await unggahFotoProyek(supabase, foto) : null;
    const perubahan: {
        judul: string;
        deskripsi: string;
        detail: string;
        teknologi: string;
        link: string | null;
        gambar?: string;
    } = {
        judul: formData.get('judul') as string,
        deskripsi: (formData.get('deskripsi') as string).trim(),
        detail: (formData.get('detail') as string).trim(),
        teknologi: formData.get('teknologi') as string,
        link: (formData.get('link') as string) || null,
    };
    if (fotoTerunggah) perubahan.gambar = fotoTerunggah.url;

    const { error } = await supabase.from('proyek').update(perubahan).eq('id', id);
        if (error) {
            console.error('Gagal menambah proyek:', error);

            if (fotoTerunggah) await hapusFotoProyek(supabase, fotoTerunggah.path);

            throw new Error(`Gagal menyimpan proyek: ${error.message}`);
        }

    if (fotoTerunggah && proyekLama.gambar) {
        const pathFotoLama = pathFotoProyek(proyekLama.gambar);
        if (pathFotoLama) await hapusFotoProyek(supabase, pathFotoLama);
    }
    revalidatePath('/admin/proyek');
    revalidatePath('/proyek');
    revalidatePath('/');
    redirect('/admin/proyek');
}

export default async function AdminProyekPage() {
    const supabase = await createSupabaseServerClient();
    const [{ data: { user } }, { data: daftarProyek }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from('proyek').select('*').order('id', { ascending: true }),
    ]);

    return (
        <div className="grid min-h-screen bg-background text-text lg:grid-cols-[252px_minmax(0,1fr)]">
            <AdminSidebar email={user?.email} logoutAction={logoutAction} />

            <main className="min-w-0">
                <div className="mx-auto w-full max-w-340 px-3.5 py-7 sm:px-5.5 lg:px-11 lg:pb-16 lg:pt-10.5">
                    <header className="mb-7.5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h1 className="m-0 text-2xl font-bold text-text sm:text-[29px]">Manajemen Proyek</h1>
                            <p className="mt-2 text-[13px] text-[#a8b0b4]">Atur karya yang tampil di portofolio Anda.</p>
                        </div>

                        <div className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-lg border border-border bg-card px-3.5 py-2.5 text-xs text-[#a8b0b4]">
                            <span className="text-lg font-bold text-primary">{daftarProyek?.length ?? 0}</span>
                            <span>proyek tersimpan</span>
                        </div>
                    </header>

                    <section className="mb-5.5 overflow-hidden rounded-[9px] border border-border bg-card shadow-[0_8px_24px_rgba(0,0,0,0.12)]" aria-labelledby="project-list-title">
                        <div className="flex items-center justify-between gap-4 border-b border-border px-5.5 py-5">
                            <div>
                                <h2 id="project-list-title" className="m-0 text-[15px] font-bold text-text">Daftar proyek</h2>
                                <p className="mt-1.25 text-xs text-[#a8b0b4]">Perbarui detail atau hapus proyek yang sudah tidak ditampilkan.</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-[13px]">
                                <thead>
                                    <tr>
                                        <th className="bg-surface px-5.5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.7px] text-[#a8b0b4]">Judul</th>
                                        <th className="bg-surface px-5.5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.7px] text-[#a8b0b4]">Teknologi</th>
                                        <th className="bg-surface px-5.5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.7px] text-[#a8b0b4]">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {daftarProyek?.map((proyek) => (
                                        <tr key={proyek.id} className="border-t border-border hover:bg-surface">
                                            <td className="min-w-45 px-5.5 py-3.5 font-semibold text-text">{proyek.judul}</td>
                                            <td className="min-w-40 px-5.5 py-3.5 text-[#a8b0b4]">{proyek.teknologi || '—'}</td>
                                            <td className="px-5.5 py-3.5">
                                                <div className="flex gap-2">
                                                    <EditModal
                                                        proyek={{
                                                            id: proyek.id,
                                                            judul: proyek.judul,
                                                            deskripsi: proyek.deskripsi,
                                                            detail: proyek.detail,
                                                            teknologi: proyek.teknologi,
                                                            link: proyek.link,
                                                            gambar: proyek.gambar,
                                                        }}
                                                        action={editProyekAction}
                                                    />
                                                    <DeleteModal proyek={{ id: proyek.id, judul: proyek.judul }} action={hapusProyekAction} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="overflow-hidden rounded-[9px] border border-border bg-card shadow-[0_8px_24px_rgba(0,0,0,0.12)]" aria-labelledby="add-project-title">
                        <div className="flex items-center justify-between gap-4 border-b border-border px-5.5 py-5">
                            <div>
                                <h2 id="add-project-title" className="m-0 text-[15px] font-bold text-text">Tambah proyek</h2>
                                <p className="mt-1.25 text-xs text-[#a8b0b4]">Masukkan informasi dasar dan gambar untuk karya baru.</p>
                            </div>
                            <span className="grid h-8 w-8 place-items-center rounded-[7px] bg-[#edf5eb] text-[22px] text-[#2c755b]" aria-hidden="true">+</span>
                        </div>

                        <form action={tambahProyekAction} className="grid gap-4.25 p-5.5">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="min-w-0">
                                    <label htmlFor="judul" className="mb-1.75 block text-xs font-bold text-[#d4dbd8]">Judul Proyek</label>
                                    <input id="judul" name="judul" required className="min-h-10 w-full rounded-md border border-border bg-surface px-2.75 py-2.25 text-[13px] text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-[#53916d]/20" />
                                </div>
                                <div className="min-w-0">
                                    <label htmlFor="teknologi" className="mb-1.75 block text-xs font-bold text-[#d4dbd8]">Teknologi</label>
                                    <input id="teknologi" name="teknologi" className="min-h-10 w-full rounded-md border border-border bg-surface px-2.75 py-2.25 text-[13px] text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-[#53916d]/20" />
                                </div>
                            </div>

                            <div className="min-w-0">
                                <label htmlFor="deskripsi" className="mb-1.75 block text-xs font-bold text-[#d4dbd8]">Deskripsi singkat untuk section project</label>
                                <textarea id="deskripsi" name="deskripsi" rows={3} placeholder="Masukkan ringkasan singkat yang akan ditampilkan di kartu proyek." className="min-h-22 w-full resize-y rounded-md border border-border bg-surface px-2.75 py-2.25 text-[13px] text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-[#53916d]/20" />
                            </div>

                            <div className="min-w-0">
                                <label htmlFor="detail" className="mb-1.75 block text-xs font-bold text-[#d4dbd8]">Deskripsi lengkap untuk detail proyek</label>
                                <textarea id="detail" name="detail" rows={6} placeholder="Masukkan detail lengkap yang akan muncul saat membuka proyek." className="min-h-32 w-full resize-y rounded-md border border-border bg-surface px-2.75 py-2.25 text-[13px] text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-[#53916d]/20" />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="min-w-0">
                                    <label htmlFor="link" className="mb-1.75 block text-xs font-bold text-[#d4dbd8]">Link Proyek <span className="font-normal text-[#a8b0b4]">(opsional)</span></label>
                                    <input id="link" name="link" type="url" className="min-h-10 w-full rounded-md border border-border bg-surface px-2.75 py-2.25 text-[13px] text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-[#53916d]/20" />
                                </div>
                                <div className="min-w-0">
                                    <label htmlFor="gambar" className="mb-1.75 block text-xs font-bold text-[#d4dbd8]">Foto Proyek</label>
                                    <input id="gambar" name="gambar" type="file" accept="image/jpeg,image/png,image/webp" required className="min-h-10 w-full rounded-md border border-border bg-surface px-1.5 py-1.5 text-[13px] text-[#a8b0b4] outline-none transition file:mr-2.5 file:rounded-md 
                                        file:border-0 bg-primary file:px-2.25 file:py-1.5 text-primary file:font-semibold border-primary focus:ring-2 focus:ring-[#53916d]/20" />
                                    <p className="mt-1.5 text-[11px] text-[#a8b0b4]">JPG, PNG, atau WebP. Maksimal 5 MB.</p>
                                </div>
                            </div>
                            <button type="submit" className="justify-self-start rounded-md border-0 bg-primary px-3.75 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#225f49]">
                                Simpan proyek
                            </button>
                        </form>
                    </section>
                </div>
            </main>
        </div>
    );
}
