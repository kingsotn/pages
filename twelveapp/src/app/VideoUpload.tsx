"use client"

import React, { useCallback } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';

interface VideoUploadProps {
    onFilesAccepted?: (files: File[]) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onFilesAccepted }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (onFilesAccepted) {
            onFilesAccepted(acceptedFiles);
        }
        console.log(acceptedFiles);
    }, [onFilesAccepted]);

    const options: DropzoneOptions = {
        onDrop,
        accept: {
            'video/*': ['.mp4', '.mov', '.avi']
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone(options);

    return (
        <div
            {...getRootProps()}
            className="border-2 border-dotted border-gray-400 rounded-lg p-8 text-center cursor-pointer"
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p className="text-gray-500">Drop the files here...</p>
            ) : (
                <div className="flex flex-col items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 16v-1a4 4 0 014-4h10a4 4 0 014 4v1m-4 4H7a4 4 0 01-4-4v-1m5-4v6m2-6v6m2-6v6m2-6v6m2-6v6m2-6v6"
                        />
                    </svg>
                    <p className="text-gray-500">Drag & Drop or Choose file to upload</p>
                    <p className="text-gray-400">.mp4, .mov, .avi</p>
                </div>
            )}
        </div>
    );
};

export default VideoUpload;
