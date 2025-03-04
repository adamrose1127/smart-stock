/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(221.2, 83.2%, 93.3%)',
          100: 'hsl(221.2, 83.2%, 83.3%)',
          200: 'hsl(221.2, 83.2%, 73.3%)',
          300: 'hsl(221.2, 83.2%, 63.3%)',
          400: 'hsl(221.2, 83.2%, 58.3%)',
          500: 'hsl(221.2, 83.2%, 53.3%)',
          600: 'hsl(221.2, 83.2%, 48.3%)',
          700: 'hsl(221.2, 83.2%, 43.3%)',
          800: 'hsl(221.2, 83.2%, 38.3%)',
          900: 'hsl(221.2, 83.2%, 28.3%)',
        },
      },
    },
  },
  plugins: [],
}

