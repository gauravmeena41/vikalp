module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        loginBackground: "url('/Images/loginBackground.png')",
      },
      colors: {
        mainColor: "#6e44ff",
        secondaryColor: "#DED8FE",
      },
      boxShadow: {
        "base-shadow": "rgba(112, 144, 176, 0.32) 0px 4px 4px -2px",
      },
      keyframes: {
        "slide-left": {
          "0%": {
            opacity: 0,
            display:"hidden",
            transform: "translateX(0%)",
          },
          "100%": {
            opacity: 1,
            display:"inline-block",
            transform: "translateX(-10%)",
          },
        },
        "fade": {
          "0%": {
            opacity: 0,
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "slide-left": "slide-left 0.5s forwards ease-in-out",
        "fade": "fade 0.3s forwards ease-in-out",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
