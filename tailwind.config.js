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
          primary: '#EBFF0D',
          primary500: '#F5FF86',
          primary300: '#F9FFB6',
          primary100: '#FDFFE7',
          secondary: '#A96FE7',
          secondary700: '#c39bee',
          secondary500: '#d4b7f3',
          secondary300: '#e6d4f8',
          secondary100: '#f6f1fd',
          tertiary: '#7A8AC4',
          tertiary700: '#A2ADD6',
          tertiary500: '#BCC4E1',
          tertiary300: '#D7DCED',
          tertiary100: '#F2F3F9',
          turquoise: '#3AD5DD',
          magenta: '#D600BF',
          orange: '#FF7514',
          pink: '#FFC7C7',
          cream: '#EFE8E2',
          cream500: '#f7f3f0',
          green: '#B9DDB6',
          skyblue: '#B7F9F9',
          black: '#101828',
          black700: '#344054',
          black500: '#667085',
          black400: '#98A2B3',
          black300: '#D0D5DD',
          black100: '#F2F4F7',
          black50: '#F9FAFB',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-15deg': 'linear-gradient(-15deg, var(--tw-gradient-stops))',
        gradient: 'linear-gradient(var(--tw-gradient-stops))',
      },
      maxWidth: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1152px',
        '2xl': '1280px',
      },
      boxShadow: {
        'centered-secondary': '0 0 10px 10px rgba(169,111,231,0.1)',
        'centered-black': '0 0 10px 10px rgba(0,0,0,0.1)',
        'centered-black-sm': '0 0 5px 5px rgba(0,0,0,0.1)',
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
        horizontalScroll: {
          from: { transform: 'translateX(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        horizontalScroll: 'horizontalScroll 50s linear infinite',
      },
    },
  },
  plugins: [tailwindcssRadix],
};
