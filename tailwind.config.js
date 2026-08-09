/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        ink: '#17233f',
        paper: '#f5f8ff',
        cyan: '#17c8d4',
        violet: '#7867f5',
        coral: '#ff6f91'
      },
      boxShadow: { glow: '0 12px 45px rgba(23, 200, 212, .18)' }
    }
  },
  plugins: []
};