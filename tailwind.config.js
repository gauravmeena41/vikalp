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
        mainColor: "#914a42",
        secondaryColor: "#f16658",
        secondaryColorLight: "#eacaae",
      },
      boxShadow: {
        "base-shadow": "rgba(112, 144, 176, 0.32) 0px 4px 4px -2px",
      },
      keyframes: {
        "slide-down": {
          "0%": {
            opacity: 0,
            transform: "translateY(-10%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0%)",
          },
        },
        fade: {
          "0%": {
            opacity: 0,
            transform: "translateX(-10%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0%)",
          },
        },
      },
      animation: {
        "slide-down": "slide-down 0.5s forwards ease-in-out",
        fade: "fade 0.5s forwards ease-in-out",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
