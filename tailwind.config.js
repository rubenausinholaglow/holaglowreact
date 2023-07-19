/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      xs: ['10px'],
      sm: ['12px'],
      md: ['14px'],
      lg: ['16px', '22px'],
      xl: ['21px', '26px'],
      '2xl': ['24px', '32px'],
      '3xl': ['32px'],
      '4xl': ['56px'],
    },
    extend: {
      colors: {
        hg: {
          lime: '#DCE500',
          darkMalva: '#7A8AC4',
          lightMalva: '#BBC7FF',
          grease: '#F2F2F2',
          black: '#111111',
          700: '#C295B4',
          600: '#AE8FBD',
          500: '#4608AE',
          400: '#6B1FE0',
          300: '#B42BAE',
          200: '#DCAACD',
          100: '#FBEEF9',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
