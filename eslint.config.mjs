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
      '**/dist/'
    ]
  },
  {
    files: ['__tests__/constructs/type-metadata.ts', 'src/lexer.ts'],
    rules: {
      'unicorn/no-this-assignment': 0
    }
  },
  {
    files: ['src/enums/codes.ts'],
    rules: {
      'sort-keys': 0
    }
  },
  {
    files: ['src/types/encoding.ts'],
    rules: {
      'unicorn/text-encoding-identifier-case': 0
    }
  }
]
