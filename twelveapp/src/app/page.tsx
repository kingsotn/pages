"use client"
import React, { useState } from 'react';
import { NextUIProvider } from "@nextui-org/react";
import LeftComponent from "./left";
import RightComponent from "./right";

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <NextUIProvider>
      <main className="min-h-screen flex">
        <div className="w-1/3 min-w-[700px] max-w-[700px] flex-shrink-0 flex flex-col border-r-1 border-gray-300 bg-gray-50 fixed left-0 top-0 bottom-0">
          <LeftComponent setFormSubmitted={setFormSubmitted} />
        </div>
        <div className="w-2/3 min-w-[600px] flex-grow flex flex-col ml-[700px] overflow-auto">
          <RightComponent formSubmitted={formSubmitted} />
        </div>
      </main>
    </NextUIProvider>
  );
}
