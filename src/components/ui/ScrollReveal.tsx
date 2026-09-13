"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

type ScrollRevealProps = {
  children: ReactNode
  className?: string
}

export default function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.15,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
        }
        ${className}
      `}
    >
      {children}
    </div>
  )
}