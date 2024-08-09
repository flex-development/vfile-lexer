/**
 * @file Type Aliases - Position
 * @module vfile-lexer/types/Position
 */

import type Place from './place'

/**
 * Range between two points in a source file.
 */
interface Position {
  /**
   * Place of last character code in range.
   *
   * @see {@linkcode Place}
   */
  end: Place

  /**
   * Place of first character code in range.
   *
   * @see {@linkcode Place}
   */
  start: Place
}

export type { Position as default }
