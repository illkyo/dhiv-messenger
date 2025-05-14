/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        faruma: ['Faruma', 'MV Boli', 'sans-serif'],
        kanafala: ['Kanafala', 'MV Boli', 'sans-serif'],
        rubik: ['Rubik-Regular', 'MV Boli', 'sans-serif'],
        waheed: ['Waheed', 'MV Boli', 'sans-serif'],
        "opensans-light": ['OpenSans-Light', 'sans-serif'],
      },
      colors: {
        "primary": {
          100: '#E9A35D',
          200: '#E48E38',
          300: '#D77A1D',
        }
      }
    }
  },
  plugins: [],
}
