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
        mainColor: "#7158F4",
        secondaryColor: "#DED8FE",
      },
      boxShadow: {
        "base-shadow": "rgba(112, 144, 176, 0.32) 0px 4px 4px -2px",
      },
      keyframes: {
        "slide-left": {
          "0%": {
            opacity: 0,
            transform: "translateX(0%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(-10%)",
          },
        },
      },
      animation: {
        "slide-left": "slide-left 0.3s forwards ease-in-out",
      },
    },
  },
  plugins: [],
};
