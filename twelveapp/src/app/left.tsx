"use client"
import React, { useState } from 'react';
import { Input, CheckboxGroup, Chip, Button, Spacer } from "@nextui-org/react";
import { CustomCheckbox } from "./CustomCheckbox.jsx";
import { Textarea } from "@nextui-org/input";
import { TwelveLabs, Task } from 'twelvelabs-js';
import Clip from './clip';


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

const LeftComponent: React.FC<LeftComponentProps> = ({ setFormSubmitted, formSubmitted }) => {
    const [groupSelected, setGroupSelected] = useState<string[]>([]);
    const [goalSelected, setGoalSelected] = useState<string[]>([]);
    const [additionalInfo, setAdditionalInfo] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [formFilled, setFormFilled] = useState<boolean>(false);

    const handleKeyDown = (e: React.KeyboardEvent<any>, field: string) => {
        if (e.key !== 'Tab') return
        e.preventDefault();

        if (field === "videoUrl") { setVideoUrl("https://www.youtube.com/watch?v=Nsx5RDVKZSk") }
        if (field === "additionalInfo") { setAdditionalInfo("e.g. make sure to include the keywords plants, nature, health"); }
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
            <h1 className="text-2xl font-serif mb-8">Generate Page</h1>
            <div className="mb-10 pt-0.5">
                <Input
                    startContent={
                        <Clip />
                    }
                    isRequired
                    key={"outside"}
                    labelPlacement={"outside"}
                    label="Youtube Link"
                    placeholder="https://www.youtube.com/watch?v=Nsx5RDVKZSk"
                    variant="bordered"
                    value={videoUrl ? videoUrl : ""}
                    pattern="^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$"
                    isInvalid={!isValidYouTubeUrl(videoUrl)}
                    errorMessage="Please enter a valid YouTube URL"
                    className="max-w-full rounded-sm"
                    onChange={(e) => setVideoUrl(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, "videoUrl")}
                />
            </div>

            <div className="flex flex-col gap-1 w-full">
                <CheckboxGroup
                    className="gap-1"
                    label="What is your goal"
                    orientation="horizontal"
                    value={goalSelected}
                    onChange={setGoalSelected}
                >
                    {goals.map((goal) => (
                        <CustomCheckbox key={goal} value={goal.toLowerCase().replace(/\s/g, '')}>
                            {goal}
                        </CustomCheckbox>
                    ))}
                </CheckboxGroup>


                <Spacer y={8} />
                <CheckboxGroup
                    className="gap-1 text-blue-300 "
                    label="Tell us more about your video"
                    orientation="horizontal"
                    value={groupSelected}
                    onChange={setGroupSelected}
                >
                    {videoTypes.map((type) => (
                        <CustomCheckbox key={type} value={type.toLowerCase().replace(/\s/g, '')}>
                            {type}
                        </CustomCheckbox>
                    ))}
                </CheckboxGroup>

            </div>

            <div className='pt-8'>
                <Textarea
                    label="Anything else? (press tab to autocomplete)"
                    placeholder="e.g. make sure to include the keywords plants, nature, health"
                    labelPlacement="outside"
                    classNames={{
                        input: "min-h-[200px] min-w-[300px] max-w-xl"
                    }}
                    size='lg'
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    value={additionalInfo}
                    onKeyDown={(e) => handleKeyDown(e, "additionalInfo")}
                />
            </div>

            <div className="flex justify-end pt-3">
                <Button
                    color="default"
                    className="rounded-md"
                    endContent={<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M12 8.25L15.75 12M15.75 12L12 15.75M15.75 12H8.25M21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12Z" stroke="#3A52EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    onClick={handleSubmit}
                    isDisabled={formFilled ? false : true}
                >
                    Generate
                </Button>
            </div>

        </div >
    );
};

export default LeftComponent;