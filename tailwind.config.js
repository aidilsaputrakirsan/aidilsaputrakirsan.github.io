module.exports = {
  darkMode: 'class',
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
        // --- Soft / Warm palette ---
        // RGB triplets live in index.css (:root = light, .dark = warm dark)
        // so the whole theme switches via a single class on <html>.
        "warmBg": "rgb(var(--warm-bg) / <alpha-value>)",        // base surface
        "warmCard": "rgb(var(--warm-card) / <alpha-value>)",    // card surface
        "warmInk": "rgb(var(--warm-ink) / <alpha-value>)",      // primary text
        "warmMuted": "rgb(var(--warm-muted) / <alpha-value>)",  // secondary text
        "warmLine": "rgb(var(--warm-line) / <alpha-value>)",    // hairline borders
        "warmPeach": "rgb(var(--warm-peach) / <alpha-value>)",  // primary accent
        "warmPeachSoft": "rgb(var(--warm-peach-soft) / <alpha-value>)",
        "warmSage": "rgb(var(--warm-sage) / <alpha-value>)",    // secondary accent
        "warmSageSoft": "rgb(var(--warm-sage-soft) / <alpha-value>)",
        "warmSky": "rgb(var(--warm-sky) / <alpha-value>)",      // tertiary accent
        "warmSkySoft": "rgb(var(--warm-sky-soft) / <alpha-value>)",
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['"Sora"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 40px -12px rgba(43, 37, 32, 0.12)',
        'soft-lg': '0 24px 70px -20px rgba(43, 37, 32, 0.18)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'floaty': 'floaty 7s ease-in-out infinite',
        'marquee': 'marquee 26s linear infinite',
      },
      backgroundImage: {
        'gradient-cosmic': 'linear-gradient(135deg, #7B68EE, #3672F8)',
      },
    }
  },
  plugins: [],
}
