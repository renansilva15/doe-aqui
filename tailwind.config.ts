import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/components/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e9f8fd',
          100: '#bbe8f8',
          200: '#9addf4',
          300: '#6ccdef',
          400: '#4fc3ec',
          500: '#23b4e7',
          600: '#20a4d2',
          700: '#1980a4',
          800: '#13637f',
          900: '#0f4c61',
        },
      },
    },
    boxShadow: {
      custom: '4px 6px 4px 0px rgba(0, 0, 0, 0.25)',
    },
  },
  plugins: [],
}
export default config
