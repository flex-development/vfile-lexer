/**
 * @file Type Aliases - TokenFactory
 * @module vfile-lexer/types/TokenFactory
 */

import type { Token } from '#src/interfaces'
import type TokenFields from './token-fields'
import type TokenType from './token-type'

/**
 * Create a new token.
 *
 * @see {@linkcode TokenFields}
 * @see {@linkcode TokenType}
 * @see {@linkcode Token}
 *
 * @param {TokenType} type - Token type
 * @param {TokenFields} fields - Token fields
 * @return {Token} New token
 */
type TokenFactory = (type: TokenType, fields: TokenFields) => Token

export type { TokenFactory as default }
