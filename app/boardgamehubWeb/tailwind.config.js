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
        'primary': '#3A786F',
        'secondary': '#AC3F4F',
        'accent': '#d82c2c',
        'navbar': '#000000',
        'designers': '#5C5657',
       },
       boxShadow: {
        'image': '8px 14px 7px 5px rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        'title': ['Alatsi'],
        'text': ['IBM Plex Mono'],
      },
    },
  },
  plugins: [],
}

