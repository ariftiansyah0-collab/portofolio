'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

type AdminSidebarProps = {
    email: string | undefined;
    logoutAction: (formData: FormData) => void | Promise<void>;
};

export default function AdminSidebar({ email, logoutAction }: AdminSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="lg:contents">
            <div className="flex h-16 items-center justify-between border-b border-border bg-surface px-4 lg:hidden">
                <span className="text-sm font-bold text-text">Dashboard</span>
                <button
                    type="button"
                    aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
                    aria-expanded={isOpen}
                    aria-controls="admin-sidebar"
                    onClick={() => setIsOpen(!isOpen)}
                    className="grid h-10 w-10 place-items-center rounded-md border border-border text-xl text-text transition-colors hover:bg-card"
                >
                    {isOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
                </button>
            </div>

            {isOpen && (
                <button
                    type="button"
                    aria-label="Tutup navigasi"
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                />
            )}

            <aside
                id="admin-sidebar"
                className={`${isOpen ? 'flex translate-x-0' : 'hidden -translate-x-full'} fixed inset-y-0 left-0 z-50 w-[min(82vw,280px)] flex-col border-r border-border bg-surface px-4.5 pb-5 pt-7.5 text-text transition-transform duration-200 lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:w-auto lg:translate-x-0 lg:transition-none`}
            >
                <div className="flex items-center justify-between gap-2">
                    <Link
                        href="/admin/proyek"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-2 text-inherit no-underline"
                    >
                        <span className="grid h-10.5 w-10.5 place-items-center rounded-[12px_12px_12px_4px] bg-primary text-[17px] font-extrabold text-text" aria-hidden="true">
                            A
                        </span>
                        <span>
                            <span className="block text-[14px] font-bold">Dashboard</span>
                            <span className="font-semibold">FAJRIELDev</span>
                        </span>
                    </Link>
                    <button
                        type="button"
                        aria-label="Tutup navigasi"
                        onClick={() => setIsOpen(false)}
                        className="grid h-9 w-9 place-items-center rounded-md border border-border text-lg text-text lg:hidden"
                    >
                        <FiX aria-hidden="true" />
                    </button>
                </div>

                <nav aria-label="Navigasi dashboard" className="mt-11.5 grid gap-1.5">
                    <Link
                        href="/admin/proyek"
                        aria-current="page"
                        onClick={() => setIsOpen(false)}
                        className="flex min-h-10.5 items-center gap-3 rounded-[7px] border border-border bg-surface px-3 text-[13px] text-text no-underline transition-colors"
                    >
                        <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                        Manajemen Proyek
                    </Link>
                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="flex min-h-10.5 items-center gap-3 rounded-[7px] border border-transparent px-3 text-[13px] text-[#a8b0b4] no-underline transition-colors hover:bg-surface hover:text-text"
                    >
                        <span className="h-2 w-2 rounded-full border border-[#a8b0b4] bg-transparent" aria-hidden="true" />
                        Lihat Portofolio
                    </Link>
                </nav>

                <div className="mt-auto border-t border-border pt-4.5">
                    <p className="truncate text-[11px] text-[#a8b0b4]" title={email}>
                        {email}
                    </p>
                    <form action={logoutAction}>
                        <button type="submit" className="mt-3 bg-transparent p-0 text-[12px] text-[#a8b0b4] transition-colors hover:text-text">
                            Keluar dari akun
                        </button>
                    </form>
                </div>
            </aside>
        </div>
    );
}