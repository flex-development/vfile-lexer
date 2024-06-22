/**
 * @file Test Constructs - string
 * @module tests/constructs/string
 */

import tk from '#fixtures/tk'
import type { Construct, TokenizeContext } from '#src/interfaces'
import type { Effects, Event, Guard, State } from '#src/types'
import { codes, type Code } from '@flex-development/vfile-reader'
import { ok as assert } from 'devlop'

/**
 * Check if the current character `code` can start this construct.
 *
 * @see {@linkcode Code}
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code - Current character code
 * @return {boolean} `true` if `code` can start construct
 */
function test(this: TokenizeContext, code: Code): boolean {
  return code === codes.apostrophe || code === codes.quotation
}

/**
 * String literal construct.
 *
 * @const {Construct} string
 */
const string: Construct = {
  /**
   * Construct name.
   */
  name: tk.string,

  /**
   * Check if the previous character `code` can come before this construct.
   *
   * @see {@linkcode Code}
   * @see {@linkcode TokenizeContext}
   *
   * @this {TokenizeContext}
   *
   * @param {Code} code - Previous character code
   * @return {boolean} `true` if `code` allowed before construct
   */
  previous(this: TokenizeContext, code: Code): boolean {
    return code !== codes.backslash
  },

  /**
   * Resolve the events parsed by `tokenize`.
   *
   * @see {@linkcode Construct.tokenize}
   * @see {@linkcode Event}
   * @see {@linkcode TokenizeContext}
   *
   * @param {Event[]} events - List of events
   * @param {TokenizeContext} context - Tokenize context
   * @return {Event[]} Changed events
   */
  resolve(events: Event[], context: TokenizeContext): Event[] {
    assert(events.length === 2, 'expected events')
    const [[, token]] = <[Event]>events

    assert(token.type === tk.string, 'expected string token')
    // @ts-expect-error custom field (2339)
    token.value = context.sliceSerialize(token)

    return events
  },

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
    /**
     * Tokenize context.
     *
     * @const {TokenizeContext} self
     */
    const self: TokenizeContext = this

    return string

    /**
     * Finish string literal tokenization.
     *
     * @param {Code} code - Current character code
     * @return {State | undefined} Next state
     */
    function finish(code: Code): State | undefined {
      switch (true) {
        case code === codes.eof:
          return effects.exit(tk.string), ok(code)
        default:
          effects.consume(code)
          if (test.call(self, code)) return effects.exit(tk.string), ok
          return finish
      }
    }

    /**
     * Start string literal tokenization.
     *
     * @param {Code} code - Current character code
     * @return {State} Next state
     */
    function string(code: Code): State {
      effects.enter(tk.string)
      effects.consume(code)
      return finish
    }
  }
}

export default string
