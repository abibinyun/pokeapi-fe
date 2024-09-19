/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FFCB05",
          dark: "#D6A700",
        },
        secondary: {
          DEFAULT: "#003A70",
        },
        accent: {
          DEFAULT: "#F85888",
        },
        neutral: {
          light: "#F5F5F5",
          dark: "#333333",
        },
        custom: "#FFFFFF",
      },
      textColor: {
        primary: "#003A70",
        secondary: "#FFCB05",
        accent: "#F85888",
        neutral: {
          light: "#F5F5F5",
          dark: "#333333",
        },
        custom: "#FFFFFF",
      },
      backgroundColor: {
        navbar: "#D6A700",
        body: "#F5F5F5",
        card: "#FFCB05",
        button: "#F85888",
      },
      borderColor: {
        image: "#333333",
      },
    },
  },
  plugins: [],
};
