module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },

  extends: [
    // 'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    //'plugin:vue/strongly-recommended',
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    '@vue/prettier',
    '@nuxtjs'
  ],

  // add your custom rules here
  rules: {}
}
