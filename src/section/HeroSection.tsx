import LinkButton from "@/components/ui/LinkButton";
import Image from "next/image";
import { LuArrowRight } from "react-icons/lu";
import CRTWarp from "@/components/CRTWarp";

export default function HeroSection() {
    return (
        <section id="home" className="relative min-h-screen overflow-hidden bg-background flex
        items-center pt-30 py-10">

            <div className="absolute inset-0 z-0">
                <CRTWarp
                    className="h-full w-full"
                    color="#526b8a"
                    backgroundColor="#0b1017"
                    mask="aperture"
                    curvature={0.25}
                    persistence={0.4}
                    lightMode={false}
                    speed={0.5}
                    variation={0}
                    waveAmplitude={0.22}
                    waveFrequency={2.5}
                    levels={3}
                    columns={80}
                    corners={0}
                    scanlineStrength={0.4}
                    scanlineFrequency={200}
                    maskStrength={0.2}
                    bloom={0.6}
                    bloomRadius={1}
                    rgbShift={0.003}
                    noise={0.04}
                    flicker={0.05}
                    interference={0.08}
                    vignette={0.3}
                    brightness={0.7}
                    intro
                    mouseReact
                    mouseStrength={0.5}
                    changeOnClick
                    dpr={2}
                    paused={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b1017]/70 via-[#0b1017]/35 to-[#0b1017]/15" />
            </div>

            {/* content */}
            <div className="relative z-10 w-[90%] mx-auto grid grid-cols-1
            lg:grid-cols-2 gap-6 items-center">
                {/* leftside */}
                <div className="space-y-6">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10
                    text-primary text-sm border border-border">Full Stack Developer ~ Spesialis Next.js
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-text">
                        Membangun pengalaman web modern dengan <span className="text-primary">Clean Code</span>
                    </h1>

                    <p className="text-gray-400 max-w-lg tracking-wide">
                        Merancang dan membangun aplikasi FullStack yang skalabel menggunakan teknologi modern seperti Next.js,
                        TypeScript, dan Supabase. Berfokus pada performa, antarmuka pengguna (UI) yang bersih, dan produk nyata.
                    </p>

                    <div className="flex items-center gap-4 pt-2">
                        <LinkButton text="Hubungi saya" href="#contact" rounded icon=
                            {LuArrowRight} />
                        <LinkButton text="Lihat Project saya" href="#projects" rounded variant="primary" />
                    </div>
                </div>
                {/* rightside */}
                <div className="flex justify-center lg:justify-end">
                    <div className="relative w-85 h-85 md:w-110 md:h-110
                        rounded-full surface/80 backdrop-blur-md overflow-hidden
                        border border-border flex items-center justify-center">
                        {/* Image glow */}
                        <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
                        <Image
                            fill src="/images/about.jpeg"
                            alt="profile"
                            className="z-20 rounded-full object-cover"
                            sizes="(max-width: 1024px) 340px, 440px"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}