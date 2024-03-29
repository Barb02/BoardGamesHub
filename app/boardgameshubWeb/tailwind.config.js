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
        'navbar': '#1B1B1B',
        'designers': '#5C5657',
        'searchDivBackground': '#1E4D46',
        'searchBackground': '#51A79A',
        'sortByText': '#88A09D',
        'gradient': '#222222',
        'searchProductBackground': '#2F0909', 
        'searchProductDefault': '#582C2C',
        'searchProductBackgroundHover': '#A10018',
        'loginInput': '#D9D9D9',
       },
       boxShadow: {
        'image': '8px 14px 7px 5px rgba(0, 0, 0, 0.5)',
        'innerSearch': '0px 0px 7px 2px rgba(0, 0, 0, 0.50) inset', 
        'divDistact': '6px 6px 7.3px 5px rgba(0, 0, 0, 0.50)',
        'hot':'9px 7px 0px rgba(0,0,0,1)',
      },
      fontFamily: {
        'title': ['Alatsi'],
        'text': ['IBM Plex Mono'],
        'hot': ['Josefin Sans'],
      },
      gradientColorStopPositions: {
        22: '22%',
      },
      rotate: {
        '6': '6deg',
      }
    },
  },
  plugins: [],
}
