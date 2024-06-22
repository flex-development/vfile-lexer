/**
 * @file Type Aliases - Enter
 * @module vfile-lexer/types/Enter
 */

import type { Token } from '#src/interfaces'
import type TokenFields from './token-fields'
import type TokenType from './token-type'

/**
 * Start a new token.
 *
 * @see {@linkcode TokenFields}
 * @see {@linkcode TokenType}
 * @see {@linkcode Token}
 *
 * @param {TokenType} type - Token type
 * @param {(Partial<TokenFields> | null)?} fields - Token fields
 * @return {Token} Open token
 */
type Enter = (type: TokenType, fields?: Partial<TokenFields> | null) => Token

export type { Enter as default }
