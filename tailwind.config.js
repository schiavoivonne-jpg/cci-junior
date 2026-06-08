/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cci: {
          red:    '#D62B2B',
          yellow: '#F5C518',
          bg:     '#F0E060',
          dark:   '#1A1A1A',
        },
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        brush:  ['"Ma Shan Zheng"', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
