"use client"
import React, { useState } from 'react';
import { Image, Avatar, Spacer } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/skeleton";

type RightComponentProps = {
    formSubmitted: boolean;
};

const RightComponent: React.FC<RightComponentProps> = ({ formSubmitted }) => {
    const [isLoading, setIsLoading] = useState(true);
    const mockText = "This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.";

    return (
        <div className="flex flex-col pt-24 px-20 h-full p-4 bg-white">
            {/* Banner */}
            <div className="w-full h-[400px] relative overflow-hidden transition-transform duration-300 hover:scale-[101%] shadow-lg rounded-xl min-w-[400px]">
                {isLoading && (
                    <Skeleton className="absolute inset-0 flex flex-col pt-24 px-40 min-h-[400px] max-h-[400px] p-4 rounded-xl" />
                )}
                {formSubmitted && (
                    <Image
                        src="https://app.requestly.io/delay/0/https://images.wallpaperscraft.com/image/single/city_aerial_view_road_156925_2560x1024.jpg"
                        alt="Banner Image"
                        classNames={{
                            wrapper: "w-full min-w-full min-h-[400px] max-h-[400px]",
                            img: "w-full! min-w-full object-none object-cover min-h-[400px] max-h-[400px]"
                        }}
                        style={{
                            opacity: isLoading ? 0 : 1,
                            transition: 'opacity 0.3s ease-in-out'
                        }}
                        onLoad={() => setIsLoading(false)}
                    />
                )}
            </div>

            {/* Title */}
            <Spacer y={8} />
            <div>
                {formSubmitted ? (
                    <>
                        <h2 className="h-10 font-serif text-5xl font-medium w-1/2 text-osm-black min-w-[390px] text-nowrap">
                            Title Component
                        </h2>
                    </>
                ) : (
                    <>
                        <Skeleton className="h-16 rounded w-1/2 min-w-[390px]" />
                    </>
                )}
            </div>

            {/* Headers */}
            <Spacer y={8} />
            <div className="flex items-center text-nowrap">
                {formSubmitted ? (
                    <>
                        <Avatar src="https://pbs.twimg.com/profile_images/1793883194002931712/MNIuuV5p_400x400.jpg" className='w-10 h-10 rounded-full min-w-10' />
                        <div className="ml-2 text-gray-500 text-sm">
                            <h3>Made by <a href="https://twitter.com/ahiajsbwks" className='underline ' target='_blank'>Kingston</a></h3>
                            <h3>12 min read • July 4th, 2024</h3>
                        </div>
                    </>
                ) : (
                    <>
                        <Skeleton className="w-10 h-10 rounded-full min-w-10" />
                        <div className="ml-2 space-y-2">
                            <Skeleton className="h-4 rounded w-24" />
                            <Skeleton className="h-4 rounded w-36" />
                        </div>
                    </>
                )}
            </div>

            {/* Content */}
            <Spacer y={8} />
            {formSubmitted ? (
                <div className="flex flex-col space-y-4 text-osm-black">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="min-w-1/6 max-w-3/4 w-2/3 min-w-[430px]">
                            {mockText}
                            {mockText}
                            {mockText}
                            {mockText}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col space-y-4">
                    <Skeleton className="h-32 rounded w-2/3 min-w-[430px]" />
                    <Skeleton className="h-32 rounded w-2/3 min-w-[430px]" />
                    <Skeleton className="h-32 rounded w-2/3 min-w-[430px]" />
                    <Skeleton className="h-32 rounded w-2/3 min-w-[430px]" />
                    <Skeleton className="h-32 rounded w-2/3 min-w-[430px]" />
                </div>
            )}
        </div>
    );
};

export default RightComponent;
