/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/views/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/assets/stylesheets/**/*.css",
    "./app/javascript/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'light-orange': '#FFA366',
        'orange': '#FF8533',
      }
    },
  },
  plugins: [],
}