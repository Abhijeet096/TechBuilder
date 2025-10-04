/**** Tailwind Config ****/
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        primaryLight: '#6366F1',
        background: '#F3F4F6',
      },
    },
  },
  plugins: [],
};
