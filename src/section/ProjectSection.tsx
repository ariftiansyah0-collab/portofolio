import ProjectCard from "@/components/project/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ProjectSection() {
    const { data: projek, error } = await supabase
        .from("proyek")
        .select("*")
        .order("id", { ascending: true });

        console.log("DATA PROJEK:", projek);
        console.log("ERROR:", error);

    if (error) {
        return (
            <p className="text-red-600">
                Gagal memuat data: {error.message}
            </p>
        );
    }

    return (
        <section id="projects" className="py-24 relative text-white">
            <div className="w-[90%] max-w-6xl mx-auto space-y-12">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl bg-primary/10" />

                <SectionHeader
                    title="Beberapa karya terbaru"
                    highlight="saya"
                    badge="projects"
                    description="Pilihan proyek yang menampilkan kemampuan saya dalam merancang,
                    membangun, dan mengembangkan skala aplikasi full-stack modern."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {projek?.map((item) => (
                        <ProjectCard
                            key={item.id}
                            id={item.id}
                            title={item.judul}
                            description={item.deskripsi}
                            image={item.gambar}
                            tags={item.teknologi}
                            liveURL={item.link}
                            githubURL={item.githubURL}
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
    );
}