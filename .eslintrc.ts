module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    'max-len': ['error', 120, { ignorePattern: '^import|^export' }],
    '@typescript-eslint/no-explicit-any': [0],
    '@typescript-eslint/explicit-function-return-type': [0],
    '@typescript-eslint/interface-name-prefix': [0],
    '@typescript-eslint/no-empty-interface': [0],
    '@typescript-eslint/ban-ts-ignore': [0],
  },
};
