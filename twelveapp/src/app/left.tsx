"use client"
import React from 'react';
import VideoUpload from './VideoUpload';


const LeftComponent = () => {
    const handleFilesAccepted = (files: File[]) => {
        console.log('Files accepted:', files);
        // Handle the files (e.g., upload to a server, preview, etc.)
    };


    return (
        <div className="w-1/3 h-full p-10 bg-gray-100">
            <h1 className="text-2xl font-bold mb-8">Generate Page</h1>

            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
                <div className="p-6">
                    <VideoUpload onFilesAccepted={handleFilesAccepted} />
                </div>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Tell us more about your video</h2>
                <p className="text-gray-500 mb-6">Provide some details to help us understand the content better</p>
                <div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            <input type="checkbox" className="mr-2" />
                            Tutorial
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            <input type="checkbox" className="mr-2" />
                            Review
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            <input type="checkbox" className="mr-2" />
                            Vlog
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            <input type="checkbox" className="mr-2" />
                            Other
                        </label>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">What is the goal?</h2>
                <div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            <input type="checkbox" className="mr-2" />
                            Increase engagement
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            <input type="checkbox" className="mr-2" />
                            Educate audience
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            <input type="checkbox" className="mr-2" />
                            Promote product/service
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            <input type="checkbox" className="mr-2" />
                            Other
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftComponent;
