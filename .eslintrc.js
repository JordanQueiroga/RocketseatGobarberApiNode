module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ["prettier"],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    "jest/globals": true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "linebreak-style": ["error", "windows"],
    "no-param-reassign": "off",
    "camelcase": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
    "class-methods-use-this": "off",
    "prettier/prettier": "error"
  },
};
