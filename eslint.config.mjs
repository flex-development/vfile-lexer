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
    files: [
      '__tests__/constructs/inline-tag.ts',
      '__tests__/constructs/string.ts',
      'src/constructs/initialize.ts',
      'src/lexer.ts'
    ],
    rules: {
      'unicorn/no-this-assignment': 0
    }
  }
]
