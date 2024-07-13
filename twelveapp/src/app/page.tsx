import { NextUIProvider } from "@nextui-org/react";
import LeftComponent from "./left";
import RightComponent from "./right";

export default function Home() {
  return (
    <NextUIProvider>
      <main className="min-h-screen flex">
        <div className="w-1/3 min-w-[600px] max-w-[800px] flex-shrink-0 flex flex-col p-24 border-cyan-300 border-2">
          <LeftComponent />
        </div>
        <div className="w-2/3 flex-grow flex flex-col">
          <RightComponent />
        </div>
      </main>
    </NextUIProvider>


  );
}
