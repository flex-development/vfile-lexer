/**
 * @file Constructs - initialize
 * @module vfile-lexer/constructs/initialize
 */

import type {
  Effects,
  InitialConstruct,
  TokenizeContext
} from '#src/interfaces'
import type { Code, Constructs, State } from '#src/types'

/**
 * Create an initial construct.
 *
 * @see {@linkcode Constructs}
 * @see {@linkcode InitialConstruct}
 *
 * @param {Constructs} constructs - Construct(s) to try
 * @return {InitialConstruct} Initial construct
 */
function initialize(constructs: Constructs): InitialConstruct {
  return { name: 'vfile-lexer:initialize', tokenize }

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
   * @return {State} Initial state
   */
  function tokenize(this: TokenizeContext, effects: Effects): State {
    return state

    /**
     * Consume `code` and retry {@linkcode constructs}.
     *
     * @param {Code} code - Current character code
     * @return {State | undefined} Next state
     */
    function eat(code: Code): State | undefined {
      return effects.consume(code), state
    }

    /**
     * Try a construct.
     *
     * @param {Code} code - Current character code
     * @return {State | undefined} Next state
     */
    function state(code: Code): State | undefined {
      return effects.attempt(constructs, state, eat)(code)
    }
  }
}

export default initialize
