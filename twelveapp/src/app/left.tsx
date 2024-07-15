"use client"
import React, { useState, useEffect } from 'react';
import { Input, CheckboxGroup, Chip, Button, Spacer } from "@nextui-org/react";
import { CustomCheckbox } from "./CustomCheckbox.jsx";
import { Textarea } from "@nextui-org/input";
import { TwelveLabs, Task } from 'twelvelabs-js';
import Clip from './clip';
import { TabPressed, TabUnpressed } from './tabs';


const videoTypes = [
    "Informational",
    "Entertainment",
    "Educational",
    "Promotional",
    "Personal",
    "Creative",
    "Professional",
    "Lifestyle",
    "Narrative"
];

const goals = [
    "Inform",
    "Connect",
    "Promote",
    "Develop",
    "Engage"
];

const logo = <svg width="15" height="15" viewBox="0 0 131 131" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="32" fill="#FF8D3A" />
    <circle cx="99" cy="32" r="32" fill="#B2F260" />
    <circle cx="32" cy="99" r="32" fill="#4FE5C0" />
    <circle cx="99" cy="99" r="32" fill="#313131" />
    <path d="M77.15 95.2702C74.71 94.0486 70.5417 93.7431 68.7625 93.7431L68 100.615H72.575C74.1 100.615 76.3875 102.905 77.9125 104.432C79.4375 104.432 82.4875 114.358 84.775 117.412C87.0625 120.466 90.875 118.175 92.4 118.175C93.925 118.175 95.45 115.885 96.975 113.594C98.5 111.304 99.2625 101.378 99.2625 98.3242C99.2625 95.2702 101.55 88.3986 102.312 86.8716C102.922 85.65 103.583 87.3806 103.837 88.3986C104.346 90.9436 105.362 96.9499 105.362 100.615C105.362 105.196 109.937 109.777 110.7 110.54C111.31 111.151 114.512 110.286 116.037 109.777C117.308 109.013 119.85 107.181 119.85 105.959C119.85 104.432 122.9 100.615 125.187 99.0877C127.017 97.8661 128.492 98.0696 129 98.3242L128.237 91.4526H126.712C124.425 91.4526 122.9 92.2161 119.85 93.7431C116.8 94.354 114.512 100.106 113.75 102.905C113.242 101.887 112.225 98.935 112.225 95.2702C112.225 90.6891 109.937 84.581 108.412 82.2905C106.887 80 105.362 80 101.55 80C97.7375 80 96.975 81.527 93.925 89.1621C91.485 95.2702 90.3667 106.468 90.1125 111.304H88.5875C87.825 109.777 86.1475 105.959 85.5375 102.905C84.775 99.0877 80.2 96.7972 77.15 95.2702Z" fill="white" stroke="white" stroke-width="1.55814" />
</svg>

export async function getServerSideProps() {
    const myKey = process.env.TWELVE_KEY as string;
    const client = new TwelveLabs({ apiKey: myKey });

    return {
        props: {
            // Return any data you want to pass to the component
        }
    };
}

type LeftComponentProps = {
    setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};

const LeftComponent: React.FC<LeftComponentProps> = ({ setFormSubmitted }) => {
    const [groupSelected, setGroupSelected] = useState<string[]>([]);
    const [goalSelected, setGoalSelected] = useState<string[]>([]);
    const [additionalInfo, setAdditionalInfo] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [formFilled, setFormFilled] = useState<boolean>(false);
    const [isTabPressed, setIsTabPressed] = useState<boolean>(false)

    useEffect(() => {
        const isFormFilled = videoUrl !== '' && goalSelected.length > 0 && groupSelected.length > 0;
        setFormFilled(isFormFilled);
    }, [videoUrl, goalSelected, groupSelected]);

    const handleKeyDown = (e: React.KeyboardEvent<any>, field: string) => {
        if (e.key !== 'Tab') return
        e.preventDefault();

        if (field === "videoUrl") { setVideoUrl("https://www.youtube.com/watch?v=Nsx5RDVKZSk") }
        if (field === "additionalInfo") { setIsTabPressed(true); setAdditionalInfo("e.g. make sure to include the keywords plants, nature, health"); }
    };

    const handleKeyUp = (e: React.KeyboardEvent<any>) => {
        if (e.key !== 'Tab') return;
        setIsTabPressed(false);
    };

    const handleFilesAccepted = (files: File[]) => {
        console.log('Files accepted:', files);
    };

    const handleSubmit = () => {
        console.log("generate button clicked")
        setFormSubmitted(true);
    };

    const isValidYouTubeUrl = (url: string) => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        return youtubeRegex.test(url);
    };

    return (
        <div className='bg-gray-50 px-24 pt-24'>
            <h1 className="text-2xl font-serif ">Generate Page</h1>
            <Spacer y={1} />
            <p className="font-osm-font text-xs leading-normal text-gray-700">
                This app allows you to automatically generate SEO-optimized content via Youtube video upload and the
                <span className="inline-flex align-top">
                    <span className="mx-1.5 align-baseline">{logo}</span>
                    <a href="https://playground.twelvelabs.io/" target="_blank" className="underline mr-1">
                        Twelve Labs Pegasus-1 (80B)
                    </a>
                </span>
                video-to-text model.
            </p>

            <Spacer y={8} />
            <div>
                <Input
                    startContent={<Clip />}
                    isRequired
                    radius='sm'
                    key={"outside"}
                    labelPlacement={"outside"}
                    label="Youtube Link"
                    placeholder="https://www.youtube.com/watch?v=Nsx5RDVKZSk"
                    variant="bordered"
                    value={videoUrl ? videoUrl : ""}
                    pattern="^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$"
                    isInvalid={!isValidYouTubeUrl(videoUrl)}
                    className="max-w-full rounded-sm"
                    onChange={(e) => setVideoUrl(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, "videoUrl")}
                />
                <div className="min-h-[24px]">
                    {!isValidYouTubeUrl(videoUrl) && (
                        <span className="text-red-500 text-xs ml-1 mt-0">Please enter a valid YouTube URL</span>
                    )}
                </div>
            </div>
            <Spacer y={4} />


            <div className="flex flex-col w-full">
                <CheckboxGroup
                    className="gap-1"
                    label={<><span>What are your goals?</span><span className="text-red-500 ml-0.5 text-md">*</span></>}
                    orientation="horizontal"
                    value={goalSelected}
                    onChange={setGoalSelected}
                    classNames={{
                        label: 'text-black font-osm-font font-sans text-[14px]'
                    }}
                >
                    {goals.map((goal) => (
                        <CustomCheckbox key={goal} value={goal.toLowerCase().replace(/\s/g, '')}>
                            {goal}
                        </CustomCheckbox>
                    ))}
                </CheckboxGroup>


                <Spacer y={9} />
                <CheckboxGroup
                    className="gap-1 text-osm-black "
                    label={<><span>Tell us more about your video</span><span className="text-red-500 ml-0.5 text-md">*</span></>}
                    orientation="horizontal"
                    value={groupSelected}
                    onChange={setGroupSelected}
                    classNames={{
                        label: 'text-black font-osm-font font-sans text-[14px]'
                    }}
                >
                    {videoTypes.map((type) => (
                        <CustomCheckbox key={type} value={type.toLowerCase().replace(/\s/g, '')}>
                            {type}
                        </CustomCheckbox>
                    ))}
                </CheckboxGroup>

            </div>

            <Spacer y={10} />
            <div>
                <Textarea
                    label={
                        <div className="flex items-end space-x-1">
                            <span>Anything else?</span>
                            {isTabPressed ? (
                                <div className="align-bottom"><TabPressed /></div>
                            ) : (
                                <div className="align-bottom"><TabUnpressed /></div>
                            )}
                        </div>


                    }
                    placeholder="e.g. make sure to include the keywords plants, nature, health"
                    variant="bordered"
                    radius='sm'
                    labelPlacement="outside"
                    classNames={{
                        input: "min-h-[200px] min-w-[300px] max-w-xl"
                    }}
                    size='md'
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    value={additionalInfo}
                    onKeyDown={(e) => handleKeyDown(e, "additionalInfo")}
                    onKeyUp={handleKeyUp}
                />
            </div>

            <Spacer y={6} />
            <div className="flex justify-end">
                <Button
                    color='primary'
                    variant='shadow'
                    className="rounded-md hover:scale-105 text-gray-600 font-[2px]"
                    endContent={
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                            <path d="M12 8.25L15.75 12M15.75 12L12 15.75M15.75 12H8.25M21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12Z" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }
                    onClick={handleSubmit}
                    isDisabled={!formFilled}
                >
                    Generate
                </Button>
            </div>


        </div >
    );
};

export default LeftComponent;