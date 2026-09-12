import ProjectCard from "@/components/project/ProjectCard"
import SectionHeader from "@/components/ui/SectionHeader"

const project = [
    {   
        title: "Sistem Iventaris",
        description: "Sistem peminjaman barang dengan dashboard interaktif — menampilkan statistik barang tersedia, sedang dipinjam, dan rusak secara real-time, lengkap dengan riwayat transaksi peminjaman.",
        image: "/images/pv1.png",
        tags: ["Next.js", "Typescript", "Supabase"],
        liveURL: "#",
        githubURL: "#"
    },
    {
        title: "Latihan Next.js v2",
        description: "Playground Next.js untuk bereksperimen dengan image optimization, analytic dashboard, dan integrasi database (Prisma & Realtime), sebagai latihan memperdalam ekosistem Next.js.",
        image: "/images/pv2.png",
        tags: ["Next.js", "Typescript", "Supabase"],
        liveURL: "#",
        githubURL: "#"
    },
    {
        title: "The MapleWood Tenant",
        description: "Seorang mahasiswi bernama Sinta yang baru pindah ke daerah Norwood karena biaya hidup yang lebih murah. Setelah berbulan-bulan mencari tempat tinggal, ia akhirnya menemukan sebuah kontrakan dengan harga yang jauh di bawah pasaran.",
        image: "/images/pv3.png",
        tags: ["Unity", "SketchFab", "C#"],
    }
]

export default function ProjectSection() {
    return (
        <section id="projects" className="py-24 relative text-white">
                <div className="w-[90%] max-w-6xl mx-auto space-y-12">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl bg-primary/10" 
                />
            <SectionHeader 
            title="Beberapa karya terbaru" 
            highlight="saya" 
            badge="projects" 
            description="Pilihan proyek yang menampilkan kemampuan saya dalam merancang,
            membangun, dan mengembangkan skala aplikasi full-stack modern." />
                
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {project.map((project,index) => (
                    <ProjectCard {...project} key={index}/>
                ))}
            </div>
            </div>
        </section>
    )
}``