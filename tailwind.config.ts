import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-sage": {
          DEFAULT: "#2D4A3E",
          hover: "#1E3A2E",
        },
        "warm-sand": "#F5F0E8",
        "soft-clay": "#C4A882",
        midnight: "#1A1A2E",
        "vivid-coral": "#E8603A",
        "electric-teal": "#0BA89A",
        "bright-amber": "#F0A500",
        "lime-sage": "#6BAA3E",
        neutral: {
          900: "#1A1A1A",
          700: "#4A4A4A",
          500: "#7A7A7A",
          300: "#B8B8B8",
          100: "#EBEBEB",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        ticker: "ticker 20s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "energy-gradient":
          "linear-gradient(135deg, #E8603A 0%, #F0A500 100%)",
        "energy-gradient-hover":
          "linear-gradient(135deg, #D4522E 0%, #D99200 100%)",
        "deep-gradient":
          "linear-gradient(135deg, #2D4A3E 0%, #1A3A2E 100%)",
        "teal-sage-gradient":
          "linear-gradient(135deg, #0BA89A 0%, #6BAA3E 100%)",
        "amber-coral-gradient":
          "linear-gradient(135deg, #F0A500 0%, #E8603A 100%)",
        "coral-amber-gradient":
          "linear-gradient(135deg, #E8603A 0%, #F0A500 100%)",
        "teal-coral-gradient":
          "linear-gradient(135deg, #0BA89A 0%, #E8603A 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
