/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ember: {
          DEFAULT: "#E8612C",
          hover: "#d45220",
          light: "#FDF0EB",
        },
        palm: {
          DEFAULT: "#1FBF73",
          hover: "#1aa864",
          light: "#E9F9F1",
        },
        plantain: {
          DEFAULT: "#FFD966",
          hover: "#f5cd55",
          light: "#FFF9E6",
        },
        cocoa: {
          DEFAULT: "#4A1F0E",
          deep: "#361608",
          muted: "#66331D",
        },
        cream: {
          DEFAULT: "#FFF8EC",
          soft: "#FFFDF9",
          dark: "#F7EEDB",
        },
        paper: "#FFFFFF",
        mist: {
          DEFAULT: "#7A6A5F",
          light: "#A4958B",
        },
      },
      borderRadius: {
        card: "20px",
        input: "12px",
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(74, 31, 14, 0.08)",
        card: "0 14px 35px -8px rgba(74, 31, 14, 0.09)",
        glow: "0 10px 25px -5px rgba(232, 97, 44, 0.28)",
        glowPalm: "0 10px 25px -5px rgba(31, 191, 115, 0.28)",
        glowPlantain: "0 10px 25px -5px rgba(255, 217, 102, 0.35)",
      },
    },
  },
  plugins: [],
};
