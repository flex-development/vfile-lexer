/**
 * @file Type Aliases - ConstructRecord
 * @module vfile-lexer/interfaces/ConstructRecord
 */

import type { ConstructPack } from '#src/types'

/**
 * Several constructs, mapped from their initial codes.
 */
interface ConstructRecord {
  /**
   * Try tokenizing constructs that start with the specified character code.
   *
   * @see {@linkcode ConstructPack}
   */
  [code: `${number}` | number]: ConstructPack | null | undefined

  /**
   * Try tokenizing constructs that start with any character code.
   *
   * @see {@linkcode ConstructPack}
   */
  null?: ConstructPack | null | undefined
}

export type { ConstructRecord as default }
