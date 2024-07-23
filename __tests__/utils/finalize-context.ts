/**
 * @file Test Utilities - finalizeContext
 * @module tests/utils/isPoint
 */

import type { TokenizeContext } from '#src/interfaces'
import type Lexer from '#src/lexer'

/**
 * Finalize the tokenize `context`.
 *
 * @see {@linkcode Lexer}
 * @see {@linkcode TokenizeContext}
 *
 * @this {Lexer}
 *
 * @param {TokenizeContext} context - Base tokenize context
 * @return {undefined} Nothing
 */
function finalizeContext(this: Lexer, context: TokenizeContext): undefined {
  // @ts-expect-error this is a custom field, which users are supposed to
  // manually type, but the runtime should just support it (2339).
  context.parser = {
    constructs: { disable: { null: [] } },
    defined: [],
    lazy: {}
  }

  // @ts-expect-error custom field, same as above (2339).
  this.place._bufferIndex = -1

  return void context
}

export default finalizeContext
