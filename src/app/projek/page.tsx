import Link from "next/link";
import Image from "next/image";
import { supabase } from '@/lib/supabase';

interface Project {
  id: number;
  judul: string;
  gambar: string;
}

export default async function ProjekPage() {
  const { data: projek, error } = await supabase
    .from("proyek")
    .select("id, judul, gambar")
    .order("id", { ascending: true });

  if (error) {
    return <p className="px-6 py-10 text-red-600">Gagal memuat data: {error.message}</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 text-white">
        <div className="flex justify-between mb-10 max-w-3xl">
          <Link 
          href="/#projects"
          className="px-8 py-3 rounded-full bg-primary text-gray-200 font-medium hover:opacity-90 transition 
          flex items-center justify-center gap-4 cursor-pointer">
            ← Kembali
          </Link>
        </div>
      <h1 className="text-4xl font-bold mb-4">Projek Saya</h1>
      <p className="text-gray-400 mb-10 max-w-2xl">
        Kumpulan project yang pernah saya buat sebagai sarana belajar dan eksplorasi.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {projek?.map((project: Project) => (
          <Link
            key={project.id}
            href={`/projek/${project.id}`}
            className="rounded 2xl bg-surface border border-border transition-all
        duration-all duration-300
        hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{project.judul}</h2>
            </div>
            <div className="relative w-full h-48">
              <Image
                src={project.gambar}
                alt={project.judul}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}