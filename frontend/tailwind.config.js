/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_dark_color: "var(--color-dark)",
        primary_hover_color: "var(--color-hover)",
        primary_text_color: "var(--color-text)",
        primary_button_color: "var(--color-button)",
        primary_active_color: "var(--color-active)",
        primary_button_hover_color: "var(--color-button-hover)",
        primary_color: "var(--primary-color)",
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Replace with your preferred font
      },
    },
  },
  plugins: [],
}
