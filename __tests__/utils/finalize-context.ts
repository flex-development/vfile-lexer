/**
 * @file Test Utilities - finalizeContext
 * @module tests/utils/isPoint
 */

import type { TokenizeContext } from '#src/interfaces'

/**
 * Finalize the tokenize `context`.
 *
 * @see {@linkcode TokenizeContext}
 *
 * @param {TokenizeContext} context - Base tokenize context
 * @return {undefined} Nothing
 */
function finalizeContext(context: TokenizeContext): undefined {
  // @ts-expect-error this is a custom field, which users are supposed to
  // manually type, but the runtime should just support it (2339).
  context.parser = {
    constructs: { disable: { null: [] } },
    defined: [],
    lazy: {}
  }

  return void context
}

export default finalizeContext
