/**
 * @file Test Constructs - codeFenced
 * @module tests/constructs/codeFenced
 */

import { codes } from '#src/enums'
import type { Construct, TokenizeContext } from '#src/interfaces'
import type { Code, Tokenizer } from '#src/types'
import * as micromark from 'micromark-core-commonmark'

/**
 * Fenced code construct.
 *
 * @const {Construct} codeFenced
 */
const codeFenced: Construct = {
  name: micromark.codeFenced.name,
  test,
  tokenize: micromark.codeFenced.tokenize as unknown as Tokenizer
}

export default codeFenced

/**
 * Check if the current character `code` can start this construct.
 *
 * @see {@linkcode Code}
 * @see {@linkcode TokenizeContext}
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code - Current character code
 * @return {boolean} `true` if `code` can start construct
 */
function test(this: TokenizeContext, code: Code): boolean {
  return code === codes.graveAccent || code === codes.tilde
}
