/**
 * @file Test Constructs - inlineTag
 * @module tests/constructs/inlineTag
 */

import tk from '#fixtures/tk'
import type { Construct, TokenizeContext } from '#src/interfaces'
import type { Effects, Event, State } from '#src/types'
import { codes, type Code } from '@flex-development/vfile-reader'
import { ok as assert } from 'devlop'
import { asciiAlpha } from 'micromark-util-character'

/**
 * Inline tag construct.
 *
 * @const {Construct} inlineTag
 */
const inlineTag: Construct = {
  /**
   * Construct name.
   */
  name: tk.inlineTag,

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
   * Resolve all events when the content is complete, from the start to the end.
   * Only used if `tokenize`is successful once in the content.
   *
   * @see {@linkcode Construct.tokenize}
   * @see {@linkcode Event}
   * @see {@linkcode TokenizeContext}
   *
   * @param {Event[]} events - List of events
   * @param {TokenizeContext} context - Tokenize context
   * @return {Event[]} Changed events
   */
  resolveAll(events: Event[], context: TokenizeContext): Event[] {
    for (const [, token] of events) {
      if (token.type === tk.inlineTag) {
        assert(token.next, 'expected next token')

        if (token.next.type === tk.tag) {
          /**
           * Serialized token.
           *
           * @const {string} slice
           */
          const slice: string = context.sliceSerialize(token)

          /**
           * Next serialized token.
           *
           * @const {string} next
           */
          const next: string = context.sliceSerialize(token.next)

          // @ts-expect-error custom field (2339)
          token.tag = next

          // @ts-expect-error custom field (2339)
          token.value = slice.slice(next.length + 1, -1).trimStart()

          if (token.next.next) token.next.next.previous = token
          token.next = token.next.next
        }
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
    return code === codes.leftBrace
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
   * @param {State} nok - Failed tokenization state
   * @return {State} Initial state
   */
  tokenize(
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

    /**
     * Closed tag name token?
     *
     * @var {boolean} name
     */
    let name: boolean = false

    return inlineTag

    /**
     * Finish inline tag tokenization.
     *
     * @param {Code} code - Current character code
     * @return {State | undefined} Next state
     */
    function finish(code: Code): State | undefined {
      if (code === codes.eof) return nok(code)

      if (!asciiAlpha(code) && !name) {
        name = true
        effects.exit(tk.tag)
      }

      effects.consume(code)

      if (code === codes.rightBrace && self.previous !== codes.backslash) {
        effects.exit(tk.inlineTag)
        return ok
      }

      return finish
    }

    /**
     * Tokenize the beginning of an inline tag name (`@`).
     *
     * @param {Code} code - Current character code
     * @return {State | undefined} Next state
     */
    function begin(code: Code): State | undefined {
      if (code !== codes.at) return nok(code)
      return effects.enter(tk.tag), effects.consume(code), finish
    }

    /**
     * Start inline tag tokenization.
     *
     * @param {Code} code - Current character code
     * @return {State} Next state
     */
    function inlineTag(code: Code): State {
      assert(code === codes.leftBrace, 'expected `{`')
      effects.enter(tk.inlineTag)
      return effects.consume(code), begin
    }
  }
}

export default inlineTag
