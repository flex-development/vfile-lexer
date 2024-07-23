/**
 * @file Interfaces - TokenInfo
 * @module vfile-lexer/interfaces/TokenInfo
 */

import type Position from './position'
import type TokenFields from './token-fields'

/**
 * Token data.
 *
 * @see {@linkcode Position}
 * @see {@linkcode TokenFields}
 *
 * @extends {Position}
 * @extends {TokenFields}
 */
interface TokenInfo extends Position, TokenFields {}

export type { TokenInfo as default }
