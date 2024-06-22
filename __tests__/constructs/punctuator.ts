/**
 * @file Test Constructs - punctuator
 * @module tests/constructs/punctuator
 */

import tk from '#fixtures/tk'
import type { Construct, TokenizeContext } from '#src/interfaces'
import type { Effects, Guard, Resolver, State } from '#src/types'
import { resolveSlice } from '#src/utils'
import type { Code } from '@flex-development/vfile-reader'
import { unicodePunctuation as test } from 'micromark-util-character'

/**
 * Punctuator construct.
 *
 * @const {Construct} punctuator
 */
const punctuator: Construct = {
  /**
   * Construct name.
   */
  name: tk.punctuator,

  /**
   * Resolve the events parsed by `tokenize`.
   *
   * @see {@linkcode Resolver}
   */
  resolve: resolveSlice,

  /**
   * Check if the current character code can start this construct.
   *
   * @see {@linkcode Guard}
   */
  test,

  /**
   * Set up a state machine to handle character codes streaming in.
   *
   * @see {@linkcode Effects}
   * @see {@linkcode State}
   * @see {@linkcode TokenizeContext}
   *
   * @this {TokenizeContext}
   *
   * @param {Effects} effects - Context object to transition state machine
   * @param {State} ok - Successful tokenization state
   * @return {State} Initial state
   */
  tokenize(this: TokenizeContext, effects: Effects, ok: State): State {
    return punctuator

    /**
     * Tokenize a punctuator.
     *
     * @param {Code} code - Current character code
     * @return {State} Next state
     */
    function punctuator(code: Code): State {
      effects.enter(tk.punctuator)
      effects.consume(code)
      effects.exit(tk.punctuator)
      return ok
    }
  }
}

export default punctuator
