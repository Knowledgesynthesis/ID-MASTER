module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  ignorePatterns: ['dist', 'node_modules'],
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  rules: { 'react-hooks/exhaustive-deps': 'error' },
}
