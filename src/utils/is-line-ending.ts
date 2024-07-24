/**
 * @file Utilities - isLineEnding
 * @module vfile-lexer/utils/isLineEnding
 */

import { codes } from '#src/enums'
import type { Code } from '#src/types'

/**
 * Check if the given character `code` represents a line ending.
 *
 * @see {@linkcode Code}
 *
 * @param {Code} code - Character code to check
 * @return {code is NonNullable<Code>} `true` if `code` is line ending
 */
function isLineEnding(code: Code): code is NonNullable<Code> {
  switch (code) {
    case codes.cr:
    case codes.crlf:
    case codes.lf:
    case codes.ls:
    case codes.ps:
    case codes.vcr:
    case codes.vlf:
      return true
    default:
      return false
  }
}

export default isLineEnding
