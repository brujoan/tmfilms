/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'impact': ["Impact"],
        'anonymous': ["Anonymous Pro"],
        'square': ["Square"],
      }
    },
  },
  plugins: [
  ],
}