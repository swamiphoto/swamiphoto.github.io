// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist"', "ui-sans-serif", "system-ui"],
        "geist-mono": ['"Geist Mono"', "monospace"], // Adding Geist Mono
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        light: 300,
        thin: 100,
        // You can add extra weight if you have them for Geist Mono
        extrabold: 800, // Example, adjust according to your font files
        black: 900, // Example, adjust according to your font files
      },
      keyframes: {
        flip: {
          "0%": { transform: "rotateX(0deg)" },
          "50%": { transform: "rotateX(180deg)" },
          "100%": { transform: "rotateX(0deg)" },
        },
      },
      animation: {
        flip: "flip 1.2s ease-in-out",
        "flip-up": "flipUp 1s ease-out forwards",
      },
      colors: {
        purple: {
          100: "#F6F8FF",
          200: "#F2F4FB",
          300: "#E9ECFF",
          400: "#DEE2F9",
          500: "#CCD2F2",
          600: "#ABB4E3",
          700: "#7F8AC7",
          800: "#636EAB",
          900: "#434D80",
        },
        pink: {
          100: "#FFF7FD",
          200: "#FAF2F8",
          300: "#FFE8F8",
          400: "#FADEF2",
          500: "#F2CBE7",
          600: "#E3AAD3",
          700: "#C77FB3",
          800: "#AB6397",
          900: "#80446F",
        },
        blue: {
          100: "#F6FCFF",
          200: "#F2F8FA",
          300: "#E8F8FF",
          400: "#DEF1FA",
          500: "#CCE7F3",
          600: "#AAD1E3",
          700: "#7FB0C7",
          800: "#6394AB",
          900: "#446D80",
        },
        green: {
          100: "#F7FFFC",
          200: "#F2FAF7",
          300: "#E8FFF5",
          400: "#DEFAEE",
          500: "#CBF2E1",
          600: "#AAE3CA",
          700: "#7FC7A8",
          800: "#63AB8C",
          900: "#448066",
        },
        yellow: {
          100: "#FFFCF7",
          200: "#FAF7F2",
          300: "#FFF5E8",
          400: "#FAEEDE",
          500: "#F2E1CB",
          600: "#E3CAAA",
          700: "#C7A87F",
          800: "#AB8C63",
          900: "#806644",
        },
      },
    },
  },
  plugins: [],
};
