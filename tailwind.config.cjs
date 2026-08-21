/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        aquablue: '#0ea5a4',
        aquadark: '#071021',
        aquateal: '#0ea5a4',
        aquanavy: '#061029'
      }
    }
  },
  plugins: []
}
