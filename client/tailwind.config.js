// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // اطمینان از اینکه کل فایل‌ها بررسی میشن
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#4fbf8b",
        "primary-dull": "#44ae7c",
      },
    },
  },
  plugins: [],
};
// tailwind.config.js
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#4fbf8b",
        "primary-dull": "#44ae7c",
      },
    },
  }
 
};
