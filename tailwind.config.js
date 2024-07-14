import {nextui} from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [ nextui({
    prefix: "nextui",
    addCommonColors: false,
    layout: {},
    themes: {
      light: {
        layout: {},
        colors: {
          primary: {
            DEFAULT: "#17C964FF"
          }
        },
      },
      dark: {
        layout: {},
        colors: {
          primary: {
            DEFAULT: "#17C964FF"
          }
        },
      },
      // ... custom themes
    },
  }),]
}

