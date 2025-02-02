import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  openGraph: {
    title: 'Your Open Graph Title',
    description: 'Description of your page for social media',
    images: [
      {
        url: '/banner.png',
        width: 1200,
        height: 630,
        alt: 'Open Graph Image Alt Text',
      },
    ],
  },
};

import fs from 'fs'
import path from "path";
const asciiArtPath = path.join(process.cwd(), 'src/app/ascii.txt');
const asciiArt = fs.readFileSync(asciiArtPath, 'utf-8');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log(${JSON.stringify(asciiArt)});
              console.log("%cwoahh %chttps://twitter.com/ahiajsbwks", "color: #1DA1F2; font-size: 16px;", "color: #1DA1F2; font-size: 16px; text-decoration: underline;");
            `,
          }}
        />
      </body>
    </html>
  );
}