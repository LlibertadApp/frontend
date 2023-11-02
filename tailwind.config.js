// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F2F2F2',
        uxp: '#23B2E8',
        'violet-brand': '#61439D',
        'violet-dark': '#3C2865',
        'violet-light': '#8B6ACE',
        'gray-dark': '#64748B',
        'gray-inactive': '#CACACB',
        'gray-light': '#CBD5E1',
        'text-off': '#363F45',
        red: '#AD3459',
        green: '#58C299',
        black: '#000000',
        white: '#FFFFFF',
        overlay: 'rgba(32, 27, 43, 0.3)',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
