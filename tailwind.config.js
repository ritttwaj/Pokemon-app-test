/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pokered: '#FF0000',
        pokeblue: '#0075BE',
        pokeyellow: '#FFCC00',
        pokegray: '#DFDFDF',
      },
    },
  },
  plugins: [],
}