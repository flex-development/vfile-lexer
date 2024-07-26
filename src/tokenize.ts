/**
 * @file tokenize
 * @module vfile-lexer/tokenize
 */

import type {
  Encoding,
  Event,
  FileLike,
  TokenizeOptions,
  Value
} from '#src/types'
import Lexer from './lexer'
import preprocess from './preprocess'

/**
 * Tokenize `value`.
 *
 * @see {@linkcode Encoding}
 * @see {@linkcode Event}
 * @see {@linkcode FileLike}
 * @see {@linkcode TokenizeOptions}
 * @see {@linkcode Value}
 *
 * @param {FileLike | Value | null | undefined} value - Value to tokenize
 * @param {Encoding | null | undefined} [encoding] - Character encoding to use
 * when `value` or its contents is {@linkcode Uint8Array}
 * @param {TokenizeOptions | null | undefined} [options] - Configuration options
 * @return {Event[]} List of events
 */
function tokenize(
  value: FileLike | Value | null | undefined,
  encoding?: Encoding | null | undefined,
  options?: TokenizeOptions | null | undefined
): Event[]

/**
 * Tokenize `value`.
 *
 * @see {@linkcode FileLike}
 * @see {@linkcode Event}
 * @see {@linkcode TokenizeOptions}
 * @see {@linkcode Value}
 *
 * @param {FileLike | Value | null | undefined} value - Value to tokenize
 * @param {TokenizeOptions | null | undefined} [options] - Tokenize options
 * @return {Event[]} List of events
 */
function tokenize(
  value: FileLike | Value | null | undefined,
  options?: TokenizeOptions | null | undefined
): Event[]

/**
 * Tokenize `value`.
 *
 * @see {@linkcode FileLike}
 * @see {@linkcode Event}
 * @see {@linkcode TokenizeOptions}
 * @see {@linkcode Value}
 *
 * @param {FileLike | Value | null | undefined} value - Value to tokenize
 * @param {Encoding | TokenizeOptions | null | undefined} [encoding] - Character
 * encoding to use when `value` or its contents is {@linkcode Uint8Array}, or
 * configuration options
 * @param {TokenizeOptions | null | undefined} [options] - Configuration options
 * @return {Event[]} List of events
 */
function tokenize(
  value: FileLike | Value | null | undefined,
  encoding?: Encoding | TokenizeOptions | null | undefined,
  options?: TokenizeOptions | null | undefined
): Event[] {
  if (typeof encoding === 'object' && encoding) {
    options = encoding
    encoding = undefined
  }

  return new Lexer(options).write(preprocess(options)(value, encoding, true))
}

export default tokenize
