/**
 * @file Test Constructs - typeMetadata
 * @module tests/constructs/typeMetadata
 */

import tk from '#fixtures/tt'
import { codes } from '#src/enums'
import type { Construct, Effects, TokenizeContext } from '#src/interfaces'
import type { Code, State } from '#src/types'
import { ok as assert } from 'devlop'

/**
 * Type metadata construct.
 *
 * @const {Construct} typeMetadata
 */
const typeMetadata: Construct = {
  name: tk.typeMetadata,
  partial: true,
  previous,
  test,
  tokenize
}

export default typeMetadata

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
function previous(this: TokenizeContext, code: Code): boolean {
  return code !== codes.backslash
}

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
function test(this: TokenizeContext, code: Code): boolean {
  return code === codes.leftBrace
}

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
 * @param {State} nok - Failed tokenization state
 * @return {State} Initial state
 */
function tokenize(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {
  /**
   * Tokenize context.
   *
   * @const {TokenizeContext} self
   */
  const self: TokenizeContext = this

  return typeMetadata

  /**
   * Inside type metadata.
   *
   * @example
   *  ```markdown
   *  > {{ id: string }}
   *     ^^^^^^^^^^^^^
   *  ```
   *
   * @param {{ id: string }} code - Current character code
   * @return {State | undefined} Next state
   */
  function inside(code: Code): State | undefined {
    if (code === codes.eof) return nok(code)

    if (code === codes.rightBrace && self.next !== code) {
      effects.consume(code)
      effects.exit(tk.typeMetadata)
      return ok
    }

    effects.consume(code)
    return inside
  }

  /**
   * At start of type metadata.
   *
   * @example
   *  ```markdown
   *  > {{ id: string }}
   *    ^
   *  ```
   *
   * @param {Code} code - Current character code
   * @return {State | undefined} Next state
   */
  function typeMetadata(code: Code): State | undefined {
    assert(code === codes.leftBrace, 'expected `{`')
    return effects.enter(tk.typeMetadata), effects.consume(code), inside
  }
}
