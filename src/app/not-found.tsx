import Link from "next/link";

export default function NotFound() {
    return ( 
        <main className="flex-1 w-full flex min-h-screen flex-col items-center justify-center text-primary px-6">
                <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                    <p className="text-xl font-semibold mb-2">Halaman tidak ditemukan</p>
                    <p className="text-gray-700 mb-8 max-w-md"> Halaman yang anda cari tidak tersedia.
                    </p>
                <Link 
                    href="/"
                    className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:opacity-90 transition">
                    Kembali ke Beranda
                </Link>
        </main>
    )
}