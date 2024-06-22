/**
 * @file Test Constructs - ws
 * @module tests/constructs/ws
 */

import tk from '#fixtures/tk'
import type { Construct, TokenizeContext } from '#src/interfaces'
import type { Effects, Resolver, State } from '#src/types'
import { resolveSlice } from '#src/utils'
import type { Code, CodeCheck } from '@flex-development/vfile-reader'
import { ok as assert } from 'devlop'

/**
 * Code check.
 *
 * @var {CodeCheck} check
 */
let check: CodeCheck

/**
 * Whitespace construct.
 *
 * @const {Construct} ws
 */
const ws: Construct = {
  /**
   * Construct name.
   */
  name: tk.whitespace,

  /**
   * Resolve the events parsed by `tokenize`.
   *
   * @see {@linkcode Resolver}
   */
  resolve: resolveSlice,

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
  test(this: TokenizeContext, code: Code): boolean {
    return (check = this.check(/\s/))(code)
  },

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
    return whitespace

    /**
     * Finish tokenizing whitespace.
     *
     * @param {Code} code - Current character code
     * @return {State | undefined} Next state
     */
    function finish(code: Code): State | undefined {
      assert(check, 'expected code check')
      if (!check(code)) return effects.exit(tk.whitespace), ok(code)
      return effects.consume(code), finish
    }

    /**
     * Start whitespace tokenization.
     *
     * @param {Code} code - Current character code
     * @return {State} Next state
     */
    function whitespace(code: Code): State {
      return effects.enter(tk.whitespace), effects.consume(code), finish
    }
  }
}

export default ws
