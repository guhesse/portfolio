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
        <div className={cn("flex flex-col gap-5", alignment, className)}>
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                {eyebrow}
            </span>
            <h2 className="max-w-xl text-balance font-display text-[1.7rem] font-normal leading-[1.15] text-foreground sm:text-[2rem]">
                {title}
            </h2>
            {description ? (
                <p className="max-w-md text-[14px] leading-7 text-muted-foreground">
                    {description}
                </p>
            ) : null}
        </div>
    )
}
