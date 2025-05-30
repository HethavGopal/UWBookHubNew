/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFF176',  // Light yellow accent for buttons/links
        'secondary': '#FFFFFF',  // White for text
        'blackBG': '#000000',  // Black background
        'Favorite': '#FF5841',
        // Dark theme colors
        'dark-bg': '#000000',     // Main dark background
        'dark-text': '#FFFFFF',   // Primary text color
        'dark-accent': '#FFF176', // Light yellow for accents
      },
      fontFamily: {
        'primary': ['Montserrat', 'sans-serif'],
        'secondary': ['Nunito Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
