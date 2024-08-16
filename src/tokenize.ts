/**
 * @file tokenize
 * @module vfile-lexer/tokenize
 */

import type {
  Event,
  FileLike,
  TokenizeOptions,
  Value
} from '#src/types'
import tokenizer from './create-tokenizer'
import preprocess from './preprocess'

/**
 * Tokenize `value`.
 *
 * @see {@linkcode Event}
 * @see {@linkcode FileLike}
 * @see {@linkcode TokenizeOptions}
 * @see {@linkcode Value}
 *
 * @param {FileLike | Value | null | undefined} value - File or value
 * @param {TokenizeOptions} options - Configuration options
 * @return {Event[]} List of events
 */
function tokenize(
  value: FileLike | Value | null | undefined,
  options: TokenizeOptions
): Event[] {
  return tokenizer(options).write(preprocess(options)(
    value,
    options.encoding,
    true
  ))
}

export default tokenize
