"use client"

import SectionHeader from "@/components/ui/SectionHeader";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuMail, LuMapPin, LuPhone, LuSend } from "react-icons/lu";

const contactInfo = [
    {
        icon: LuMail,
        label: "Email",
        value: "ariftiansyah@gmail.com",
        href: "mailto:emanuel@example.com",
    },
    {
        icon: LuPhone,
        label: "Kontak",
        value: "+62 895 0449 0059",
        href: "tel:+234XXXXXXXXXX",
    },
    {
        icon: LuMapPin,
        label: "Jawa Timur, Kab Pasuruan",
        value: "Indonesian",
        href: "#",
    },
];

export default function ContactSection() {
    const [loading,setLoading] = useState(false);
    const onSubmit = async (event:React.SubmitEvent) => {
        event.preventDefault();
        setLoading(true)

        const formData = new FormData(event.target);
        formData.append("access_key", "0212fbd2-9f08-41bd-b84b-5eb536c356d9");

        const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
        });

        const data = await response.json();
        if (data.success) {
        toast.success("Form submitting succes")
        event.target.reset();
        } else {
        toast.error("Error submitting form")

        }

        setLoading(false);
    };
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="w-[90%] max-w-6xl mx-auto relative z-10 space-y-16">
                <div className="absolute top-1/3 right-1/4 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl bg-primary/10" />
                <SectionHeader
                    title="Mari kita ciptakan"
                    highlight="sesuatu yang hebat"
                    badge="Contact"
                    description="Punya rencana proyek? Saya ingin sekali mendengarnya. Mari terhubung."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* left - form */}
                    <form onSubmit={onSubmit} className="p-6 rounded-2xl bg-surface border-border space-y-5">
                        <h3 className="text-lg font-semibold text-text">Kirim Pesan</h3>
                        {/* name */}
                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Nama</label>
                            <input type="text" required placeholder="Nama kamu"
                            name="name"
                                className="w-full px-4 py-2 rounded-lg
                                bg-background border border-border
                                text-text outline-none
                                focus:border-primary transition"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-1">Email</label>
                            <input
                            name="email"
                                type="text"
                                required placeholder="Your Email"
                                className="w-full px-4 py-2 rounded-lg
                                  bg-background border border-border text-text outline-none focus:border-primary transition"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Pesan</label>
                            <textarea name="message" required rows={4} placeholder="Tulis Pesan"
                            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-text outline-none focus:border-primary transition resize-none"
                        />
                        </div>
                        <button disabled={loading} type="submit" className="w-full py-3 rounded-full bg-primary
                        text-gray-200 font-medium hover:opacity-90 transition flex items-center justify-center gap-2
                        cursor-pointer">
                            {loading ? <>
                            <span className="w-6 h-6 border-3 border-white/30 border-t white rounded-full animate-spin"></span>
                            Proses mengirim...</> : <>
                            Kirim Pesan
                            <LuSend className="w-4 h-4"/></>}
                        </button>
                    </form>
                    <div className="p-2">
                        <h3 className="text-xl font-semibold mb-6 text-text">Kontak Informasi</h3>
                        <div className="space-y-4">
                            {contactInfo.map((item,index) => (
                                <a href={item.href} key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface transition-colors group">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
                                    transition-colors">
                                        <item.icon className="w--5 h-5 text-primary"/>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm">
                                            {item.label}
                                        </div>
                                        <div className="font-semibold text-amber-50 ">
                                            {item.value}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}