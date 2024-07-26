/**
 * @file Type Aliases - Write
 * @module vfile-lexer/types/Write
 */

import type Chunk from './chunk'
import type Event from './event'

/**
 * Write a slice of chunks.
 *
 * The eof code (`null`) can be used to signal end of stream.
 *
 * @see {@linkcode Chunk}
 * @see {@linkcode Event}
 *
 * @param {Chunk[]} slice - Chunks
 * @return {Event[]} List of events
 */
type Write = (slice: Chunk[]) => Event[]

export type { Write as default }
