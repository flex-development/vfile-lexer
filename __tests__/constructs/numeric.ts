/**
 * @file Test Constructs - numeric
 * @module tests/constructs/numeric
 */

import tk from '#fixtures/tk'
import type { Construct, TokenizeContext } from '#src/interfaces'
import type { Effects, Event, Resolver, State } from '#src/types'
import { resolveSlice } from '#src/utils'
import { chars, codes, type Code } from '@flex-development/vfile-reader'
import { asciiDigit } from 'micromark-util-character'

/**
 * Numeric literal construct.
 *
 * @const {Construct} numeric
 */
const numeric: Construct = {
  /**
   * Construct name.
   */
  name: 'numeric',

  /**
   * Resolve the events parsed by `tokenize`.
   *
   * @see {@linkcode Resolver}
   */
  resolve: resolveSlice,

  /**
   * Resolve the events from the start of the content (which may include other
   * constructs) to the last one parsed by `tokenize`.
   *
   * @see {@linkcode Construct.tokenize}
   * @see {@linkcode Event}
   *
   * @param {Event[]} events - List of events
   * @return {Event[]} Changed events
   */
  resolveTo(events: Event[]): Event[] {
    for (const [, token] of events) {
      if (token.type !== tk.number) continue

      // @ts-expect-error custom field (2339)
      if ((<string | null>token.value)?.endsWith(chars.lowercaseN)) {
        token.type = tk.bigint
      }
    }

    return events
  },

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
    return asciiDigit(code) || (code === codes.dot && asciiDigit(this.peek()))
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
    /**
     * Boolean indicating floating point number.
     *
     * @var {boolean} float
     */
    let float: boolean = this.code === codes.dot

    /**
     * Finish tokenizing an integer or float.
     *
     * @param {Code} code - Current character code
     * @return {State | undefined} Next state
     */
    const number = (code: Code): State | undefined => {
      switch (true) {
        case asciiDigit(code):
        case code === codes.underscore:
        case !float && code === codes.dot:
          return float = code === codes.dot, effects.consume(code), number
        case !float && code === codes.lowercaseN:
          return effects.consume(code), effects.exit(tk.number), ok
        default:
          return effects.exit(tk.number), ok(code)
      }
    }

    /**
     * Finish numeric literal tokenization.
     *
     * @param {Code} code - Current character code
     * @return {State | undefined} Next state
     */
    const finish = (code: Code): State | undefined => {
      switch (true) {
        // integer or float
        case asciiDigit(code):
        case code === codes.underscore:
        case !float && code === codes.dot:
          return float = code === codes.dot, effects.consume(code), number
        // bigint
        case !float && code === codes.lowercaseN:
          return effects.consume(code), effects.exit(tk.number), ok
        default:
          return effects.exit(tk.number), ok(code)
      }
    }

    /**
     * Start numeric literal tokenization.
     *
     * @param {Code} code - Current character code
     * @return {State} Next state
     */
    return function numeric(code: Code): State {
      return effects.enter(tk.number), effects.consume(code), finish
    }
  }
}

export default numeric
