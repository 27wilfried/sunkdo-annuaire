/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffc727",
        dark: "#000000",
        black: "#111111",
      },

      container: {
        center: true,
        padding: "1rem",
        sm: "3rem",
      },
    },
  },
  plugins: [],
}

