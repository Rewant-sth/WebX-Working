import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and merges Tailwind class names intelligently.
 * Usage: cn("bg-red-500", isActive && "text-white")
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
