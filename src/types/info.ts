/**
 * @file Type Aliases - Info
 * @module vfile-lexer/types/Info
 */

import type Restore from './restore'

/**
 * Internal state; info passed around.
 */
type Info = {
  /**
   * Last known length of event list.
   */
  from: number

  /**
   * Restore internal state.
   *
   * @see {@linkcode Restore}
   */
  restore: Restore
}

export type { Info as default }
