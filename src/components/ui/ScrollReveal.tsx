import type { ReactNode } from "react"

type ScrollRevealProps = {
  children: ReactNode
  className?: string
}

export default function ScrollReveal({
  children,
  className = "",
}: ScrollRevealProps) {
  return (
    <div className={`scroll-reveal ${className}`}>
      {children}
    </div>
  )
}