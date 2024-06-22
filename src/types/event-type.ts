/**
 * @file Type Aliases - Event
 * @module vfile-lexer/types/Event
 */

import type { ev } from '#src/enums'

/**
 * Union of event types.
 *
 * @see {@linkcode ev}
 */
type EventType = keyof typeof ev | ev

export type { EventType as default }
