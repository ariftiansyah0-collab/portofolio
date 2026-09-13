import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { projek} from "../../data/projects"
import BackButton from "@/components/ui/BackButton";

type Props = {
  params: Promise<{
    id: string
  }>
}

type Project = {
  id: string
  title: string
  description: string
  images: string
  detail: string
  liveUrl: string
  githubUrl: string
  tech?: string[]
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params

  const project = projek.find(
    (item: { id: string }) => item.id === id
  ) as Project | undefined

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div data-aos="fade" className="flex justify-between mb-10 max-w-3xl">
          <BackButton />
        </div>
        <div data-aos="fade" data-aos-delay="200" className="mb-10 max-w-3xl">
            <h1 className="mb-5 text-4xl font-bold tracking-tight md:text-6xl">{project.title}</h1>
          <p className="text-lg leading-relaxed text-zinc-400">{project.description}</p>
        </div>

        <div data-aos="fade" data-aos-delay="300" className="relative mb-12 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <Image
            src={project.images}
            alt={project.title}
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
              {project.detail}
            </p>
          </section>

          {/* Sidebar */}
          <aside>
            <h2 data-aos="fade" data-aos-delay="700" className="mb-4 text-xl font-semibold">
              Teknologi
            </h2>

            <div className="mb-8 flex flex-wrap gap-2">
              {project.tech?.map((tech) => (
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
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-primary px-5 py-3 text-center font-medium text-white transition hover:bg-primary/90"
              >
                Live Demo 
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
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