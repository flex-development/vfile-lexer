/**
 * @file Type Aliases - FileLike
 * @module vfile-lexer/types/FileLike
 */

import type Value from './value'

/**
 * A file-like structure.
 */
type FileLike = {
  /**
   * Contents of file.
   *
   * @see {@linkcode Value}
   */
  value: Value
}

export type { FileLike as default }
