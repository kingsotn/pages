"use client"
import React, { useState } from 'react';
import { Image, Avatar, Spacer } from "@nextui-org/react";

type RightComponentProps = {
    formSubmitted: boolean;
};

const RightComponent: React.FC<RightComponentProps> = ({ formSubmitted }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="flex flex-col pt-24 px-40 h-full border border-gray-300 p-4 bg-white">
            <div className="w-full min-w- h-[300px]! relative overflow-hidden transition-transform duration-300 hover:scale-[101%] shadow-lg rounded-xl">


                {(isLoading || !formSubmitted) && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl" />
                )}
                <Image
                    src="https://app.requestly.io/delay/1000/https://images.wallpaperscraft.com/image/single/city_aerial_view_road_156925_2560x1024.jpg"
                    alt="Banner Image"
                    classNames={{
                        wrapper: "w-full min-w-full",
                        img: "w-full! min-w-full object-none object-cover min-h-[300px] max-h-[300px]"
                    }}
                    style={{
                        opacity: isLoading || !formSubmitted ? 0 : 1,
                        transition: 'opacity 0.3s ease-in-out'
                    }}
                    onLoad={() => setIsLoading(false)}
                />
            </div>
            <Spacer y={8} />
            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            <h2 className="text-5xl font-semibold mb-4">
                Title Component
            </h2>
            <p className="text-gray-600 mb-2">
                This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.
                This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.
                This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.
                This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.
                This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.
                This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.
                This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.
            </p>
            <p className="text-gray-600 mb-2">
                You can place any content you want here. This mock is to illustrate the structure and layout.
            </p>
        </div>
    );
};

export default RightComponent;