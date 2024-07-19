"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Image, Spacer } from "@nextui-org/react";
import { Avatar } from '@nextui-org/avatar';
import { Skeleton } from "@nextui-org/skeleton";
import { Gist, Summary } from '../../pages/api/twelvelabs';
import { SeoAndTableOfContents } from '../../pages/api/groq';
import { TableOfContents } from './tableOfContents';
import RegeneratePopover from './RegeneratePopover';
import { fetchGroqData, GroqResponse } from './api-calls';


type RightComponentProps = {
    formSubmitted: boolean;
    gist: Gist
    summary: Summary
    seoAndTableOfContents: SeoAndTableOfContents
    videoUrl: string
    sectionCount: number
};

export type RegeneratedData = {
    new_title: string;
    new_content: string;
};

const RightComponent: React.FC<RightComponentProps> = ({ formSubmitted, gist, summary, seoAndTableOfContents, videoUrl, sectionCount }) => {
    const [isLoading, setIsLoading] = useState(true);
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [regeneratedTitles, setRegeneratedTitles] = useState<{ [key: number]: string }>({});
    const [regeneratedContents, setRegeneratedContents] = useState<{ [key: number]: string }>({});
    const [popoverPrompt, setPopoverPrompt] = useState<string>("");

    const scrollToSection = (sectionId: string) => {
        sectionRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth' });
    };

    const setRef = (el: HTMLDivElement | null, key: string) => {
        if (key) {
            sectionRefs.current[key] = el;
        }
    };

    const handleRegenerate = async (index: number, prev_title: string, prev_content: string) => {
        setIsRegenerating(true);
        try {
            // const response = await fetchGroqData(videoUrl, "regenerate", prev_title, prev_content, popoverPrompt);
            const response = { "new_title": "mock title", "new_content": "mock content" }

            setRegeneratedTitles(prev => ({
                ...prev,
                [index]: response.new_title
            }));
            setRegeneratedContents(prev => ({
                ...prev,
                [index]: response.new_content
            }));

        } catch (error) {
            console.error("Error regenerating content:", error);
        } finally {
            setIsRegenerating(false);
        }
    };

    useEffect(() => {
        console.log("Updated regenerated titles:", regeneratedTitles);
        console.log("Updated regenerated contents:", regeneratedContents);
    }, [regeneratedContents, regeneratedTitles])


    useEffect(() => {
        console.log("right \n\n", seoAndTableOfContents)
    }, [seoAndTableOfContents])


    return (
        <div className="flex flex-col pt-24 px-20 min-h-screen p-4 bg-white items-center w-full">
            {/* Banner */}
            <div className="w-full h-[400px] relative overflow-hidden transition-transform duration-300 hover:scale-[101%] shadow-lg rounded-xl min-w-[400px] max-w-5xl">
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

            {/* below banner*/}
            <div className='flex justify-center custom:justify-between w-full max-w-5xl h-full'>
                <div className="flex-grow max-w-2xl custom:max-w-none">
                    {/* Title */}
                    <Spacer y={8} />
                    <div>
                        {formSubmitted ? (
                            <>
                                <Skeleton className="h-12 rounded w-1/2 min-w-[390px]" isLoaded={gist.title.length > 0} disableAnimation>
                                    <h2 className="h-10 font-serif text-5xl font-medium w-full text-osm-black min-w-[390px] text-nowrap">
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
                        <Skeleton className="rounded w-full min-w-[500.66px]" isLoaded={summary.summary.length > 0}>
                            <div className="text-osm-black w-full space-y-8">
                                {Array.from({ length: sectionCount }).map((_, index) => (
                                    <RegeneratePopover
                                        key={`${index}`}
                                        index={index}
                                        originalContent={seoAndTableOfContents.sectionContent[index]}
                                        originalTitle={seoAndTableOfContents.tableOfContents[index]}
                                        regeneratedContent={regeneratedContents[index]}
                                        regeneratedTitle={regeneratedTitles[index]}
                                        setRef={setRef}
                                        onRegenerate={handleRegenerate}
                                        isRegenerating={isRegenerating}
                                        popoverPrompt={popoverPrompt}
                                        setPopoverPrompt={setPopoverPrompt}
                                    />
                                ))}
                            </div>
                        </Skeleton>
                    ) : (
                        <div className="flex flex-col space-y-4 w-full">
                            {Array.from({ length: sectionCount }).map((_, index) => (
                                <Skeleton key={index} className="h-32 rounded w-full min-w-[390px]" />
                            ))}
                        </div>
                    )}
                </div>
                <div className="hidden custom:flex flex-col min-h-[1450px]">
                    <TableOfContents
                        items={seoAndTableOfContents.tableOfContents.slice(0, sectionCount)}
                        onItemClick={scrollToSection}
                        isLoaded={formSubmitted && summary.summary.length > 0}
                        skeletonCount={sectionCount}
                        className="hidden custom:block ml-10 mt-8 min-w-[150px] sticky top-10"
                    />
                </div>
            </div>
        </div>
    );
};

export default RightComponent;
