/**
 * @file Type Aliases - Event
 * @module vfile-lexer/types/Event
 */

import type { Token, TokenizeContext } from '#src/interfaces'
import type EventType from './event-type'
import type TokenType from './token-type'

/**
 * The start or end of a token amongst other events.
 *
 * Tokens can "contain" other tokens, even though they are stored in a linked
 * list, by `enter`ing before and `exit`ing after them.
 *
 * @see {@linkcode EventType}
 * @see {@linkcode TokenType}
 * @see {@linkcode TokenizeContext}
 * @see {@linkcode Token}
 *
 * @template {TokenType} [T=TokenType] - Token type
 */
type Event<T extends TokenType = TokenType> = [
  event: EventType,
  token: Token<T>,
  context: TokenizeContext
]

export type { Event as default }
