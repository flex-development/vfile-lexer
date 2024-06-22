/**
 * @file Type Aliases - Resolver
 * @module vfile-lexer/types/Resolver
 */

import type { Construct, TokenizeContext } from '#src/interfaces'
import type Event from './event'

/**
 * Handle events coming from `tokenize`.
 *
 * @see {@linkcode Construct.tokenize}
 * @see {@linkcode Event}
 * @see {@linkcode TokenizeContext}
 *
 * @param {Event[]} events - List of events
 * @param {TokenizeContext} context - Tokenize context
 * @return {Event[]} Changed events
 */
type Resolver = (events: Event[], context: TokenizeContext) => Event[]

export type { Resolver as default }
