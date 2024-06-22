/**
 * @file tokenize
 * @module vfile-lexer/tokenize
 */

import type { Options } from '#src/interfaces'
import type { VFile, Value } from 'vfile'
import Lexer from './lexer'

/**
 * Tokenize `file`.
 *
 * @see {@linkcode Lexer}
 * @see {@linkcode Options}
 * @see {@linkcode VFile}
 * @see {@linkcode Value}
 *
 * @param {Value | VFile} file - File to tokenize
 * @param {Options} options - Lexer options
 * @return {Lexer} Lexer instance
 */
function tokenize(file: Value | VFile, options: Options): Lexer {
  return Lexer.create(file, options).tokenize()
}

export default tokenize
