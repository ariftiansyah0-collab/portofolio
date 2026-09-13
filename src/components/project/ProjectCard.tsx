import { projek } from "@/app/data/projects";
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuExternalLink, LuGithub } from "react-icons/lu";

interface ProjectCardProps {
    id:string,
    title:string,
    description:string,
    liveURL?:string,
    githubURL?:string,
    image:string;
    tags:string[]
}

export default function ProjectCard({id,title,description,liveURL,githubURL,image,tags}:ProjectCardProps) {
    const router = useRouter();

    return (
        <div
        onClick={() => router.push(`/projek/${id}`)}
        className="rounded 2xl bg-surface border border-border transition-all
        duration-all duration-300
        hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
            {/* Image */}
            <div className="relative h-60 md:h-64 overflow-hidden">
                <Image src={image} alt={title} fill className="w-full h-full object-cover transition duration-500
                group-hover:scale-105" />

                <div className="absolute inset-0 bg-background/50 opacity-0
                group-hover:opacity-100 transition"/>
            </div>

            {/* contact */}
            <div className="p-6 space-y-5">
                <h3 className="text-xl font-semibold text-text
                group-hover:text-primary transition">{title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span key={tag} 
                        className="text-xs px-2.5 py-1
                        rounded-md bg-primary/10 text-primary border
                        border-border">{tag}</span>
                    ))}
                </div>
                {/*Links */}
                <div className="flex items-center gap-4 pt-3">
                    {liveURL && (
                        <Link href={liveURL} target="_blank" className="flex items-center gap-1 text-sm text-text-muted
                        hover:text-primary trasnition text-white">
                            <LuExternalLink className="w-4 h-4 text-white" />
                            Live
                        </Link>
                    )}
                    {githubURL && (
                        <Link href={githubURL} target="_blank" className="flex items-center gap-1 text-sm text-text-muted
                        hover:text-primary trasnition text-white">
                            <LuGithub className="w-4 h-4 text-white" />
                            Github
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}