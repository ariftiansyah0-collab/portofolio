import Image from "next/image"
import { notFound } from "next/navigation"
import BackButton from "@/components/ui/BackButton";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    id: string
  }>
}

type Project = {
  id: number
  judul: string
  deskripsi: string
  gambar: string
  detail?: string
  liveUrl?: string | null
  githubUrl?: string | null
  teknologi?: string | string[]
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params

  const { data: project, error } = await supabase
    .from("proyek")
    .select("*")
    .eq("id", id)
    .maybeSingle<Project>()

  if (error || !project) {
    notFound()
  }

  const technologies = Array.isArray(project.teknologi)
    ? project.teknologi
    : project.teknologi?.split(/\s*-\s*|,\s*/) ?? []

  return (
    <main className="min-h-screen bg-gray text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div data-aos="fade" className="flex justify-between mb-10 max-w-3xl">
          <BackButton />
        </div>
        <div data-aos="fade" data-aos-delay="200" className="mb-10 max-w-3xl">
            <h1 className="mb-5 text-4xl font-bold tracking-tight md:text-6xl">{project.judul}</h1>
          <p className="text-lg leading-relaxed text-zinc-400">{project.deskripsi}</p>
        </div>

        <div data-aos="fade" data-aos-delay="300" className="relative mb-12 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <Image
            src={project.gambar}
            alt={project.judul}
            width={1400}
            height={800}
            className="h-auto w-full object-cover"
          />
        </div>

        {/* Content */}
        <div data-aos="fade" data-aos-delay="400" className="grid gap-12 md:grid-cols-[1fr_300px] hover:bg-auto">

          {/* Description */}
          <section>
            <h2 data-aos="fade" data-aos-delay="500" className="mb-4 text-2xl font-semibold">Deskripsi
            </h2>

            <p className="leading-8 text-zinc-600">
              {project.detail ?? project.deskripsi}
            </p>
          </section>

          {/* Sidebar */}
          <aside>
            <h2 data-aos="fade" data-aos-delay="700" className="mb-4 text-xl font-semibold">
              Teknologi
            </h2>

            <div className="mb-8 flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div data-aos="fade" data-aos-delay="800" className="flex flex-col gap-3">
              <a
                href={project.liveUrl ?? "#"}
                target={project.liveUrl ? "_blank" : undefined}
                rel={project.liveUrl ? "noopener noreferrer" : undefined}
                className="rounded-xl bg-primary px-5 py-3 text-center font-medium text-white transition hover:bg-primary/90"
              >
                Live Demo
              </a>

              <a
                href={project.githubUrl ?? "#"}
                target={project.githubUrl ? "_blank" : undefined}
                rel={project.githubUrl ? "noopener noreferrer" : undefined}
                className="rounded-xl border border-zinc-700 px-5 py-3 text-center text-white font-medium transition hover:text-primary"
              >
                View on GitHub
              </a>
            </div>
          </aside>

        </div>
      </div>
    </main>
  )
}