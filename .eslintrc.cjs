/* eslint-env node */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks", "simple-import-sort"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  settings: { react: { version: "detect" } },
  rules: {
    "react/react-in-jsx-scope": "off",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn"
  }
}
