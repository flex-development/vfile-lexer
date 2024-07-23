/**
 * @file Utilities - resolveSlice
 * @module vfile-lexer/utils/resolveSlice
 */

import { ev } from '#src/enums'
import type { TokenizeContext } from '#src/interfaces'
import type { Event } from '#src/types'

/**
 * Serialize tokens, and attach the serialized value to `field`.
 *
 * The default token field is `value`.
 *
 * > 👉 **Note**: Does nothing if `field` is `end`, `next`, `previous`, `start`,
 * > or `type`.
 *
 * @see {@linkcode Event}
 * @see {@linkcode TokenizeContext}
 *
 * @param {Event[]} events - List of events
 * @param {Partial<TokenizeContext>} context - Tokenize context
 * @param {(string | null | undefined)?} [field] - Token field
 * @return {Event[]} Changed events
 */
function resolveSlice(
  events: Event[],
  context: Partial<TokenizeContext>,
  field?: string | null | undefined
): Event[] {
  field ??= 'value'

  if (
    'sliceSerialize' in context &&
    field !== 'end' &&
    field !== 'next' &&
    field !== 'previous' &&
    field !== 'start' &&
    field !== 'type'
  ) {
    for (const [type, token] of events) {
      if (type === ev.enter) {
        // @ts-expect-error this is a custom field, which users are supposed to
        // manually type, but the runtime should just support it (7053).
        token[field] = context.sliceSerialize(token)
      }
    }
  }

  return events
}

export default resolveSlice
