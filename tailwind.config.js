// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F2F2F2',
        'violet-brand': '#61439D',
        'violet-primary': '#714FB6',
        'violet-dark': '#3C2865',
        'violet-light': '#8B6ACE',
        'violet-light-2': '#E4DEF6',
        'gray-dark': '#64748B',
        'gray-darker': '#413B50',
        'gray-inactive': '#CACACB',
        'gray-light': '#CBD5E1',
        'gray-disabled': '#E3E3E9',
        'text-off': '#363F45',
        red: '#AD3459',
        'red-error': '#E13C3C',
        green: '#58C299',
        'green-light': '#55B685',
        black: '#000000',
        white: '#FFFFFF',
        overlay: 'rgba(32, 27, 43, 0.3)',

        party: {
          lla: '#7C5BC2',
          uxp: '#23B2E8',
        },
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
