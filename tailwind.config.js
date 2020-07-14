module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "havelock-blue": "#4c98d5",
        "fruit-salad": "#53aa68",
        shark: "#1b1b1c",
        charade: "#282c35",
      },
      borderRadius: {
        xl: "1rem",
      },
      gridTemplateColumns: {
        "battle-title": "minmax(auto,1fr) 50px minmax(auto,1fr)",
      },
      fontFamily: {},
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
