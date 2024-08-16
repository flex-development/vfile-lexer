/**
 * @file Interfaces - TokenInfo
 * @module vfile-lexer/interfaces/TokenInfo
 */

import type Position from './position'
import type Token from './token'
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
interface TokenInfo extends Position, TokenFields {
  /**
   * Next token.
   *
   * @see {@linkcode Token}
   */
  next?: Token | undefined

  /**
   * Previous token.
   *
   * @see {@linkcode Token}
   */
  previous?: Token | undefined
}

export type { TokenInfo as default }
