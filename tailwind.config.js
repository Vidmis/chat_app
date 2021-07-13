module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        palette: {
          moon: "#95A5A6",
          cloud: "#ECF0F1",
          red: "#E74C3C",
          sunset: "#E67E22",
          sunrise: "#F1C40F",
          teal: "#32D9CB",
        },
      },

      maxWidth: {
        "1/5": "20%",
        "2/5": "40%",
        "1/2": "50%",
        "3/5": "60%",
        "3/4": "75%",
        "4/5": "80%",
        "4.5/5": "90%",
      },
      maxHeight: {
        "1/5": "20%",
        "2/5": "40%",
        "1/2": "50%",
        "3/5": "60%",
        "3/4": "75%",
        "4/5": "80%",
        "4.5/5": "90%",
      },
      minWidth: {
        "32": "9rem",
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
      },
      inset: {
        "2/5": "42%",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
