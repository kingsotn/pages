import { NextUIProvider } from "@nextui-org/react";
import LeftComponent from "./left";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <NextUIProvider>
        <LeftComponent />
      </NextUIProvider>
    </main>
  );
}
