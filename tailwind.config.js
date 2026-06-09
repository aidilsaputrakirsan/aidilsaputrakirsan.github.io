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
        // --- Soft / Warm mockup palette ---
        "warmBg": "#FAF6F0",        // base cream
        "warmCard": "#FFFFFF",       // card surface
        "warmInk": "#2B2520",        // primary text (warm near-black)
        "warmMuted": "#7C7268",      // secondary text
        "warmLine": "#EAE1D6",       // hairline borders
        "warmPeach": "#E8835A",      // primary accent (terracotta)
        "warmPeachSoft": "#FBE7DC",  // accent tint
        "warmSage": "#7FA887",       // secondary accent
        "warmSageSoft": "#E6F0E6",
        "warmSky": "#7BA7C9",        // tertiary accent
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
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'floaty': 'floaty 7s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-cosmic': 'linear-gradient(135deg, #7B68EE, #3672F8)',
      },
    }
  },
  plugins: [],
}
