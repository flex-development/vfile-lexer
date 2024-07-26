/**
 * @file Type Aliases - Enter
 * @module vfile-lexer/types/Enter
 */

import type { Token, TokenFields } from '#src/interfaces'
import type TokenType from './token-type'

/**
 * Start a new token.
 *
 * @see {@linkcode TokenFields}
 * @see {@linkcode TokenType}
 * @see {@linkcode Token}
 *
 * @param {TokenType} type - Token type
 * @param {TokenFields | null | undefined} [fields] - Token fields
 * @return {Token} Open token
 */
type Enter = (type: TokenType, fields?: TokenFields | null | undefined) => Token

export type { Enter as default }
