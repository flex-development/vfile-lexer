/**
 * @file Test Utilities - token
 * @module tests/utils/token
 */

import type { Token } from '#src/interfaces'
import type { TokenFields, TokenType } from '#src/types'

/**
 * Token factory.
 *
 * @see {@linkcode TokenFields}
 * @see {@linkcode TokenType}
 * @see {@linkcode Token}
 *
 * @param {TokenType} type - Token type
 * @param {TokenFields} fields - Token fields
 * @return {Token} New token
 */
function token(type: TokenType, fields: TokenFields): Token {
  return Object.defineProperties({
    end: fields.end,
    start: fields.start,
    type
  }, {
    next: { enumerable: false, writable: true },
    previous: { enumerable: false, writable: true }
  })
}

export default token
