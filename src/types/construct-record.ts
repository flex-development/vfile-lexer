/**
 * @file Type Aliases - ConstructRecord
 * @module vfile-lexer/types/ConstructRecord
 */

import type RecordConstructs from './constructs-record'

/**
 * Several constructs, mapped from their initial codes.
 */
type ConstructRecord = {
  /**
   * Try tokenizing constructs that start with the specified character code.
   *
   * > 👉 Does not run on end-of-file code (`null`).
   *
   * @see {@linkcode RecordConstructs}
   */
  [code: `${number}` | number]: RecordConstructs | null | undefined

  /**
   * Try tokenizing constructs that start with any character code.
   *
   * > 👉 Does not run on end-of-file code (`null`).
   *
   * @see {@linkcode RecordConstructs}
   */
  null?: RecordConstructs | null | undefined
}

export type { ConstructRecord as default }
