/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'food-red': '#E63329',
        'food-orange': '#F47B20',
        'food-yellow': '#F9C11A',
        'food-cream': '#FDF3E3',
        'food-dark': '#1A0A00',
        'food-brown': '#3D1F00',
      },
      fontFamily: {
        'display': ['"Clash Display"', '"DM Sans"', 'system-ui', 'sans-serif'],
        'body': ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
