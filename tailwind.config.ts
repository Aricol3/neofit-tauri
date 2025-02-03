const { nextui } = require("@nextui-org/react");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
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
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: "#9e86ff",
          carbsColor: "#40E0D0",
          fatColor: "#A569BD",
          proteinColor: "#FFC66E",
          textPrimaryColor: "#474768",
          textSecondaryColor: "#8fa1b1",
        }
      }
    }
  })]
};