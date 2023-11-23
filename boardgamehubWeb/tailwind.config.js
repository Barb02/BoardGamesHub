/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#FFFFFF',
        'background': '#212121',
        'primary': '#4fd8c4',
        'secondary': '#2f0909',
        'accent': '#d82c2c',
       },
    },
  },
  plugins: [],
}

