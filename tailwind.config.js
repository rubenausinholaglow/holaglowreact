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
      '4xl': ['56px', '60px'],
      dr4xl: ['48px', '56px'],
      '3xl': ['36px', '44px'],
      '2xl': ['32px', '40px'],
      xl: ['24px', '32px'],
      drxl: ['28px', '36px'],
      lg: ['21px', '28px'],
      md: ['16px', '24px'],
      sm: ['14px', '20px'],
      xs: ['12px', '16px'],
    },
    extend: {
      fontFamily: {
        gtUltra: ['var(--font-gtUltra)'],
      },
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
          error: '#E81E61',
          error300: '#f8bbd0',
          error100: '#fde8ef',
          turquoise: '#3AD5DD',
          magenta: '#D600BF',
          orange: '#FF7514',
          pink: '#FFC7C7',
          pink300: '#ffeeee',
          pink400: '#fde6e1',
          cream: '#EFE8E2',
          cream500: '#f7f3f0',
          green: '#73BC6D',
          green300: '#B9DDB6',
          skyblue: '#B7F9F9',
          black: '#101828',
          black700: '#344054',
          black500: '#667085',
          black400: '#98A2B3',
          black300: '#D0D5DD',
          black100: '#F2F4F7',
          black50: '#F9FAFB',
        },
        derma: {
          primary: '#1FA6A6',
          'primary/20': '#d0f3e7',
          primary500: '#23D9B7',
          primary300: '#99F2E2',
          primary100: '#e5f7ed',
          secondary500: '#EFE8E2',
          secondary400: '#F3EDE9',
          secondary300: '#F7F3F0',
          secondary100: '#FBFAF3',
          tertiary: '#112959',
          tertiaryDark: '#030140',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-15deg': 'linear-gradient(-15deg, var(--tw-gradient-stops))',
        'gradient-30deg': 'linear-gradient(30deg, var(--tw-gradient-stops))',
        gradient: 'linear-gradient(var(--tw-gradient-stops))',
        'gradient-animated':
          'linear-gradient(-45deg, #e6d4f8 0%, #F9FFB6 8.333%, #BCC4E1 16.666%, #B9DDB6 25%, #F5FF86 33.333%, #FFC7C7 41.666%, #c39bee 50%, #A2ADD6 58.333%, #FED6B9 66.666%, #E87BCC 75%, #BAF9F9 83.333%, #F8CBCB 91.666% );',
      },
      maxWidth: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1152px',
        '2xl': '1280px',
      },
      boxShadow: {
        'centered-secondary': '0 0 10px 10px rgba(169,111,231,0.05)',
        'centered-black': '0 0 10px 10px rgba(0,0,0,0.05)',
        'centered-black-sm': '0 0 5px 5px rgba(0,0,0,0.05)',
        'centered-black-lg': '0 0 50px 50px rgba(0,0,0,0.05)',
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
        animateBG: {
          '0%': {
            backgroundPosition: '0% 8.333%',
          },
          '4.166%': {
            backgroundPosition: '8.333% 16.664%',
          },
          '8.332%': {
            backgroundPosition: '16.666% 25%',
          },
          '12.498%': {
            backgroundPosition: '25% 33.333%',
          },
          '16.664%': {
            backgroundPosition: '33.333% 41.666%',
          },
          '20.83%': {
            backgroundPosition: '41.666% 50%',
          },
          '25%': {
            backgroundPosition: '50% 58.333%',
          },
          '29.166%': {
            backgroundPosition: '58.333% 66.666%',
          },
          '33.332%': {
            backgroundPosition: '66.666% 75%',
          },
          '37.498%': {
            backgroundPosition: '75% 83.333%',
          },
          '41.664%': {
            backgroundPosition: '83.333% 91.666%',
          },
          '45.83%': {
            backgroundPosition: '91.666% 100%',
          },
          '50%': {
            backgroundPosition: '91.333% 100%',
          },
          '54.166%': {
            backgroundPosition: '100% 91.333%',
          },
          '58.333%': {
            backgroundPosition: '91.333% 83.333%',
          },
          '62.5%': {
            backgroundPosition: '83.333% 75%',
          },
          '66.666%': {
            backgroundPosition: '75% 66.666%',
          },
          '70.833%': {
            backgroundPosition: '66.666% 58.333%',
          },
          '75%': {
            backgroundPosition: '58.333% 50%',
          },
          '79.166%': {
            backgroundPosition: '50% 41.666%',
          },
          '83.333%': {
            backgroundPosition: '41.666% 33.333%',
          },
          '87.5%': {
            backgroundPosition: '33.333% 25%',
          },
          '91.666%': {
            backgroundPosition: '25% 16.666%',
          },
          '95.833%': {
            backgroundPosition: '16.666% 8.333%',
          },
          '100%': {
            backgroundPosition: '8.333% 0%',
          },
        },
        shake: {
          '0%': { transform: 'translateX(0%)' },
          '5%': { transform: 'translateX(-2.5%)' },
          '10%': { transform: 'translateX(2%)' },
          '15%': { transform: 'translateX(-1.5%)' },
          '20%': { transform: 'translateX(1%)' },
          '25%': { transform: 'translateX(-0.5%)' },
          '30%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        horizontalScroll: 'horizontalScroll 50s linear infinite',
        animateBG: 'animateBG 180s ease infinite',
        shake: 'shake 3s ease infinite',
      },
    },
  },
  plugins: [tailwindcssRadix],
};
