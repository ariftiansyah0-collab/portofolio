"use client";

import { useRouter } from "next/navigation";
import { div } from "three/tsl";

export default function BackButton() {
    const router = useRouter();

    return (
        <div>
            <button
                onClick={() => router.back()}
                className="px-8 py-3 rounded-full bg-primary text-gray-200 font-medium hover:opacity-90 transition 
                flex items-center justify-center gap-4 cursor-pointerr">
                ← Kembali
            </button>
        </div>
    );
}