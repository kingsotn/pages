import React from 'react';

const RightComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full border border-gray-300 p-4 bg-white">
            <h2 className="text-2xl font-semibold mb-4">Right Component</h2>
            <p className="text-gray-600 mb-2">
                This is a mock of the Right Component. It will take up 2/3 of the width of the parent container.
            </p>
            <p className="text-gray-600 mb-2">
                You can place any content you want here. This mock is to illustrate the structure and layout.
            </p>
            <button className="mt-4 px-4 py-2 bg-cyan-500 text-white  hover:bg-cyan-600">
                Click Me
            </button>
        </div>
    );
};

export default RightComponent;
