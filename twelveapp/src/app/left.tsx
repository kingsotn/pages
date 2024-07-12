"use client"
import React, { useState } from 'react';
import VideoUpload from './VideoUpload';
import { Input, CheckboxGroup, Chip } from "@nextui-org/react";
import { CustomCheckbox } from "./CustomCheckbox.jsx";


const LeftComponent = () => {
    const [groupSelected, setGroupSelected] = useState<string[]>([]);

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
                    label="Select amenities"
                    orientation="horizontal"
                    value={groupSelected}
                    onChange={setGroupSelected}
                >
                    <CustomCheckbox value="wifi">Wifi</CustomCheckbox>
                    <CustomCheckbox value="tv">TV</CustomCheckbox>
                    <CustomCheckbox value="kitchen">Kitchen</CustomCheckbox>
                    <CustomCheckbox value="parking">Parking</CustomCheckbox>
                    <CustomCheckbox value="pool">Pool</CustomCheckbox>
                    <CustomCheckbox value="gym">Gym</CustomCheckbox>
                </CheckboxGroup>
            </div>
        </div>
    );
};

export default LeftComponent;
