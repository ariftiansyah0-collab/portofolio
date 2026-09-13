"use client"

import { useEffect, useState } from "react"
import { LuDownload, LuMenu, LuX } from "react-icons/lu"
import Logo from "./Logo"
import Link from "next/link"
import LinkButton from "../ui/LinkButton"
import MobileNav from "./MobileNav"

export const navLinks = [
    { href: "#home", label: "Beranda" },
    { href: "#about", label: "Tentang saya" },
    { href: "#projects", label: "Projek" },
    { href: "#experience", label: "Pengalaman" },
    { href: "#contact", label: "Kontak" },

]
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        }

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    return (
        <>
        <nav className={`fixed top-0 left-0 w-full z-100 transition-all duration-300 ${scrolled ? "backdrop-blur-xl" : "bg-transparent"}`} >
            <div className="w-[95%] lg:w-[90%] mx-auto h-16 flex items-center
            justify-between">
                <Logo />
                {/* Desktop Nav */}
                <ul className="hidden lg:flex items-center gap-1 py-2.5 px-1
                rounded-full bg-surface/60 backdrop-blur-xl border border-border text-text">
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <Link href={link.href} className="px-4 py-2 rounded-full text-sm 
                            font-medium text-gray-300 transition-all duration-300 hover:text-primary hover:bg-surface">
                                {link.label}
                            </Link>
                        </li>
                    ))} 
                </ul>
                <div className="hidden lg:block">
                    <LinkButton iconPosition="left" icon={LuDownload} text="download CV" rounded href="/documents/cv (2).pdf"/>
                </div>
                <button
                    type="button"
                    aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={navOpen}
                    onClick={() => setNavOpen((open) => !open)}
                    className="relative z-70 lg:hidden p-2 text-white hover:text-primary"
                >
                    {navOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />} 
                </button>
            </div>
        </nav>

        <MobileNav navOpen={navOpen}/>        
        </>
    )
}
