"use client"
import React, { useState } from 'react';
import { Image } from "@nextui-org/react";
import Banner from './../../public/mountain.png'
import { Avatar, Spacer } from "@nextui-org/react";


type RightComponentProps = {
    formSubmitted: boolean;
};

const RightComponent: React.FC<RightComponentProps> = ({ formSubmitted }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="flex flex-col pt-24 px-20 h-full border border-gray-300 p-4 bg-white">
            <div className="w-full max-h-[300px] overflow-hidden">
                <div className="relative w-full h-full">
                    <Image
                        src="https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                        alt="NextUI hero Image"
                        style={{ objectFit: 'cover' }}
                        isLoading={isLoading || !formSubmitted} // load skeleton if image api hasn't loaded or form isn't submitted yet
                        onLoad={() => setIsLoading(false)}
                    />
                </div>
            </div>
            <Spacer y={8} />
            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            <h2 className="text-5xl font-semibold mb-4">
                Title Component
            </h2>
            <p className="text-gray-600 mb-2">
                This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.
            </p>
            <p className="text-gray-600 mb-2">
                You can place any content you want here. This mock is to illustrate the structure and layout.
            </p>
        </div>
    );
};

export default RightComponent;
