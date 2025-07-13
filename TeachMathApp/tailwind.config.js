/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  
  safelist: [
    "border-blue-500",
    "border-yellow-800",
    "border-orange-500",
    "bg-blue-500",
    "bg-yellow-800",
    "bg-orange-500"
  ],
  
  theme: {
    extend: {
      colors: {
        mainneutral: 'var(--color-mainneutral)',
        secneutral: 'var(--color-secneutral)',
        maindark: 'var(--color-maindark)',
        mainmid: 'var(--color-mainmid)',
        mainlight: 'var(--color-mainlight)',
        secdark: 'var(--color-secdark)',
        secmid: 'var(--color-secmid)',
        seclight: 'var(--color-seclight)',
      },
    },
  },
  plugins: [],
}
