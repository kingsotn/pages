import React from 'react';
import { Listbox, ListboxItem, Skeleton } from "@nextui-org/react";

interface TableOfContentsProps {
    items: string[];
    onItemClick: (sectionId: string) => void;
    isLoaded: boolean;
    skeletonCount: number;
    className?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
    items,
    onItemClick,
    isLoaded,
    skeletonCount,
    className = ""
}) => {
    return (
        <div className={`w-64 ${className}`}>
            {isLoaded ? (
                <Listbox
                    aria-label="Table of Contents"
                    onAction={(key) => onItemClick(key.toString())}
                    className="p-0"
                    itemClasses={{
                        base: "px-3 py-2 data-[hover=true]:bg-default-100 rounded-lg",
                    }}
                >
                    {items.map((item) => (
                        <ListboxItem key={item} className="text-left">
                            {item}
                        </ListboxItem>
                    ))}
                </Listbox>
            ) : (
                <div className="space-y-2">
                    {Array.from({ length: skeletonCount }).map((_, index) => (
                        <Skeleton key={index} className="h-8 w-full rounded" />
                    ))}
                </div>
            )}
        </div>
    );
};