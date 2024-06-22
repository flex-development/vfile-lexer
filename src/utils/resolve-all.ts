/**
 * @file Utilities - resolveAll
 * @module vfile-lexer/utils/resolveAll
 */

import type { Construct, TokenizeContext } from '#src/interfaces'
import type { Event, Resolver } from '#src/types'

/**
 * Call all `resolveAll`s.
 *
 * @see {@linkcode Construct.resolveAll}
 * @see {@linkcode Event}
 * @see {@linkcode TokenizeContext}
 *
 * @param {ReadonlyArray<Partial<Construct>>} constructs - List of constructs
 * @param {ReadonlyArray<Event>} events - List of events
 * @param {TokenizeContext} context - Tokenize context
 * @return {Event[]} Changed events
 */
function resolveAll(
  constructs: readonly Partial<Construct>[],
  events: readonly Event[],
  context: TokenizeContext
): Event[] {
  /**
   * Called resolvers.
   *
   * @const {Resolver[]} called
   */
  const called: Resolver[] = []

  /**
   * Current index.
   *
   * @var {number} i
   */
  let i: number = -1

  while (++i < constructs.length) {
    /**
     * Resolver.
     *
     * @const {Resolver | null | undefined} resolve
     */
    const resolve: Resolver | null | undefined = constructs[i]!.resolveAll

    if (resolve && !called.includes(resolve)) {
      events = resolve([...events], context)
      called.push(resolve)
    }
  }

  return [...events]
}

export default resolveAll
