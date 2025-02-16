/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    // 🔹 Enforce alphabetical order for CSS properties
    'order/properties-alphabetical-order': true,

    // 🔹 Prevent Stylelint from modifying @import rules
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['import'],
      },
    ],

    // 🔹 Ensure `@import` is not rewritten as `url()`
    'import-notation': 'string',
  },
}
