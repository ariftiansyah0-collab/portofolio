import { GridScan } from "@/components/hero/background";
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
                <GridScan
                    sensitivity={0.55}
                    lineThickness={1}
                    linesColor="#6366F1"
                    gridScale={0.2}
                    scanColor="#1A43BF"
                    scanOpacity={0.2}
                    enablePost
                    bloomIntensity={0.9}
                    chromaticAberration={0.002}
                    noiseIntensity={0.01}
                    lineJitter={0.1}
                    scanGlow={0.7}
                    scanSoftness={2}
                    enableWebcam={false}
                    showPreview={false}
                />
            </div>
            {/* content */}
            <div className="relative z-10 w-[90%] mx-auto grid grid-cols-1
            lg:grid-cols-2 gap-6 items-center">
                {/* leftside */}
                <div className="space-y-6">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10
                    text-primary text-sm border border-border">Full Stack Developer ~ Next.js Specialist
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-text">
                        Building modern web experiences with <span className="text-primary">Clean Code</span>
                    </h1>

                    <p className="text-gray-400 max-w-lg tracking-wide">
                        design and build scalable fullstack applications using modern
                        technologies like Next.js, TypeScript, and Supabae. Focused on perfomance, clean UI, and real-world
                        products.
                    </p>

                    <div className="flex items-center gap-4 pt-2">
                        <LinkButton text="Get in touch" href="#contact" rounded icon= 
                        {LuArrowRight}/>
                        <LinkButton text="View projects" href="#projects" rounded variant="primary" />
                    </div>
                </div>
                {/* rightside */}
                <div className="flex justify-center lg:justify-end">
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