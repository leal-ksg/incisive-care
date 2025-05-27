import animatePlugin from 'tailwindcss-animate';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        protest: ['"Protest Riot"', 'sans-serif'],
      },
    },
  },
  plugins: [animatePlugin],
};
