/**
 * @file Test Utilities - list
 * @module tests/utils/list
 */

import { ev } from '#src/enums'
import type { Token } from '#src/interfaces'
import type { Event } from '#src/types'

/**
 * Convert a list of events or linked token list to a flat token list.
 *
 * @see {@linkcode Event}
 *
 * @param {Event[] | Token | undefined} data - Event list or linked token list
 * @return {Token[]} Flat token list
 */
function list(data: Event[] | Token | undefined): Token[] {
  /**
   * Flat token list.
   *
   * @const {Token[]} tokens
   */
  const tokens: Token[] = []

  if (Array.isArray(data)) {
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
