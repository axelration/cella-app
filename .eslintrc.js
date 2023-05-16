module.exports = {
  // root: true,
  // extends: ['@react-native-community'],
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-native/all', 'standard'],
  plugins: ['import', 'node', 'promise', 'standard'],
  rules: {
    'no-console': 0,
    'space-before-function-paren': [2, { anonymous: 'always', named: 'never' }],
    'react/no-string-refs': 0,
    'react-native/no-single-element-style-arrays': 0
  }
}
