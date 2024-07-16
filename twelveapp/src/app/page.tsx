"use client"
import React, { useState } from 'react';
import { NextUIProvider } from "@nextui-org/react";
import LeftComponent from "./left";
import RightComponent from "./right";

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <NextUIProvider>
      <main className="min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-[760px] min-w-[760px] flex-shrink-0 flex flex-col border-b-1 md:border-b-0 md:border-r-1 border-gray-300 bg-gray-50 md:fixed md:left-0 md:top-0 md:bottom-0">
          <LeftComponent setFormSubmitted={setFormSubmitted} />
        </div>
        <div className="w-full md:w-[calc(100%-760px)] min-w-[760px] flex-grow flex flex-col md:ml-[760px] overflow-y-auto">
          <RightComponent formSubmitted={formSubmitted} />
        </div>
      </main>
    </NextUIProvider>

  );
}
