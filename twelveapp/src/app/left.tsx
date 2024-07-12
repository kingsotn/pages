"use client"
import React, { useState } from 'react';
import VideoUpload from './VideoUpload';
import { Input, CheckboxGroup, Chip } from "@nextui-org/react";
import { CustomCheckbox } from "./CustomCheckbox.jsx";

const videoTypes = [
    "Documentary",
    "Animation",
    "Short Film",
    "Tutorial",
    "Vlog",
    "Music Video",
    "Review",
    "Gaming",
    "Interview",
    "News",
    "Web Series",
    "Live Stream",
    "Unboxing",
    "Reaction",
    "Travel",
    "Comedy"
];

const goals = [
    "Education",
    "Entertainment",
    "Inspiration",
    "Marketing",
    "Networking",
    "Promotion",
    "Training",
    "Engagement"
];


const LeftComponent = () => {
    const [groupSelected, setGroupSelected] = useState<string[]>([]);
    const [goalSelected, setGoalSelected] = useState<string[]>([]);

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


        </div>
    );
};

export default LeftComponent;
