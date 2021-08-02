module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
    },
  },
  variants: {
    extend: { height: ["responsive", "hover", "focus"] },
  },
  plugins: [],
};
