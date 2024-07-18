/**
 * @file Constructs - initialize
 * @module vfile-lexer/constructs/initialize
 */

import { tt } from '#src/enums'
import type { InitialConstruct, TokenizeContext } from '#src/interfaces'
import type { Constructs, Effects, State } from '#src/types'
import { codes, type Code } from '@flex-development/vfile-reader'
import eof from './eof'

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
  return {
    /**
     * Construct name.
     */
    name: 'vfile-lexer:initialize',

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
    tokenize(this: TokenizeContext, effects: Effects): State {
      void (effects.enter(tt.sof), effects.exit(tt.sof))
      return state

      /**
       * Consume `code` and try tokenizing the next construct.
       *
       * @param {Code} code - Current character code
       * @return {State | undefined} Next state
       */
      function eat(code: Code): State | undefined {
        return code === codes.eof
          ? effects.attempt(eof)(code)
          : (effects.consume(code), state)
      }

      /**
       * Try to tokenize a construct.
       *
       * @param {Code} code - Current character code
       * @return {State | undefined} Next state
       */
      function state(code: Code): State | undefined {
        return effects.attempt(constructs, state, eat)(code)
      }
    }
  }
}

export default initialize
