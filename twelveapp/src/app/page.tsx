"use client"
import React, { useEffect, useState } from 'react';
import { NextUIProvider } from "@nextui-org/react";
import LeftComponent from "./left";
import RightComponent from "./right";
import { Gist, Summary } from '../../pages/api/twelvelabs';
import { SeoAndTableOfContents } from '../../pages/api/groq';


export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [gist, setGist] = useState<Gist>({
    id: "",
    title: "",
    topics: [],
    hashtags: []
  });
  const [summary, setSummary] = useState<Summary>({
    id: "",
    summary: "",
  })
  const [seoAndTableOfContents, setSeoAndTableOfContents] = useState<SeoAndTableOfContents>({
    seo: [],
    tableOfContents: [],
  });

  useEffect(() => {
    console.log(gist)
  }, [gist])

  return (
    <NextUIProvider>
      <main className="min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-[670px] min-w-[670px] flex-shrink-0 flex flex-col border-b-1 md:border-b-0 md:border-r-1 border-gray-300 bg-gray-50 md:fixed md:left-0 md:top-0 md:bottom-0">
          <LeftComponent setFormSubmitted={setFormSubmitted} setGist={setGist} setSummary={setSummary} setSeoAndTableOfContents={setSeoAndTableOfContents} />
        </div>
        <div className="w-full md:w-[calc(100%-670px)] md:ml-[670px] overflow-y-auto overflow-x-hidden">
          <div className="min-w-[670px] md:min-w-0">
            <RightComponent formSubmitted={formSubmitted} gist={gist} summary={summary} seoAndTableOfContents={seoAndTableOfContents} />
          </div>
        </div>
      </main>
    </NextUIProvider>
  );
}
