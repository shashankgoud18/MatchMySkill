import React from 'react';
import { cn } from "../../lib/utils"

export default function UniqueLoading({
    variant = "morph",
    size = "md",
    className,
}) {
    const containerSizes = {
        sm: "w-16 h-16",
        md: "w-24 h-24",
        lg: "w-32 h-32",
    }

    if (variant === "morph") {
        return (
            <div className={cn("relative", containerSizes[size], className)}>
                <div className="absolute inset-0 flex items-center justify-center">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            // Changed color from bg-black dark:bg-white to bg-brand-500
                            className="absolute w-4 h-4 bg-brand-500 rounded-sm shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                            style={{
                                animation: `morph-${i} 2s infinite ease-in-out`,
                                animationDelay: `${i * 0.2}s`,
                            }}
                        />
                    ))}
                </div>
            </div>
        )
    }

    return null
}
