import Aurora from "@/components/hero/background";
import LinkButton from "@/components/ui/LinkButton";
import Image from "next/image";
import { LuArrowRight } from "react-icons/lu";


export default function HeroSection() {
    return (
        <section id="home" className="relative min-h-screen overflow-hidden flex
        items-center pt-30 py-10">

            {/* background glow */}
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-80 h-80rounded-full blur-3xl bg-primary/10"/>
            {/*background*/}
            <div className="inset-0 absolute">
                <Aurora
                    colorStops={["#072d9d","#012e62","#123499"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={1}
                    />
            </div>
            {/* content */}
            <div className="relative z-10 w-[90%] mx-auto grid grid-cols-1
            lg:grid-cols-2 gap-6 items-center">
                {/* leftside */}
                <div className="space-y-6">
                    <span data-aos="fade-up" className="inline-block px-4 py-1.5 rounded-full bg-primary/10
                    text-primary text-sm border border-border">Full Stack Developer ~ Spesialis Next.js
                    </span>
                    <h1 data-aos="fade-up" data-aos-delay="200" className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-text">
                       Membangun pengalaman web modern dengan <span className="text-primary">Clean Code</span>
                    </h1>

                    <p data-aos="fade-up" data-aos-delay="300" className="text-gray-400 max-w-lg tracking-wide">
                        Merancang dan membangun aplikasi FullStack yang skalabel menggunakan teknologi modern seperti Next.js,
                         TypeScript, dan Supabase. Berfokus pada performa, antarmuka pengguna (UI) yang bersih, dan produk nyata.
                    </p>

                    <div className="flex items-center gap-4 pt-2" data-aos="fade-up" data-aos-delay="600">
                        <LinkButton text="Hubungi saya" href="#contact" rounded icon= 
                        {LuArrowRight}/>
                        <LinkButton text="Lihat Project saya" href="#projects" rounded variant="primary" />
                    </div>
                </div>
                {/* rightside */}
                <div data-aos="fade-left" data-aos-delay="400" className="flex justify-center lg:justify-end">
                    <div className="relative w-85 h-85 md:w-110 md:h-110
                        rounded-full surface/80 backdrop-blur-md overflow-hidden
                        border border-border flex items-center justify-center">
                        {/* Image glow */}
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"/>
                        <Image fill src="/images/about.jpeg" alt="profile" className="z-20 rounded-full object-cover"/>
                    </div>
                </div>
            </div>
        </section>
    )
}