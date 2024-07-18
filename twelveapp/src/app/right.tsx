"use client"
import React, { useState } from 'react';
import { Image, Spacer } from "@nextui-org/react";
import { Avatar } from '@nextui-org/avatar';
import { Skeleton } from "@nextui-org/skeleton";
import { Gist, Summary } from './shit-example';
import { SeoAndTableOfContents } from './shit-example';


type RightComponentProps = {
    formSubmitted: boolean;
    gist: Gist
    summary: Summary
    seoAndTableOfContents: SeoAndTableOfContents
};


const RightComponent: React.FC<RightComponentProps> = ({ formSubmitted, gist, summary, seoAndTableOfContents }) => {
    const [isLoading, setIsLoading] = useState(true);
    const keys = Object.keys(seoAndTableOfContents);

    return (
        <div className="flex flex-col pt-24 px-20 h-full p-4 bg-white">
            {/* Banner */}
            <div className="w-full h-[400px] relative overflow-hidden transition-transform duration-300 hover:scale-[101%] shadow-lg rounded-xl min-w-[400px]">
                {isLoading && (
                    <Skeleton className="absolute inset-0 flex flex-col pt-24 px-40 min-h-[400px] max-h-[400px] p-4 rounded-xl" />
                )}
                {formSubmitted && (
                    <Image
                        // src="https://app.requestly.io/delay/0/https://images.wallpaperscraft.com/image/single/city_aerial_view_road_156925_2560x1024.jpg"
                        src="https://imgcdn.stablediffusionweb.com/2024/7/16/f7245865-804f-409c-99d3-6a3a5e672a50.jpg"
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
                        <Skeleton className="h-12 rounded w-1/2 min-w-[390px]" isLoaded={gist.title.length > 0} disableAnimation>
                            <h2 className="h-10 font-serif text-4xl font-medium w-3/4 text-osm-black min-w-[390px] text-nowrap">
                                {/*only split if it contains ":", otherwise just render the entire gist.title*/}
                                {gist.title.includes(":") ? gist.title.split(":")[1].trim() : gist.title}
                            </h2>

                        </Skeleton>
                    </>
                ) : (
                    <>
                        <Skeleton className="h-12 rounded w-1/2 min-w-[390px]" />
                    </>
                )}
            </div>

            {/* Headers */}
            <Spacer y={6} />
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
                <Skeleton className="h-32 rounded w-2/3 min-w-[500.66px]" isLoaded={summary.summary.length > 0}>
                    <div className="text-osm-black w-full space-y-8">
                        {Array.from({ length: 1 }).map((_, index) => (
                            <div key={index} className="w-full min-w-[500.66px]">
                                {summary.summary}
                            </div>
                        ))}
                    </div>
                </Skeleton>
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
