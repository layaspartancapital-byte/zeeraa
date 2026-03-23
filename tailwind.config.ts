import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        primary: "#0066FF",
        "primary-hover": "#0052CC",
        "text-primary": "#FFFFFF",
        "text-muted": "#A0A0A0",
        card: "#111111",
        border: "#1A1A1A",
        success: "#00C48C",
        error: "#FF4D4D",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(0,102,255,0.15)",
        "glow-lg": "0 0 60px rgba(0,102,255,0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
