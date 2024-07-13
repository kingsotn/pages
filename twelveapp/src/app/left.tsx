"use client"
import React, { useState } from 'react';
import VideoUpload from './VideoUpload';
import { Input, CheckboxGroup, Chip, Button } from "@nextui-org/react";
import { CustomCheckbox } from "./CustomCheckbox.jsx";
import { Textarea } from "@nextui-org/input";

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

const LeftComponent = () => {
    const [groupSelected, setGroupSelected] = useState<string[]>([]);
    const [goalSelected, setGoalSelected] = useState<string[]>([]);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const placeholder = "e.g. make sure to include the keywords plants, nature, health";

    const handleKeyDown = (e: React.KeyboardEvent<any>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            setAdditionalInfo(placeholder);
        }
    };

    const handleFilesAccepted = (files: File[]) => {
        console.log('Files accepted:', files);
        // Handle the files (e.g., upload to a server, preview, etc.)
    };

    return (

        <div>
            <h1 className="text-2xl font-bold mb-8">Generate Page</h1>

            <div className="mb-10">
                <div className="p-6">
                    <VideoUpload onFilesAccepted={handleFilesAccepted} />
                </div>
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

                <CheckboxGroup
                    className="gap-1"
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
                    onKeyDown={handleKeyDown}
                />
            </div>

            <div className="flex justify-end pt-3">
                <Button
                    color="default"
                    className="rounded-md"
                    endContent={
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                            <path d="M12 8.25L15.75 12M15.75 12L12 15.75M15.75 12H8.25M21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12Z" stroke="#3A52EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    }
                >
                    Generate
                </Button>
            </div>

        </div >
    );
};

export default LeftComponent;