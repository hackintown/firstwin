import React from "react";
import { categoryItems } from './categoryData'

export default function CategoryTab() {
    return (
        <div className="overflow-hidden">
            <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4">
                {categoryItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex-shrink-0 snap-start flex flex-col items-center justify-center cursor-pointer px-2"
                    >
                        <div className="w-14 h-14 mx-auto overflow-hidden mb-1">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <span className="text-foreground text-sm font-light text-nowrap text-center block
                            group-hover:text-primary transition-colors">
                            {item.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
} 