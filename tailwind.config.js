/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: { colors: { ink: '#0b0b0a', paper: '#eee9df', ember: '#e85d04', muted: '#85817a' }, fontFamily: { display: ['Arial Narrow', 'Impact', 'sans-serif'], mono: ['ui-monospace', 'SFMono-Regular', 'monospace'] } } },
  plugins: []
};