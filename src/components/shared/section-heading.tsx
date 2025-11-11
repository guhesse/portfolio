import { type ReactNode } from "react"

import { cn } from "@/lib/utils"

interface SectionHeadingProps {
    eyebrow: string
    title: ReactNode
    description?: ReactNode
    align?: "left" | "center"
    className?: string
}

export function SectionHeading({
    eyebrow,
    title,
    description,
    align = "left",
    className,
}: SectionHeadingProps) {
    const alignment = align === "center" ? "items-center text-center" : "text-left"

    return (
        <div className={cn("flex flex-col gap-4", alignment, className)}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-muted-foreground">
                {eyebrow}
            </span>
            <h2 className="max-w-3xl text-balance font-display text-3xl font-normal leading-tight text-foreground sm:text-4xl">
                {title}
            </h2>
            {description ? (
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {description}
                </p>
            ) : null}
        </div>
    )
}
