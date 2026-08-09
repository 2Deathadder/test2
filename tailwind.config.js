/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { ink: '#172033', muted: '#657188', line: '#e4e9f1', canvas: '#f5f7fb', brand: '#2563eb', navy: '#14213d', mint: '#0f9f8f' },
      boxShadow: { soft: '0 10px 30px rgba(31, 48, 83, .06)' }
    }
  },
  plugins: []
};