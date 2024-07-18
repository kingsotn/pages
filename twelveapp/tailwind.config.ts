import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'osm-black': '#11181C',
        'primary': '#9ced6f'
      },
      fontFamily: {
        'osm-font': '14px__Inter_aaf875',
      },
      screens: {
        'custom': '1350px',
      },
    },
  },
  plugins: [nextui()],
};
export default config;
