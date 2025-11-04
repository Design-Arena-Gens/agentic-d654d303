/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        netflix: {
          black: '#141414',
          dark: '#181818',
          darker: '#0a0a0a',
          orange: '#ff6b35',
          'orange-dark': '#e55a2b',
          gray: '#808080',
          'gray-light': '#b3b3b3',
        },
      },
    },
  },
  plugins: [],
}
