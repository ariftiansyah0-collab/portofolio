import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '../../../lib/supabase-server';

async function loginAction(formData: FormData) {

    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        redirect('/admin/login?error=Kredensial+tidak+valid');
    }
    redirect('/admin/proyek');
}
export default async function AdminLoginPage({
    searchParams,
        }: {
            searchParams: Promise<{
                key?: string;
                error?: string;
            }>;
        }) {
            const params = await searchParams;
            const key = params.key;

            // Cek doorpass
            if (key !== process.env.ADMIN_DOORPASS) {
                return (
                    <main className="min-h-screen bg-background text-white flex items-center justify-center px-4">
                        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center">
                            <div className="mb-4 text-4xl">
                            </div>

                            <h1 className="text-2xl font-bold">
                                Akses Ditolak
                            </h1>

                            <p className="mt-2 text-sm text-gray-400">
                                Password akses admin tidak valid.
                            </p>
                        </div>
                    </main>
                );
            }

    return (
        <main className="flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 text-text">
            <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-lg">
                <h1 className="mb-2 text-2xl font-bold text-text">Admin Login</h1>
                <p className="mb-6 text-sm text-gray-400">Masuk untuk mengelola data portofolio
                </p>
                {params.error && (
                    <p className="mb-4 rounded-lg border border-red-900 bg-red-950/50 p-3 text-sm text-red-300">
                        {params.error}
                    </p>
                )}
                <form action={loginAction} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-300">Email</label>
                        <input id="email" name="email" type="email" required
                            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-300">Password</label>
                        <input id="password" name="password" type="password" required
                            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <button type="submit"
                        className="w-full rounded-lg bg-primary py-2 font-medium text-white transition-colors hover:bg-primary/90">
                        Masuk
                    </button>
                </form>
            </div>
        </main>
    );
}