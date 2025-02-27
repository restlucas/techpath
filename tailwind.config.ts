import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#131F24",
        foreground: "#DCE6EC",
        border: "#37464F",
        blue: "#49BFF7",
        orange: "#E44D26",
      },
      backgroundColor: {
        selected: "#202F36",
      },
    },
  },
  plugins: [],
} satisfies Config;
