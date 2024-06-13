/** @type {import('tailwindcss').Config} */
export default {
  content: ['./inertia/**/*.vue'],
  theme: {
    extend: {
      fontFamily: { urbanist: ['Urbanist', 'sans-serif'] },
      colors: {
        'pigment-indigo': {
          50: '#faf5ff',
          100: '#f4e7ff',
          200: '#ead4ff',
          300: '#dbb2ff',
          400: '#c480ff',
          500: '#ae50fc',
          600: '#9a2df0',
          700: '#841cd4',
          800: '#701dac',
          900: '#5c198a',
          950: '#4e0580',
        },
      },
    },
  },
  plugins: [],
}
