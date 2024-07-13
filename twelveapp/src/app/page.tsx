import { NextUIProvider } from "@nextui-org/react";
import LeftComponent from "./left";

export default function Home() {
  return (
    <main >
      <NextUIProvider>
        <div className="flex min-h-screen flex-col p-24 border-cyan-300 border-width-2 min-w-[600px]" style={{ maxWidth: '33.33vw' }}>
          <LeftComponent />
        </div>
        <RightComponent />
      </NextUIProvider>
    </main>

  );
}
