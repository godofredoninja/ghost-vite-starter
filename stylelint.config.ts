import type { Config } from 'stylelint'

const config: Config = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true, // Sort CSS properties from A → Z
  },
}

export default config
