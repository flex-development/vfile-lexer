/**
 * @file Type Aliases - ConstructRecord
 * @module vfile-lexer/interfaces/ConstructRecord
 */

import type { RecordConstructs } from '#src/types'

/**
 * Several constructs, mapped from their initial codes.
 */
interface ConstructRecord {
  /**
   * Try tokenizing constructs that start with the specified character code.
   *
   * @see {@linkcode RecordConstructs}
   */
  [code: `${number}` | number]: RecordConstructs | null | undefined

  /**
   * Try tokenizing constructs that start with any character code.
   *
   * @see {@linkcode RecordConstructs}
   */
  null?: RecordConstructs | null | undefined
}

export type { ConstructRecord as default }
