// next.config.js
const withTM = require("next-transpile-modules")(["rc-util"]); // Add more if needed

module.exports = withTM({
  reactStrictMode: true, // Enable React strict mode if you want
});
