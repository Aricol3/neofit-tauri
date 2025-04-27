const { heroui } = require("@heroui/react");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    "bg-carbsColor",
    "bg-fatColor",
    "bg-proteinColor"
  ],
  theme: {
    extend: {}
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          primary: "#9e86ff",
          secondary: "#e7fd5a",
          carbsColor: "#40E0D0",
          fatColor: "#A569BD",
          proteinColor: "#FFC66E",
          textPrimaryColor: "#474768",
          textSecondaryColor: "#8fa1b1",
          waterBackground: "#6882fe",
          backgroundColor: "#f5f9fa",
        }
      }
    }
  })]
};