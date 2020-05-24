module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix' : 'off',
    '@typescript-eslint/camelcase' : 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-constant-condition': ['error', { checkLoops: false }],
  }
};
