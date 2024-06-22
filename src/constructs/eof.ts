/**
 * @file Constructs - eof
 * @module vfile-lexer/constructs/eof
 */

import { tt } from '#src/enums'
import type { Construct, TokenizeContext } from '#src/interfaces'
import type { Effects, State } from '#src/types'
import { codes, type Code } from '@flex-development/vfile-reader'

/**
 * End of file construct.
 *
 * @const {Construct} eof
 */
const eof: Construct = {
  /**
   * Construct name.
   */
  name: `vfile-lexer:${tt.eof}`,

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
    return code === codes.eof
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
    return eof

    /**
     * Tokenize end of file.
     *
     * @param {Code} code - Current character code
     * @return {State} Next state
     */
    function eof(code: Code): State {
      effects.enter(tt.eof)
      effects.consume(code)
      effects.exit(tt.eof)
      return ok
    }
  }
}

export default eof
