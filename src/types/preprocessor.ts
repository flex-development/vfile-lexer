/**
 * @file Type Aliases - Preprocessor
 * @module vfile-lexer/types/Preprocessor
 */

import type Code from './code'
import type Encoding from './encoding'
import type FileLike from './file-like'
import type Value from './value'

/**
 * Turn `value` into character code chunks.
 *
 * @see {@linkcode Code}
 * @see {@linkcode Encoding}
 * @see {@linkcode FileLike}
 * @see {@linkcode Value}
 *
 * @param {FileLike | Value | null | undefined} value - Value to preprocess
 * @param {Encoding | null | undefined} [encoding] - Character encoding to use
 * when value or its contents is {@linkcode Uint8Array}
 * @param {boolean | null | undefined} [end] - End of stream?
 * @return {Code[]} Character code chunks
 */
type Preprocessor = (
  value: FileLike | Value | null | undefined,
  encoding?: Encoding | null | undefined,
  end?: boolean | null | undefined
) => Code[]

export type { Preprocessor as default }
