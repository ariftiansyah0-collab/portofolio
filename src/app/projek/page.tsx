import Link from "next/link";
import Image from "next/image";
import { projek } from "../data/projects";
import CardProyek from "@/components/project/ProjectCard";
import { supabase } from '@/lib/supabase';

interface Project {
  id: string;
  title: string;
  description: string;
  images: string;
  detail: string;
  liveUrl: string;
  githubUrl: string;
}

export default function ProjekPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10 text-white">
        <div data-aos="fade" className="flex justify-between mb-10 max-w-3xl">
          <Link 
          href="/#projects"
          className="px-8 py-3 rounded-full bg-primary text-gray-200 font-medium hover:opacity-90 transition 
          flex items-center justify-center gap-4 cursor-pointer">
            ← Kembali
          </Link>
        </div>
      <h1 data-aos="fade" data-aos-delay="200" className="text-4xl font-bold mb-4">Projek Saya</h1>
      <p data-aos="fade" data-aos-delay="300" className="text-gray-400 mb-10 max-w-2xl">
        Kumpulan project yang pernah saya buat sebagai sarana belajar dan eksplorasi.
      </p>

      <div data-aos="fade" data-aos-delay="400" className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {projek.map((project: Project) => (
          <Link
            key={project.id}
            href={`/projek/${project.id}`}
            className="rounded 2xl bg-surface border border-border transition-all
        duration-all duration-300
        hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
          >
            <div className="relative w-full h-48">
              <Image
                src={project.images}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{project.title}</h2>
              <p className="text-sm text-gray-400 line-clamp-2">
                {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}