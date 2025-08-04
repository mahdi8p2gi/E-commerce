// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // اطمینان از اینکه کل فایل‌ها بررسی میشن
  ],
  darkMode: "class",
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


module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4fbf8b",
        "primary-dull": "#44ae7c",
      },

      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms ease-out",
      },
    },
  },
};
