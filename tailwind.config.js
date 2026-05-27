/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#48D8A0',
        'primary-dark': '#242E42',
        'accent-grey': '#F0F2F5',
        'accent-blue': '#4A90E2',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'glass-shimmer': 'glass-shimmer 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'glass-shimmer': {
          '0%': { 
            'background-position': '-200% 0',
          },
          '100%': { 
            'background-position': '200% 0',
          },
        },
      },
    },
  },
  plugins: [],
}
