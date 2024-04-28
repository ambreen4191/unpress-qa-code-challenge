const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  testEnvironment: "jest-environment-jsdom",
  reporters: [
    "default",
    ["jest-html-reporters", {
      publicPath: "./html-report",
      filename: "report.html",
      expand: true,
    }]
  ]
};

module.exports = createJestConfig(customJestConfig);