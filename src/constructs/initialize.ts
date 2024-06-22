/**
 * @file Constructs - initialize
 * @module vfile-lexer/constructs/initialize
 */

import { tt } from '#src/enums'
import type {
  Construct,
  InitialConstruct,
  TokenizeContext
} from '#src/interfaces'
import type { Effects, State } from '#src/types'
import type { Code } from '@flex-development/vfile-reader'
import eof from './eof'

/**
 * Initialization construct.
 *
 * @const {InitialConstruct} initialize
 */
const initialize: InitialConstruct = {
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
    /**
     * Tokenize context.
     *
     * @const {TokenizeContext} self
     */
    const self: TokenizeContext = this

    /**
     * List of constructs.
     *
     * @const {Construct[]} constructs
     */
    const constructs: Construct[] = [eof, ...self.constructs]

    /**
     * Try to tokenize a list of constructs.
     *
     * @var {State} state
     */
    let state: State = effects.attempt(constructs, succ, fail)

    void (effects.enter(tt.sof), effects.exit(tt.sof))
    return succ

    /**
     * Eat `code`.
     *
     * @param {Code} code - Current character code
     * @return {State | undefined} Next state
     */
    function eat(code: Code): State | undefined {
      return effects.consume(code), state
    }

    /**
     * Try tokenizing the next construct, and move onto the next character code
     * if all constructs fail.
     *
     * @param {Code} code - Current character code
     * @return {State | undefined} Next state
     */
    function fail(code: Code): State | undefined {
      return effects.attempt(
        constructs,
        succ,
        constructs.indexOf(self.construct!) === constructs.length - 1
          ? eat
          : fail
      )(code)
    }

    /**
     * Try tokenizing the next construct.
     *
     * @param {Code} code - Current character code
     * @return {State | undefined} Next state
     */
    function succ(code: Code): State | undefined {
      return (state = effects.attempt(constructs, succ, fail))(code)
    }
  }
}

export default initialize
