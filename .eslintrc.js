module.exports = {
  root: true,
  'extends': 'plugin:vue/strongly-recommended',
  env: {
    node: true
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
