// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // اطمینان از اینکه کل فایل‌ها بررسی میشن
  ],
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
