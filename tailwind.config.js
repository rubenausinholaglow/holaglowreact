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
      xl: ['21px', '28px'],
      '2xl': ['24px', '32px'],
      '3xl': ['32px'],
      '4xl': ['56px'],
    },
    extend: {
      colors: {
        hg: {
          lime: '#EBFF0D',
          darkMalva: '#7A8AC4',
          lightMalva: '#BBC7FF',
          grease: '#F2F2F2',
          'gray-200': '#667085',
          black: '#101828',
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
      maxWidth: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      boxShadow: {
        centered: '0 0 10px 10px rgba(0,0,0,0.1)',
        'centered-sm': '0 0 5px 5px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
