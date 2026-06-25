import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0C0C0E",
        bone: "#F0ECE4",
        cream: "#FAF7F1",
        rose: "#D4A0A6",
        burgundy: "#5C1F2E",
        terracotta: "#B8654D",
        moss: "#1E3A2F",
        gold: "#B8963E",
        forest: "#1B3528",
        "red-accent": "#8B2D2D",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
