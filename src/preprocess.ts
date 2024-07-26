/**
 * @file preprocess
 * @module vfile-lexer/preprocess
 */

import { codes } from './enums'
import type { PreprocessOptions } from './interfaces'
import type {
  Code,
  Column,
  Encoding,
  FileLike,
  Preprocessor,
  Value
} from './types'

/**
 * Create a preprocessor to turn a value into character code chunks.
 *
 * @see {@linkcode PreprocessOptions}
 * @see {@linkcode Preprocessor}
 *
 * @param {PreprocessOptions | null | undefined} [options] - Configuration
 * @return {Preprocessor} Character code preprocessor
 */
function preprocess(
  this: void,
  options?: PreprocessOptions | null | undefined
): Preprocessor {
  const { tabSize = 2 } = options ?? {}
  return preprocessor

  /**
   * Turn `value` into character code chunks.
   *
   * @param {FileLike | Value | null | undefined} value - Value to preprocess
   * @param {Encoding | null | undefined} [encoding] - Character encoding to use
   * when value or its contents is {@linkcode Uint8Array}
   * @param {boolean | null | undefined} [end] - End of stream?
   * @return {Code[]} Character code chunks
   */
  function preprocessor(
    value: FileLike | Value | null | undefined,
    encoding?: Encoding | null | undefined,
    end?: boolean | null | undefined
  ): Code[] {
    /**
     * Character code chunks.
     *
     * @const {Code[]} chunks
     */
    const chunks: Code[] = []

    if (
      (typeof value === 'string' && value) ||
      (typeof value === 'object' && value)
    ) {
      value = typeof value === 'object' && 'value' in value
        ? value.value
        : value

      value = typeof value === 'string'
        ? value.toString()
        : new TextDecoder(encoding ?? undefined).decode(value)

      /**
       * Current column.
       *
       * @var {Column} column
       */
      let column: Column = 1

      /**
       * Index of current character code.
       *
       * @var {number} index
       */
      let index: number = 0

      while (index < value.length) {
        /**
         * Character code.
         *
         * @var {NonNullable<Code>} code
         */
        let code: NonNullable<Code> = value[index]!.codePointAt(0)!

        /**
         * Difference between next column and current column.
         *
         * @var {number} k
         */
        let k: number = 1

        switch (true) {
          case code === codes.cr:
            if (value[index + 1]?.codePointAt(0) === codes.lf) {
              chunks.push(codes.crlf)
              k++
            } else {
              chunks.push(codes.vcr)
            }

            column = 1
            break
          case code === codes.ht:
            /**
             * Next column.
             *
             * @const {number} n
             */
            const n: number = Math.ceil(column / tabSize) * tabSize

            chunks.push(codes.vht)
            while (column++ < n) chunks.push(codes.vs)

            break
          case code === codes.lf:
            chunks.push(codes.vlf)
            column = 1
            break
          default:
            chunks.push(code)
            column++
            break
        }

        index += k
      }
    }

    return end && chunks.push(codes.eof), chunks
  }
}

export default preprocess
