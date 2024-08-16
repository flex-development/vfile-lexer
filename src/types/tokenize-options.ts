/**
 * @file Type Aliases - TokenizeOptions
 * @module vfile-lexer/types/TokenizeOptions
 */

import type { Options, PreprocessOptions } from '#src/interfaces'
import type Encoding from './encoding'

/**
 * Tokenize options.
 *
 * @see {@linkcode Options}
 * @see {@linkcode PreprocessOptions}
 */
type TokenizeOptions = Options & PreprocessOptions & {
  /**
   * Character encoding to use when a value is a {@linkcode Uint8Array}.
   */
  encoding?: Encoding | null | undefined
}

export type { TokenizeOptions as default }
