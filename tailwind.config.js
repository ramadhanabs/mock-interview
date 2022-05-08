module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'grey-scale': {
          100: '#F2F2F2',
          200: '#ECEDEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#828282',
          600: '#4F4F4F',
          700: '#333333',
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
