/**
 * @file Type Aliases - Exit
 * @module vfile-lexer/types/Exit
 */

import type { Token } from '#src/interfaces'
import type TokenType from './token-type'

/**
 * Close an open token.
 *
 * @see {@linkcode TokenType}
 * @see {@linkcode Token}
 *
 * @param {TokenType} type - Token type
 * @return {Token} Closed token
 */
type Exit = (type: TokenType) => Token

export type { Exit as default }
