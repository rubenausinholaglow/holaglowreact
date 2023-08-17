import tailwindcssRadix from 'tailwindcss-radix';

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      '6xl': ['78px', '92px'],
      '5xl': ['64px', '72px'],
      '4xl': ['60px', '72px'],
      '3xl': ['48px', '56px'],
      '2xl': ['36px', '40px'],
      xl: ['24px', '32px'],
      lg: ['21px', '28px'],
      md: ['16px', '24px'],
      sm: ['14px', '20px'],
      xs: ['12px', '16px'],
    },
    extend: {
      colors: {
        hg: {
          lime: '#EBFF0D',
          lime500: '#F5FF86',
          lime300: '#F9FFB6',
          lime100: '#FDFFE7',
          malva: '#BBC7FF',
          malva500: '#DDE3FF',
          malva300: '#EBEEFF',
          malva100: '#F8F9FF',
          darkMalva: '#7A8AC4',
          darkMalva700: '#A2ADD6',
          darkMalva500: '#BCC4E1',
          darkMalva300: '#D7DCED',
          darkMalva100: '#F2F3F9',
          turquoise: '#3AD5DD',
          magensta: '#D600BF',
          orange: '#FF7514',
          pink: '#FFC7C7',
          green: '#B9DDB6',
          skyblue: '#B7F9F9',
          black: '#101828',
          black700: '#344054',
          black500: '#667085',
          black400: '#98A2B3',
          black300: '#D0D5DD',
          black100: '#F2F4F7',
          black50: '#F9FAFB',
          lightMalva: '#BBC7FF',
          grease: '#F2F2F2',
          'gray-200': '#667085',
          500: '#4608AE',
          400: '#6B1FE0',
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
      keyframes: {
        slideDown: {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [tailwindcssRadix],
};
