module.exports = {
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
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'gradient-cosmic': 'linear-gradient(135deg, #7B68EE, #3672F8)',
      },
    },
  },
  plugins: [],
}
