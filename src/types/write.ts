/**
 * @file Type Aliases - Write
 * @module vfile-lexer/types/Write
 */

import type Code from './code'
import type Event from './event'

/**
 * Write a slice of chunks.
 *
 * The eof code (`null`) can be used to signal end of stream.
 *
 * @see {@linkcode Code}
 * @see {@linkcode Event}
 *
 * @param {Code[]} slice - Chunks
 * @return {Event[]} List of events
 */
type Write = (slice: Code[]) => Event[]

export type { Write as default }
