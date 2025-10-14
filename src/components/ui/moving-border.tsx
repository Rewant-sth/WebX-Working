'use client'

import { ElementType, ComponentPropsWithoutRef } from "react"

interface StarBorderProps<T extends ElementType> {
    as?: T
    color?: string
    speed?: string
    className?: string
    children: React.ReactNode
}

export function StarBorder<T extends ElementType = "button">({
    as,
    className,
    color,
    speed = "6s",
    children,
    ...props
}: StarBorderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof StarBorderProps<T>>) {
    const Component = as || "button"
    const defaultColor = color || "#01283F"

    return (
        <div className="">
            <Component
                className={`relative inline-block py-[2px] overflow-hidden rounded-sm ${className || ''}`}
                {...props}
            >
                <style>{`
                    @keyframes star-movement-bottom {
                        0% { transform: translate(0%, 0%); opacity: 1; }
                        100% { transform: translate(-100%, 0%); opacity: 0.5; }
                    }
                    @keyframes star-movement-top {
                        0% { transform: translate(0%, 0%); opacity: 1; }
                        100% { transform: translate(100%, 0%); opacity: 0.5; }
                    }
                    .animate-star-movement-bottom {
                        animation: star-movement-bottom linear infinite alternate;
                    }
                    .animate-star-movement-top {
                        animation: star-movement-top linear infinite alternate;
                    }
                `}</style>

                <div
                    className="absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0 opacity-30 dark:opacity-80"
                    style={{
                        background: `radial-gradient(circle, ${defaultColor}, #FF8A50 20%, transparent 40%)`,
                        animationDuration: speed,
                    }}
                />
                <div
                    className="absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0 opacity-30 dark:opacity-80"
                    style={{
                        background: `radial-gradient(circle, ${defaultColor}, #FF8A50 20%, transparent 40%)`,
                        animationDuration: speed,
                    }}
                />
                <div className="relative z-1 border text-foreground text-center text-base md:py-2 px-6 rounded-sm bg-white border-orange-500/30 hover:border-orange-400/50 transition-colors dark:from-zinc-900 dark:to-zinc-800 dark:border-orange-400/40 text-orange-500  font-semibold">
                    {children}
                </div>
            </Component>
        </div>
    )
}