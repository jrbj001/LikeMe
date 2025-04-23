/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a1d23',
        secondary: '#fff6e9',
        accent: '#b4e48e',
      },
      fontFamily: {
        'replica-regular': ['Replica_Std-Regular'],
        'replica-bold': ['Replica_Std-Bold'],
      },
    },
  },
  plugins: [],
}

