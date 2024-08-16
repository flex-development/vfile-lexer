/**
 * @file Test Utilities - list
 * @module tests/utils/list
 */

import { ev } from '#src/enums'
import type { Token } from '#src/interfaces'
import type { Event } from '#src/types'
import { isArray } from '@flex-development/tutils'

/**
 * Convert a list of events or linked token list to a flat token list.
 *
 * @see {@linkcode Event}
 *
 * @template {Event[] | Token} T - Event list or head token
 *
 * @param {Event[] | Token | undefined} data - Event list or head token
 * @return {Token[]} Flat token list
 */
function list<T extends Event[] | Token>(data: T | undefined): Token[] {
  /**
   * Flat token list.
   *
   * @const {Token[]} tokens
   */
  const tokens: Token[] = []

  if (isArray<Event>(data)) {
    for (const [event, token] of data) {
      if (event === ev.enter) tokens.push(token)
    }
  } else {
    /**
     * Current token.
     *
     * @var {Token | undefined} token
     */
    let token: Token | undefined = data

    while (token) void (tokens.push(token), token = token.next)
  }

  return tokens
}

export default list
