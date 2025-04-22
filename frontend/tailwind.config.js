export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        protest: ['"Protest Riot"', "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
