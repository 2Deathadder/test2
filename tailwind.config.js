/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { display: ['Impact', 'Arial Narrow', 'sans-serif'], sans: ['Inter', 'Arial', 'sans-serif'] },
      colors: { ink: '#0b0b0e', acid: '#c9ff32', violet: '#8053ff' }
    }
  },
  plugins: []
}