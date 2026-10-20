import Logo from "@/components/navbar/Logo";
import Link from "next/link";
import { LuGithub, LuInstagram, LuYoutube, LuContact } from "react-icons/lu";

export default function Footer() {
    return (
        <footer className="relative">
            <div className="w-[90%] max-w-6xl mx-auto py-14 space-y-10 relative
            z-10">
                {/* top section */}
                <div className="flex flex-col items-center text-center gap-8 md:flex-row md:items-start md:justify-between
                md:text-left">
                    <div className="space-y-3 max-w-xs">
                        <div
                            className="flex justify-center md:justify-start scroll-reveal"
                            style={{ animationDelay: "0ms" }}
                        >
                            <Logo/>
                        </div>
                        <p
                            className="text-sm text-gray-300 scroll-reveal"
                            style={{ animationDelay: "120ms" }}
                        >
                            Membangun pengalaman web modern dan skalabel dengan kode yang bersih serta desain yang matang. 
                        </p>
                    </div>

                    {/* social  */}
                    <div className="flex items-center gap-4">
                        {[
                            { icon: LuGithub, href:"https://github.com/ariftiansyah0-collab"},
                            { icon: LuYoutube, href:"https://www.youtube.com/@_FAJRIEL23"},
                            { icon: LuInstagram, href:"https://www.instagram.com/_fajrielyangitu/"},
                        ].map((item, index) => {
                            const IconComponent = item.icon;

                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="scroll-reveal w-10 h-10 rounded-full flex items-center justify-center border border-border text-gray-300 hover:text-primary hover:shadow-[0_0_20px_rgba(32,178,166,0.2)] transition-all duration-300"
                                    style={{ animationDelay: `${240 + index * 120}ms` }}
                                >
                                    <IconComponent className="w-5 h-5" />
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div
                    className="h-px bg-border scroll-reveal"
                    style={{ animationDelay: "600ms" }}
                />
                    {/* bottom footer */}

                    <p
                        className="text-center text-gray-400 text-sm scroll-reveal"
                        style={{ animationDelay: "720ms" }}
                    >
                        &copy; {new Date().getFullYear()} fajrieldev. All rights reserved
                    </p>
            </div>
        </footer>
    )
}