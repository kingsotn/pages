import Image from "next/image";
import LeftComponent from "./left";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LeftComponent />
    </main>
  );
}
