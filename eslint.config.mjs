/**
 * @file ESLint Configuration - Root
 * @module config/eslint
 * @see https://eslint.org/docs/user-guide/configuring
 */

/**
 * Root eslint configuration object.
 *
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default [
  ...(await import('./eslint.base.config.mjs')).default,
  {
    ignores: [
      '!**/__fixtures__/**/dist/',
      '!**/__fixtures__/**/node_modules/',
      '!**/typings/**/dist/',
      '**/.yarn/',
      '**/coverage/',
      '**/dist/',
      '__fixtures__/underscore-1.5.2.js'
    ]
  },
  {
    files: ['src/types/token-kind.ts'],
    rules: {
      '@typescript-eslint/no-redundant-type-constituents': 0
    }
  }
]
