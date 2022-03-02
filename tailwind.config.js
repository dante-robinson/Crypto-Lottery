module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        home: "50px 1fr 1fr 1fr 25px",
        other: "50px 0.65fr 50px 1.35fr 25px",
        account: "50px 1.25fr 50px 0.9fr 25px",
      },
    },
  },
  plugins: [],
};
