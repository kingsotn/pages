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
        <div className="w-1/3 min-w-[600px] max-w-[800px] flex-shrink-0 flex flex-col p-24 border-cyan-300 border-2">
          <LeftComponent setFormSubmitted={setFormSubmitted} />
        </div>
        <div className="w-2/3  min-w-[600px] flex-grow flex flex-col">
          <RightComponent formSubmitted={formSubmitted} />
        </div>
      </main>
    </NextUIProvider>
  );
}
