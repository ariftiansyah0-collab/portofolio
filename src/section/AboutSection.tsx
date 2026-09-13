"useClient";

import ScrollReveal from "@/components/ui/ScrollReveal"
import Image from "next/image"
import { LuCode, LuDatabase, LuGamepad, LuRocket, LuUniversity } from "react-icons/lu"

export default function AboutSection() {
    return (
        <section id="about" className="py-24 overflow-hidden relative">        
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl bg-primary/10"/>
            <div className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Leftside */}
                <div data-aos="fade-right" className="flex justify-center lg:justify-start">
                    <div className="relative w-85 md:w-120 md:h-120 rounded-xl bg-surface/80 backdrop-blur-md border
                    border-border flex items-center justify-center">
                        <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-2xl" />

                        <div className="w-[85%] h-[85%] relative">
                            <Image
                                fill
                                src="/images/about.jpeg"
                                alt="About Me"
                                className="z-10 object-cover rounded-xl"
                            />
                        </div>
                    </div>
                </div>

                {/* RightSide */}
                <div className="space-y-6">
                    <span data-aos="fade" className="text-sm text-primary bg-primary/10 px-4 py-1.5
                    rounded-full border border-border inline-block">Tentang saya
                    </span>

                    <h2 data-aos="fade-left" data-aos-delay="200" className="text-3xl md:text-4xl font-bold text-text leading-tight ">
                    Membangun aplikasi web yang skalabel dan berorientasi pada pengguna.
                    </h2>
                    <p data-aos="fade-left" data-aos-delay="300" className="text-gray-400 max-w-xl">  Saya adalah pengembang FullStack yang berspesialisasi
                        dalam Next.js dan teknologi web modern. Saya senang membangun aplikasi yang cepat, dapat
                        diskalakan, dan memiliki tampilan bersih untuk memecahkan masalah di dunia nyata. Fokus saya
                        adalah menulis kode yang mudah dikelola serta menghadirkan pengalaman pengguna yang mulus.
                    </p>
                    <p data-aos="fade-left" data-aos-delay="300" className="text-gray-400 max-w-xl">
                    Seiring berjalannya waktu, saya telah bekerja menggunakan berbagai alat seperti TypeScript, Supabase, dan sistem UI 
                    modern untuk membuat proyek yang fungsional sekaligus siap untuk tahap produksi.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                        <div data-aos="fade-up" className="p-4 rounded-xl bg-surface border border-border text-center">
                            <LuCode className="mx-auto mb-2 text-primary w-6-h-6" />
                            <p className="text-text text-sm">Clean Code</p>
                        </div>
                        <div data-aos="fade-up" data-aos-delay="200" className="p-4 rounded-xl bg-surface border border-border text-center">
                            <LuDatabase className="mx-auto mb-2 text-primary w-6-h-6" />
                            <p className="text-text text-sm">Aplikasi Full-stacks</p>
                        </div>
                        <div data-aos="fade-up" data-aos-delay="300" className="p-4 rounded-xl bg-surface border border-border text-center">
                            <LuRocket className="mx-auto mb-2 text-primary w-6-h-6" />
                            <p className="text-text text-sm">Peforma</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}