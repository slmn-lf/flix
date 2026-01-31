import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "search-in": {
          "0%": {
            opacity: "0",
            transform: "translateX(8px)",
            width: "0",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
            width: "16rem",
          },
        },
      },
      animation: {
        "search-in": "search-in 300ms ease-out forwards",
      },
    },
  },

  plugins: [],
} satisfies Config;
