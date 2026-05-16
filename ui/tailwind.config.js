/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#06080f',
        surface: {
          0: '#0d1117',
          1: '#161b22',
          2: '#1c2333',
          3: '#242c3d',
        },
        line: '#2d333b',
        lunar: {
          50: '#e8eaff',
          100: '#c0c4d0',
          200: '#8b949e',
          300: '#6e7681',
        },
        role: {
          mobile: '#3fb950',
          agent: '#bc8cff',
          dev: '#d29922',
          personal: '#58a6ff',
        },
        danger: '#f85149',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
