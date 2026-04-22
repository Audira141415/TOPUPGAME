/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brutal: {
          black: '#000000',
          white: '#FFFFFF',
          cyan: '#00FFFF',
          yellow: '#FFFF00',
          magenta: '#FF00FF',
        },
      },
      boxShadow: {
        'brutal-cyan': '4px 4px 0px #00FFFF',
        'brutal-yellow': '4px 4px 0px #FFFF00',
        'brutal-magenta': '4px 4px 0px #FF00FF',
        'brutal-white': '4px 4px 0px #FFFFFF',
        'brutal-cyan-lg': '8px 8px 0px #00FFFF',
      },
      borderWidth: {
        '3': '3px',
      },
      fontFamily: {
        space: ['"Space Grotesk"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
