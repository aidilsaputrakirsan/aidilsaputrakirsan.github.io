module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bgDark": "#182121",
        "bgDarker": "#111111",
        "bgCard": "#1c1c1c",
        "bgLight": "#fbfbfb",
        "textLight": "#ffffff",
        "textMuted": "#888888",
        "textDark": "#111111",
        "animeRed": "#ff4c4c",
        "animeGreen": "#18FF92",
        "animeYellow": "#F9E858",
        "animeBlue": "#39C0FB",
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-cosmic': 'linear-gradient(135deg, #7B68EE, #3672F8)',
      },
    }
  },
  plugins: [],
}
