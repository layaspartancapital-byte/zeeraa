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
        background: "#FFFFFF",
        "background-alt": "#F5F7FF",
        "background-tint": "#EEF2FF",
        "navy": "#0A1628",
        "navy-light": "#0D2350",
        "navy-border": "#1A2F50",
        primary: "#0066FF",
        "primary-hover": "#0052CC",
        "primary-light": "#E8F0FF",
        "text-primary": "#0A0A0A",
        "text-body": "#444444",
        "text-muted": "#777777",
        card: "#FFFFFF",
        border: "#E5E5E5",
        success: "#00C48C",
        error: "#FF4D4D",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,102,255,0.06)",
        "card-hover": "0 4px 20px rgba(0,102,255,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
