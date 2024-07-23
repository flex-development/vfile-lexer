/**
 * @file Type Aliases - TokenFactory
 * @module vfile-lexer/types/TokenFactory
 */

import type { Token, TokenInfo } from '#src/interfaces'
import type TokenType from './token-type'

/**
 * Create a new token.
 *
 * @see {@linkcode TokenInfo}
 * @see {@linkcode TokenType}
 * @see {@linkcode Token}
 *
 * @param {TokenType} type - Token type
 * @param {TokenInfo} info - Token info
 * @return {Token} New token
 */
type TokenFactory = (type: TokenType, info: TokenInfo) => Token

export type { TokenFactory as default }
