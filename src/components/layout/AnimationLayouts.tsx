"use client";

import { useEffect } from "react"   
import 'aos/dist/aos.css'; 
import AOS from "aos";

export default function AnimationLayout({children}:{children:React.ReactNode}) {

    useEffect(() => {
        const initAOS = async () => {
            await import ("aos");
            AOS.init({
                duration:1000,
                easing:"ease",
                once:true,
                anchorPlacement:"top-bottom"
            })
        }

        initAOS();
    },[]);
    return <>{children}</>
}