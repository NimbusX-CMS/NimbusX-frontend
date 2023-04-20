/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "admin-primary": "#576CA8",
        "admin-primary-background": "#1D1F25",
        "admin-secondary-background": "#272A30",
        "admin-text": "#F5F3F5"
      }
    },
  },
  plugins: [],
}
