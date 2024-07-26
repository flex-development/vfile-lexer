/**
 * @file Utilities - resolveTokenList
 * @module vfile-lexer/utils/resolveTokenList
 */

import { ev } from '#src/enums'
import type { Token, TokenizeContext } from '#src/interfaces'
import type { Event } from '#src/types'
import { ok as assert } from 'devlop'

/**
 * Resolve a linked token list.
 *
 * @see {@linkcode Event}
 * @see {@linkcode TokenizeContext}
 *
 * @template {Event[] | ReadonlyArray<Event>} T - List of events
 *
 * @param {T} events - List of events
 * @return {T} Changed events
 */
function resolveTokenList<T extends Event[] | readonly Event[]>(events: T): T {
  if (events.length) {
    /**
     * Head token.
     *
     * @const {Token | undefined} head
     */
    let head: Token | undefined

    /**
     * Tail token.
     *
     * @const {Token | undefined} tail
     */
    let tail: Token | undefined

    for (const [event, token] of events) {
      if (event === ev.enter) {
        if (head) {
          assert(tail, 'expected tail token')
          token.previous = tail
          tail.next = token
          tail = tail.next
        } else {
          head = tail = token
        }
      }
    }
  }

  return events
}

export default resolveTokenList
