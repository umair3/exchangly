module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        primary: "#3c0876",
        secondary: "#ce4a7eff",
        facebook: "#3b5998",
        linkedIn: "#0072b1",
        twitter: "#00acee",
        instagram: "#8a3ab9",
        reddit: "#ED001C",
        tiktok: "#ff0050",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
