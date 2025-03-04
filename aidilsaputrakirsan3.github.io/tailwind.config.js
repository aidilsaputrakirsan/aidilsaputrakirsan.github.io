/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          "bgPrimary": "#0F0F1A",
          "bgSecondary": "#1A1A2E",
          "accentPrimary": "#7B68EE",
          "accentSecondary": "#A390FF",
          "textPrimary": "#F2F2F2",
          "textSecondary": "#A0A0B9",
        },
      },
    },
    plugins: [],
  }