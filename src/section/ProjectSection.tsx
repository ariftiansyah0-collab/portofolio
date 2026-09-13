import ProjectCard from "@/components/project/ProjectCard"
import SectionHeader from "@/components/ui/SectionHeader"
import Link from "next/link";
import { projek } from "@/app/data/projects";

export default function ProjectSection() {
    return (
        <section id="projects" className="py-24 relative text-white">
            <div data-aos="fade-up" className="w-[90%] max-w-6xl mx-auto space-y-12">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl bg-primary/10"
                />
                <SectionHeader 
                    title="Beberapa karya terbaru"
                    highlight="saya"
                    badge="projects"
                    description="Pilihan proyek yang menampilkan kemampuan saya dalam merancang,
                            membangun, dan mengembangkan skala aplikasi full-stack modern." />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {projek.map((item) => (
                        <ProjectCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            image={item.images}
                            tags={["Next.js", "Typescript", "Supabase"]}
                            liveURL={item.liveUrl}
                            githubURL={item.githubUrl}
                        />
                    ))}
                </div>
                <div className="flex justify-center">
                    <Link
                        href="/projek"
                        className="px-8 py-3 rounded-full bg-primary
                        text-gray-200 font-medium hover:opacity-90 transition
                        flex items-center justify-center gap-4 cursor-pointer"
                    >
                        Lihat Semua Projek
                    </Link>
                </div>
            </div>
        </section>
    )
}