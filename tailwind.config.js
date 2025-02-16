/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Files inside the `src` folder
    './*.hbs', // Ghost template files
    './partials/**/*.hbs', // Ghost partial template files
  ],
  theme: {
    extend: {}, // Extend Tailwind's default theme here
  },
  plugins: [], // Add Tailwind plugins here if needed
}
