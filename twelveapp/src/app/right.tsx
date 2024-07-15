"use client"
import React, { useState } from 'react';
import { Image, Avatar, Spacer } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/skeleton";

type RightComponentProps = {
    formSubmitted: boolean;
};

const RightComponent: React.FC<RightComponentProps> = ({ formSubmitted }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="flex flex-col pt-24 px-20 h-full p-4 bg-white">
            {/* Banner */}
            <div className="w-full h-[400px] relative overflow-hidden transition-transform duration-300 hover:scale-[101%] shadow-lg rounded-xl">
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



            {/* Headers */}
            <Spacer y={8} />
            <div className='flex items-center'>
                {formSubmitted ? (
                    <>
                        <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                        <div className='ml-2 text-gray-500'>
                            <h3>Made by User9932</h3>
                            <h3>12 min read • July 4th, 2024</h3>
                        </div>
                    </>
                ) : (
                    <>
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div className='ml-2 space-y-2'>
                            <Skeleton className="h-4 rounded w-24" />
                            <Skeleton className="h-4 rounded w-36" />
                        </div>
                    </>
                )}
            </div>

            {/* Content */}
            <Spacer y={8} />
            {formSubmitted ? (
                <>
                    <h2 className="text-5xl font-semibold mb-4">
                        Title Component
                    </h2>
                    <div>
                        <p className="text-gray-600 mb-2">
                            This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.
                            This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.
                            This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.
                            This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.
                        </p>
                        <p className="text-gray-600 mb-2">
                            This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.
                            This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.
                            This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.
                            This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <Skeleton className="h-12 rounded w-3/4 mb-4" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 rounded" />
                        <Skeleton className="h-4 rounded" />
                        <Skeleton className="h-4 rounded" />
                        <Skeleton className="h-4 rounded" />
                        <Skeleton className="h-4 rounded w-5/6" />
                    </div>
                </>
            )}
        </div>
    );
};

export default RightComponent;
