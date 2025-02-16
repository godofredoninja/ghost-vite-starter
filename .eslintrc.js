module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // ⚠️ Si tienes errores de ESLint sobre "parserOptions.project", quita esta línea
    project: ['./tsconfig.json'],
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Desactiva reglas conflictivas entre ESLint y Prettier
  ],
  rules: {
    'prettier/prettier': 'error', // Aplica las reglas de Prettier dentro de ESLint
    'no-console': 'warn',
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Evita advertencias en variables sin usar prefijadas con "_"
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off', // Opcional: evita advertencias innecesarias
      },
    },
  ],
}
