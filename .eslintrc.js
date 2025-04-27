module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // Thêm dòng này để bật hỗ trợ Node.js
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "no-unused-vars": "warn",
  },
};
