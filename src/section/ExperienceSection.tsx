import SectionHeader from "@/components/ui/SectionHeader"

const experiences = [
    {
        role: "Fullstack Engineer",
        company: "Independent Projects",
        period: "2026 - Present",
        description: "Merancang dan membangun aplikasi web siap produksi dengan fokus pada skalabilitas, performa, dan arsitektur yang bersih. Mengimplementasikan sistem autentikasi, dasbor, dan integrasi API.",
        technologies: ["Next.js", "TypeScript", "Drizzle ORM", "PostgreSQL", "Zod"],
    },
    {
        role: "Game Developer",
        company: "Personal Project",
        period: "2025 - Present",
        description: "Belajar dan bereksperimen dengan Unity di level kode — membangun sistem gameplay berbasis trigger seperti collider interaction, coroutine, dan boolean flag untuk mekanik first-person controller.",
        technologies: ["Unity", "C#", "Game Mechanics"],
    },
    {
        role: "Web Development",
        company: "Self-Taught",
        period: "2025",
        description: "Memulai perjalanan sebagai developer dengan mempelajari fundamental web development, lalu memperdalam ekosistem Next.js — termasuk image optimization, integrasi database (Prisma), dan realtime data.",
        technologies: ["JavaScript", "React", "Next.js"],
    },
]

export default function ExperienceSection() {
    return (
        <section id="experience" className="py-32 relative overflow-hidden text-primary">
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl bg-primary/10"/>
                <div className="container mx-auto px-6 relative z-10">
                    <SectionHeader 
                    title="Experience that" 
                    highlight="speaks volume" 
                    badge="Experience" 
                    description=" A timeline of my growth as a developer, 
                    from learning the fundamental to building fullstack applications."
                    />

                    <div className="relative mt-14">
                        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5
                        bg-linear-to-b from-primary/70 via-primary/30 to-transparent md:-translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]"/>
                        <div className="space-y-12">
                            {experiences.map((exp,index) => (
                                <div key={index} className="relative grid md:grid-cols-2 gap-8">
                                    <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary
                                        rounded-full -translate-x-1/2 ring-4 ring-background z-10">
                                        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"/>
                                    </div>
                                    {/* content */}
                                    <div className={`pl-9 md:pl-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"}`}>
                                        <div className="p-6 rounded-2xl border border-primary/30 bg-card/70 hover:border-primary/50
                                        transition-all duration-500">
                                            <span className="text-primary text-sm font-medium">{exp.period}</span>
                                            <h3 className="mt-2 text-xl font-semibold text-text">{exp.role}</h3>
                                            <p className="mt-1 text-sm text-primary/80">{exp.company}</p>
                                            <p className="mt-4 text-gray-400 leading-relaxed">{exp.description}</p>
                                            <div className={`mt-5 flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                                                {exp.technologies?.map((technology) => (
                                                    <span key={technology} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">
                                                        {technology}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
        </section>
    )
}