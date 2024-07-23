/**
 * @file Interfaces - Place
 * @module vfile-lexer/interfaces/Place
 */

import type { Point } from '@flex-development/vfile-location'

/**
 * One place in a file, with additional chunk metadata.
 */
interface Place extends Point {
  /**
   * Index of character code chunk.
   */
  _index: number
}

export type { Place as default }
