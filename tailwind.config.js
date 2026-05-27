/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        'primary-green': '#48D8A0',
        'primary-green-dim': '#3CB987',
        // Mission Control navy system (deepened from the original #242E42)
        'primary-dark': '#0B1426',
        'ink': '#081522',
        'navy-mid': '#162338',
        'accent-grey': '#F0F2F5',
        'accent-blue': '#4A90E2',
      },
      backdropBlur: {
        xs: '2px',
        glass: '18px',
      },
      boxShadow: {
        'mint-glow': '0 0 24px rgba(72, 216, 160, 0.35)',
      },
      letterSpacing: {
        hud: '0.18em',
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
