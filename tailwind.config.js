/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bebas': ['"Bebas Neue"', 'cursive'],
        'humaroid': ['"Humaroid"', 'sans-serif'],
        'impact': ["Impact"],
        'anonymous': ["Anonymous Pro"],
        'square': ["Square"],
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)', // Ejemplo de sombra personalizada
        'inner-strong': 'inset 0 10px 20px 0 rgba(0, 0, 0, 0.5)', // Ejemplo de sombra interior
      }
    },
  },
  plugins: [],
}
