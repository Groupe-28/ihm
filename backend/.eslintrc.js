module.exports = {
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
};