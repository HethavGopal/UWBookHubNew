/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        'dark-red': '#b01c24',
        'light-yellow': '#ffda4f',
        'black': '#000000',
        'red': {
          DEFAULT: '#b01c24',
          light: '#d42d36',
          dark: '#8a161c'
        },
        'yellow': {
          DEFAULT: '#ffda4f',
          light: '#ffe380',
          dark: '#ffd11a'
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
}
