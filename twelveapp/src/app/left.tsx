"use client"
import React, { useState } from 'react';
import VideoUpload from './VideoUpload';
import { Input, CheckboxGroup, Chip } from "@nextui-org/react";
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
    const placeholder = "e.g. make sure to include the keywords [plants, nature, health]. Emphasize the importance of health";

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
                    placeholder="e.g. make sure to include the keywords [plants, nature, health]. Emphasize the importance of health"
                    classNames={{
                        input: "min-h-[200px] min-w-[300px] max-w-xl"
                    }}
                    size='lg'
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    value={additionalInfo}
                    onKeyDown={handleKeyDown}
                />
            </div>

        </div>
    );
};

export default LeftComponent;